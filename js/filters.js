import map from './view.js';
import { dataTypesMap, locationsMap, yearsMap } from './data_types.js';
import { locationsSet, initFillLocationsList, initLocations } from './locations.js'
import { bluePoint, whitePoint } from './styles.js';
import { initFillDataTypes, initFillYears } from './data_types.js';

const selectedDataTypes = new Set();
const selectedLocations = new Set();
const selectedYears = new Set();

// search filter by keyword based on user input
const search = document.querySelector(".search-filter").addEventListener("input", () => {
    const searchInput = document.querySelector(".search-filter").value;
    const locationsList = document.querySelector(".locations-list");
    const currentLocationsSet = new Set();
    locationsSet.forEach((location) => {
        const locationString = location.get("name") + " (" + location.get("proj") + ")";
        if ((locationString.toLowerCase()).includes(searchInput.toLowerCase())) currentLocationsSet.add(location);
    });
    addLocationOptions(currentLocationsSet);
    fillSidebar(locationsSet, selectedLocations);
});

// user clicks on a data type, locations and years and filtered
const dataTypesList = document.querySelector(".data-types-list");
const filterByDataType = dataTypesList.addEventListener("click", function(e) {
    if (e.target.tagName === "OPTION") {
        // select multiple data types
        selectMultiple(selectedDataTypes, dataTypesList.value, dataTypesList);
        // fill locations
        const currentSiteCodesSet = dataTypesMap.get(e.target.innerHTML)[0];
        inCommon(currentSiteCodesSet, dataTypesMap, selectedDataTypes, 0);
        const currentLocationsSet = new Set();
        locationsSet.forEach((location) => {
            if (currentSiteCodesSet.has(location.get("proj"))) currentLocationsSet.add(location);
        });
        // if no options are selected, then reset other filters
        let resetList = true;
        for (let i = 0; i < dataTypesList.length; i++) {
            const dataTypeOption = dataTypesList[i];
            if (dataTypeOption.selected) {
                resetList = false;
                break;
            };
        }
        if (resetList) initFillLocationsList();
        else addLocationOptions(currentLocationsSet);
        // fill years
        // const currentYearsSet = dataTypesMap.get(e.target.innerHTML)[1];
        // inCommon(currentYearsSet, dataTypesMap, selectedDataTypes, 1);
        // addYearOptions(currentYearsSet);
    }
});

// user clicks on a location in the sidebar, data types and years are filtered
// Note: only data types are filtered for now
const locationsList = document.querySelector(".locations-list")
const filterByLocation = locationsList.addEventListener('click', (e) => {
        if (e.target.tagName === "OPTION") {
            let siteCode = "";
            locationsSet.forEach((location) => {
            if (location.get("name") + " (" + location.get("proj") + ")" == locationsList.value) {
                siteCode = location.get("proj");
            }
        });
        locationSelected(siteCode);
    }
});

// user clicks on a location point, data types and years are filtered
// Note: only data types are filtered for now
const filterByLocationPoint = map.on("singleclick", point => {
    map.forEachFeatureAtPixel(point.pixel, point => {
        if (point.getGeometry().getType() === 'Point') {
            locationSelected(point.get("proj"));
        }
    });
});

function locationSelected(siteCode) {
    // select multiple data types
    selectMultiple(selectedLocations, siteCode, locationsList);
    try {
        // fill data types
        const currentDataTypesSet = locationsMap.get(siteCode)[0];
        inCommon(currentDataTypesSet, locationsMap, selectedLocations, 0);
        // fill years
        // const currentYearsSet = locationsMap.get(siteCode)[1];
        // inCommon(currentYearsSet, locationsMap, selectedLocations, 1);
        // addYearOptions(currentYearsSet);
        // update sidebar locations and map location points
        fillSidebar(locationsSet, selectedLocations);
        fillPoints(locationsSet, selectedLocations);
        // if no options are selected, then reset other filters
        let resetList = true;
        for (let i = 0; i < locationsList.length; i++) {
            const locationOption = locationsList[i];
            if (locationOption.selected) {
                resetList = false;
                break;
            };
        }
        if (resetList) initFillDataTypes();
        else addDataTypeOptions(currentDataTypesSet);
    } catch (TypeError) {
        console.error("There are no relevant data types or years at the current location.");
    }
}

// user clicks on a year, data types and locations are filtered
const yearsList = document.querySelector(".years-list");
const filterByYear = yearsList.addEventListener("click", function(e) {
    if (e.target.tagName === "OPTION") {
        // select multiple data types
        selectMultiple(selectedYears, yearsList.value, yearsList);
        // fill data types
        // const currentDataTypesSet = yearsMap.get(e.target.innerHTML)[0];
        // inCommon(currentDataTypesSet, dataTypesMap, selectedDataTypes, 0);
        // addDataTypeOptions(currentDataTypesSet);
        // fill locations
        // const currentSiteCodesSet = yearsMap.get(e.target.innerHTML)[1];
        // inCommon(currentSiteCodesSet, yearsMap, selectedYears, 1);
        // const currentLocationsSet = new Set();
        // locationsSet.forEach((location) => {
        //     if (currentSiteCodesSet.has(location.get("proj"))) currentLocationsSet.add(location);
        // }); 
        // addLocationOptions(currentLocationsSet);
    }
});

function selectMultiple(selectedSet, value, list) {
    if (!selectedSet.has(value)) selectedSet.add(value);
    else selectedSet.delete(value);
    for (let i = 0; i < list.length; i++) {
        const option = list[i];
        if (selectedSet.has(option.value)) option.selected = true;
        else option.selected = false;
    }
}

// AND logic enforcement
function inCommon(currentSet, currentMap, selectedSet, index) {
    currentSet.forEach((value) => {
        selectedSet.forEach((key) => {
            const newSet = currentMap.get(key)[index];
            if (!newSet.has(value)) currentSet.delete(value);
        });
    })
}

function fillSidebar(locationSet, selectedLocations) {
    const locationsList = document.querySelector(".locations-list");
    selectedLocations.forEach((siteCode) => {
        let locationString = "";
        locationsSet.forEach((location) => {
            if (siteCode == location.get("proj")) {
                locationString = location.get("name") + " (" + location.get("proj") + ")";
            }
        });
        for (let i = 0; i < locationsList.length; i++) {
            const locationOption = locationsList[i];
            if (locationString == locationOption.value) locationOption.selected = true;
        }
    });
}
// https://stackoverflow.com/questions/17094230/how-do-i-loop-through-children-objects-in-javascript

function fillPoints(locationsSet, selectedLocations) {
    locationsSet.forEach((location) => {
        if (selectedLocations.has(location.get("proj"))) location.setStyle(bluePoint);
        else location.setStyle(whitePoint);
    });
}

function addDataTypeOptions(currentDataTypesSet) {
    const dataTypes = document.querySelector(".data-types-list");
    const currentSelectedDataTypes = new Set();
    if (currentDataTypesSet) {
        for (let i = 0; i < dataTypes.length; i++) {
            const option = dataTypes[i];
            if (option.selected) {
                currentSelectedDataTypes.add(option.innerHTML);
            }
        }
        dataTypes.innerHTML = "";
        currentDataTypesSet.forEach((dataType) => {
            const newElem = document.createElement("option");
            newElem.innerHTML = dataType;
            if (currentSelectedDataTypes.has(dataType)) newElem.selected = true;
            dataTypes.appendChild(newElem);
        });
    }
}

function addLocationOptions(currentLocationsSet) {
    const locationsList = document.querySelector(".locations-list");
    const currentSelectedLocations = new Set();
    for (let i = 0; i < locationsList.length; i++) {
        const option = locationsList[i];
        if (option.selected) {
            currentSelectedLocations.add(option.innerHTML);
        }
    }
    locationsList.innerHTML = "";
    currentLocationsSet.forEach((location) => {
        const locationString = location.get("name") + " (" + location.get("proj") + ")";
        const newElem = document.createElement("option");
        newElem.innerHTML = locationString;
        newElem.className = "location"; 
        if (currentSelectedLocations.has(locationString)) newElem.selected = true;
        locationsList.appendChild(newElem);
    });
}

// function addYearOptions(currentYearsSet) {
//     const yearsList = document.querySelector(".years-list");
//     yearsList.innerHTML = "";
//     const sortedYears = new Array();
//     currentYearsSet.forEach((year) => {
//         sortedYears.push(year);
//     })
//     sortedYears.sort().reverse();
//     sortedYears.forEach((sortedYear) => {
//         const newElem = document.createElement("option");
//         newElem.innerHTML = sortedYear;
//         yearsList.appendChild(newElem);
//     });
// }

// reset sidebar and map interface
const reset = document.querySelector(".reset").addEventListener("click", () => {
    selectedDataTypes.clear();
    selectedLocations.clear();
    selectedYears.clear();
    document.querySelector(".url-generated").innerHTML = "";
    fillSidebar(locationsSet, selectedLocations);
    fillPoints(locationsSet, selectedLocations);
    initFillLocationsList();
    initFillDataTypes();
    initFillYears();
});

export { search };