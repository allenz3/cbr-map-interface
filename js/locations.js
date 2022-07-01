import map from './view.js';
import { bluePoint, whitePoint } from './styles.js';
import { initFillDataTypes, initFillYears } from './data_types.js';

const locationsSet = new Set();
const selectedLocationsSet = new Set();

// fill set containing all locations
function initLocations(locationGeoJSON) {
    locationsSet.clear();
    selectedLocationsSet.clear();
    // after the location features 
    locationGeoJSON.getSource().on('featuresloadend', (evt) => {
        const locations = evt.target.getFeatures();
        locations.forEach(location => locationsSet.add(location));
        initFillLocationsList();
    });
}
// https://stackoverflow.com/questions/72496965/is-there-any-way-to-access-the-locations-for-a-vector-layer-in-openlayers/72498213

// fill sidebar with locations
function initFillLocationsList() {
    const locationsList = document.querySelector(".locations-list");
    locationsList.innerHTML = "";
    locationsSet.forEach((location) => {
        const locationString = location.get("name") + " (" + location.get("proj") + ")";
        const newElem = document.createElement("option");
        newElem.innerHTML = locationString;
        newElem.className = "location";
        document.querySelector(".locations-list").appendChild(newElem);
    });
}

// deselect all locations from Selected Locations List
const deselectAll = document.querySelector(".deselect-all").addEventListener("click", () => {
    selectedLocationsSet.clear();
    fillSidebar(locationsSet, selectedLocationsSet);
    fillPoints(locationsSet, selectedLocationsSet);
    initFillLocationsList();
    initFillDataTypes();
    initFillYears();
});

// if a location option is clicked
const locationsList = document.querySelector(".locations-list");
const selectedLocationsList = document.querySelector(".selectedLocationsList");
locationsList.addEventListener("click", locationOption => findLocation(locationOption));
selectedLocationsList.addEventListener("click", locationOption => findLocation(locationOption));

// if a location option is selected
function findLocation(locationOption) { // argument: option element from location list
    // prevents event listener from selecting the select element (entire list)
    if (locationOption.target.tagName === "OPTION" || locationOption.target.tagName === "LI") { // can also use locationOption.target.className === "location"
        locationsSet.forEach((location) => {
            const locationString = location.get("name") + " (" + location.get("proj") + ")";
            if (locationString === locationOption.target.innerText) {
                if (!selectedLocationsSet.has(location)) selectedLocationsSet.add(location);
                else selectedLocationsSet.delete(location);
            }
        });
        fillSidebar(locationsSet, selectedLocationsSet);
        fillPoints(locationsSet, selectedLocationsSet);
    }
}

// if a point on the map is clicked
const pointClick = map.on("singleclick", point => {
    map.forEachFeatureAtPixel(point.pixel, point => {
        if (point.getGeometry().getType() === 'Point') {
            locationsSet.forEach((location) => {
                if (location.get("proj") === point.get("proj")) {
                    // select point
                    if (!selectedLocationsSet.has(location)) selectedLocationsSet.add(location);
                    // deselect point
                    else selectedLocationsSet.delete(location);
                }
            });
        }
    });
    fillSidebar(locationsSet, selectedLocationsSet);
    fillPoints(locationsSet, selectedLocationsSet);
});

// fills the selected locations list sidebar after a location option selection or a mouse click on a point
function fillSidebar(locationsSet, selectedLocationsSet) {
    const selectedLocationsList = document.querySelector(".selectedLocationsList");
    selectedLocationsList.innerHTML = "";
    selectedLocationsSet.forEach((location) => {
        if (selectedLocationsSet.has(location)) { // if location is selected put it in the sidebar
            const newElem = document.createElement("li");
            newElem.innerHTML = location.get("name") + " (" + location.get("proj") + ")";
            newElem.className = "selectedLocations"; 
            document.querySelector(".selectedLocationsList").appendChild(newElem);
        }
    });
}
// https://stackoverflow.com/questions/47243139/how-to-convert-set-to-string-with-space

// fills in the points on the map after a location option selection or a mouse click on a point
function fillPoints(locationsSet, selectedLocationsSet) {
    locationsSet.forEach((location) => {
        // color location points blue if selected
        if (selectedLocationsSet.has(location)) location.setStyle(bluePoint);
        // color points white if not selected
        else location.setStyle(whitePoint);
    });
}

export { initLocations, locationsSet };

// https://youtu.be/RfMkdvN-23o
// https://code-boxx.com/add-html-code-in-javascript/#:~:text=WAYS%20TO%20ADD%20HTML%20CODE%201%20METHOD%201%29,TAKE%20EXTRA%20NOTE%20OF%20THE%20LOADING%20ORDER%21%20
// https://dev.to/ramonak/javascript-how-to-access-the-return-value-of-a-promise-object-1bck