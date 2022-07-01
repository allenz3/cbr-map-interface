import map from './view.js';
import { dataTypesMap, locationsMap, yearsMap } from './data_types.js';
import { locationsSet } from './locations.js'

// search filter by keyword based on user input
const search = document.querySelector(".search-filter").addEventListener("input", () => {
    const searchInput = document.querySelector(".search-filter").value;
    const locationsList = document.querySelector(".locations-list");
    const currentLocationsSet = new Set();
    locationsList.innerHTML = "";
    locationsSet.forEach((location) => {
        const locationString = location.get("name") + " (" + location.get("proj") + ")";
        if ((locationString.toLowerCase()).includes(searchInput.toLowerCase())) currentLocationsSet.add(location);
    });
    addLocationOptions(currentLocationsSet);
});

// user clicks on a data type, locations and years and filtered
const filterByDataType = document.querySelector(".data-types-list").addEventListener("click", function(e) {
    if (e.target.tagName === "OPTION") {
        const currentSiteCodesSet = dataTypesMap.get(e.target.innerHTML)[0];
        const currentLocationsSet = new Set();
        locationsSet.forEach((location) => {
            if (currentSiteCodesSet.has(location.get("proj"))) currentLocationsSet.add(location);
        }); 
        addLocationOptions(currentLocationsSet);
        const currentYearsSet = dataTypesMap.get(e.target.innerHTML)[1];
        addYearOptions(currentYearsSet);
    }
});

// user clicks on a location, data types and years are filtered
const filterByLocation = document.querySelector(".locations-list").addEventListener('change', function(e) {
    const partsArray = e.target.value.split('(');
    const siteCode = partsArray[partsArray.length - 1].substring(0, partsArray[partsArray.length - 1].length - 1);
    if (locationsMap.get(siteCode)) {
        const currentDataTypesSet = locationsMap.get(siteCode)[0];
        addDataTypeOptions(currentDataTypesSet);
        const currentYearsSet = locationsMap.get(siteCode)[1];
        addYearOptions(currentYearsSet);
    }
});
// https://stackoverflow.com/questions/1216505/how-to-parse-a-string-in-javascript

// user clicks on a location point, data types and years are filtered
const filterByLocationPoint = map.on("singleclick", point => {
    map.forEachFeatureAtPixel(point.pixel, point => {
        if (point.getGeometry().getType() === 'Point' && locationsMap.get(point.get("proj"))) {
            const currentDataTypesSet = locationsMap.get(point.get("proj"))[0];
            addDataTypeOptions(currentDataTypesSet);
            const currentYearsSet = locationsMap.get(point.get("proj"))[1];
            addYearOptions(currentYearsSet);
        }
    });
});

// user clicks on a year, data types and locations are filtered
const filterByYear = document.querySelector(".years-list").addEventListener("click", function(e) {
    if (e.target.tagName === "OPTION") {
        const currentDataTypesSet = yearsMap.get(e.target.value)[0];
        addDataTypeOptions(currentDataTypesSet);
        const currentSiteCodesSet = yearsMap.get(e.target.value)[1];
        const currentLocationsSet = new Set();
        locationsSet.forEach((location) => {
            if (currentSiteCodesSet.has(location.get("proj"))) currentLocationsSet.add(location);
        }); 
        addLocationOptions(currentLocationsSet);
    }
});

function addDataTypeOptions(currentDataTypesSet) {
    const dataTypes = document.querySelector(".data-types-list");
    dataTypes.innerHTML = "";
    if (currentDataTypesSet) {
        currentDataTypesSet.forEach((dataType) => {
            const newElem = document.createElement("option");
            newElem.innerHTML = dataType;
            dataTypes.appendChild(newElem);
        });
    }
}

function addLocationOptions(currentLocationsSet) {
    const locationsList = document.querySelector(".locations-list");
    locationsList.innerHTML = "";
    currentLocationsSet.forEach((location) => {
        const locationString = location.get("name") + " (" + location.get("proj") + ")";
        const newElem = document.createElement("option");
        newElem.innerHTML = locationString;
        newElem.className = "location"; 
        locationsList.appendChild(newElem);
    });
}

function addYearOptions(currentYearsSet) {
    const yearsList = document.querySelector(".years-list");
    yearsList.innerHTML = "";
    currentYearsSet.forEach((year) => {
        const newElem = document.createElement("option");
        newElem.innerHTML = year;
        yearsList.appendChild(newElem);
    });
}

export { search };