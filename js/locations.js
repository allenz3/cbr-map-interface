import vectorLayers from './vector_layers.js';
import map from './view.js';

const locationsSet = new Set();
const selectedLocationsSet = new Set();

// input and save csv location data
async function getLocation() { // fill the sidebar with location options
    // csv implementation
    // const response = await fetch('../data/csv/CV_SacPAS_Proj_LatLon.csv');
    // const data = await response.text();
    // const locations = data.split('\n').slice(1);
    // const locationsInfo = locations.map(location => {
    //     const col = location.split(',');
    //     // creates location list in page sidebar
    //     const newElem = document.createElement("option");
    //     newElem.innerHTML = col[1] + " (" + col[0] + ")";
    //     newElem.className = "location";  
    //     document.querySelector(".locationsList").appendChild(newElem);
    //     // returns array of location data
    //     return { proj: col[0], name: col[1], basin: col[2], lat: col[3], lon: col[4] };
    // });
    // json implementation
    const response = await fetch('./data/json/locationsGeoJSON.geojson');
    const locationData = await response.json();
    locationData["features"].forEach((feature) => {
        const locationString = feature["properties"]["name"] + " (" + feature["properties"]["proj"] + ")";
        const newElem = document.createElement("option");
        newElem.innerHTML = locationString;
        newElem.className = "location";  
        document.querySelector(".locationsList").appendChild(newElem);
    });
    //return locationsInfo;
}

// fill set containing all locations
function fillSet(param) {
    Object.values(param).forEach(location => locationsSet.add(location));
}
setTimeout(fillSet, 500, vectorLayers.source);

// search filter by keyword based on user input
const deselectAll = document.querySelector(".deselect-all").addEventListener("click", () => {
    selectedLocationsSet.clear();
    fillSidebar(selectedLocationsSet);
    fillPoints(locationsSet, selectedLocationsSet);
})

// search filter by keyword based on user input
const search = document.querySelector(".search-filter").addEventListener("input", () => {
    const searchInput = document.querySelector(".search-filter").value;
    const locationsList = document.querySelector(".locationsList");
    locationsList.innerHTML = "";
    locationsSet.forEach((location) => {
        const locationString = location.A.name + " (" + location.A.proj + ")";
        if ((locationString.toLowerCase()).includes(searchInput.toLowerCase())) {
            const newElem = document.createElement("option");
            newElem.innerHTML = locationString;
            newElem.className = "location";  
            locationsList.appendChild(newElem);
        }
    });
})

// if location option is clicked
const locationsList = document.querySelector(".locationsList");
const selectedLocationsList = document.querySelector(".selectedLocationsList");
locationsList.addEventListener("click", locationOption => findLocation(locationOption));
selectedLocationsList.addEventListener("click", locationOption => findLocation(locationOption));

// if a location option is selected
function findLocation(locationOption) { // argument: option element from location list
    // prevents event listener from selecting the select element (entire list)
    if (locationOption.target.tagName === "OPTION" || locationOption.target.tagName === "LI") { // can also use e.target.className === "location"
        locationsSet.forEach((location) => {
            const locationString = location.A.name + " (" + location.A.proj + ")";
            if (locationString === locationOption.target.innerHTML) {
                if (!selectedLocationsSet.has(location)) {
                    selectedLocationsSet.add(location);
                } else {
                    selectedLocationsSet.delete(location);
                }
            }
        });
        fillSidebar(selectedLocationsSet);
        fillPoints(locationsSet, selectedLocationsSet);
    }
}

// if a point on the map is clicked
map.on("singleclick", point => {
    map.forEachFeatureAtPixel(point.pixel, point => {
        if (point.getGeometry().getType() === 'Point') {
            locationsSet.forEach((location) => {
                if (location.A.proj === point.A.proj) {
                    if (!selectedLocationsSet.has(location)) { // select point
                        selectedLocationsSet.add(location);
                    } else { // deselect point
                        selectedLocationsSet.delete(location);
                    }
                }
            });
        }
    });
    fillSidebar(selectedLocationsSet);
    fillPoints(locationsSet, selectedLocationsSet);
});

// fills the selected locations list sidebar after a location option selection or a mouse click on a point
function fillSidebar(selectedLocationsSet) {
    const selectedLocationsList = document.querySelector(".selectedLocationsList");
    selectedLocationsList.innerHTML = "";
    selectedLocationsSet.forEach((location) => {
        if (selectedLocationsSet.has(location)) { // if location is selected put it in the sidebar
            selectedLocationsSet.add(location);
            const newElem = document.createElement("li");
            newElem.innerHTML = location.A.name + " (" + location.A.proj + ")";
            newElem.className = "selectedLocations"; 
            document.querySelector(".selectedLocationsList").appendChild(newElem);
        }
    });
    console.log(locationsSet);
    console.log(selectedLocationsSet);
}

// fills in the points on the map after a location option selection or a mouse click on a point
function fillPoints(locationsSet, selectedLocationsSet) {
    locationsSet.forEach((location) => {
        if (selectedLocationsSet.has(location)) { // color points blue if selected
            location.setStyle(
                new ol.style.Style({
                    image: new ol.style.Circle({
                        fill: new ol.style.Fill({
                            color: [0, 153, 255, 1]
                        }),
                        radius: 8,
                        stroke: new ol.style.Stroke({
                            color: [0, 0, 0, 1],
                            width: 2
                        })
                    }),
                    zIndex: 1
                })
            )
        } else { // color points white if not selected
            location.setStyle(
                new ol.style.Style({
                    image: new ol.style.Circle({
                        fill: new ol.style.Fill({
                            color: [255, 255, 255, 1]
                        }),
                        radius: 8,
                        stroke: new ol.style.Stroke({
                            color: [0, 0, 0, 1],
                            width: 2
                        })
                    }),
                    zIndex: 0
                })
            )   
        }
    });
}

export default { getLocation };

// https://youtu.be/RfMkdvN-23o
// https://code-boxx.com/add-html-code-in-javascript/#:~:text=WAYS%20TO%20ADD%20HTML%20CODE%201%20METHOD%201%29,TAKE%20EXTRA%20NOTE%20OF%20THE%20LOADING%20ORDER%21%20
// https://dev.to/ramonak/javascript-how-to-access-the-return-value-of-a-promise-object-1bck