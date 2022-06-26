import map from './view.js';
import { initFillDataTypes, dataTypesAndLocations, locationsAndDataTypes } from './data_types.js';
import { locationsSet } from './locations.js'

// search filter by keyword based on user input
const search = document.querySelector(".search-filter").addEventListener("input", () => {
    const searchInput = document.querySelector(".search-filter").value;
    const locationsList = document.querySelector(".locationsList");
    locationsList.innerHTML = "";
    locationsSet.forEach((location) => {
        const locationString = location.get("name") + " (" + location.get("proj") + ")";
        if ((locationString.toLowerCase()).includes(searchInput.toLowerCase())) {
            const newElem = document.createElement("option");
            newElem.innerHTML = locationString;
            newElem.className = "location";  
            locationsList.appendChild(newElem);
        }
    });
});

// user selects a site in the sidebar and the data types are filtered
const dataTypesFilter = document.querySelector(".locationsList");
dataTypesFilter.addEventListener('change', function() {
    var partsArray = dataTypesFilter.value.split('(');
    const locationCode = partsArray[1].substring(0, partsArray[1].length - 1);
    const dataTypesSet = locationsAndDataTypes.get(locationCode);
    const dataTypes = document.querySelector(".data-types");
    dataTypes.innerHTML = "";
    if (dataTypesSet) {
        dataTypesSet.forEach((dataType) => {
            const newElem = document.createElement("option");
            newElem.innerHTML = dataType;
            dataTypes.appendChild(newElem);
        });
    }
});
// https://stackoverflow.com/questions/1216505/how-to-parse-a-string-in-javascript

// user clicks on a location point and the data types are filtered
const pointClick = map.on("singleclick", point => {
    map.forEachFeatureAtPixel(point.pixel, point => {
        if (point.getGeometry().getType() === 'Point') {
            const dataTypesSet = locationsAndDataTypes.get(point.get("proj"));
            const dataTypes = document.querySelector(".data-types");
            dataTypes.innerHTML = "";
            if (dataTypesSet) {
                dataTypesSet.forEach((dataType) => {
                    const newElem = document.createElement("option");
                    newElem.innerHTML = dataType;
                    dataTypes.appendChild(newElem);
                });
            }
        }
    });
});

// user selects a data type and the locations are filtered
const locationsFilter = document.querySelector(".data-types").addEventListener("click", function(e) {
    const currentLocationsSet = dataTypesAndLocations.get(e.target.innerHTML);
    const locationsList = document.querySelector(".locationsList");
    locationsList.innerHTML = "";
    locationsSet.forEach((location) => {
        const locationString = location.get("name") + " (" + location.get("proj") + ")";
        if (currentLocationsSet.has(location.get("proj"))) {
            const newElem = document.createElement("option");
            newElem.innerHTML = locationString;
            newElem.className = "location"; 
            locationsList.appendChild(newElem);
        }
    });
});

export { search };