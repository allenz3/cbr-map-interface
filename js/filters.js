/*
Various filters used to create specific search queries.
NOTE: The year filter is disabled for the time being and is currently a static list.
*/

import map from './view.js';
import { dataTypesMap, locationsMap, yearsMap } from './data_types.js';
import { locationsSet, fillLocationsList } from './locations.js'
import { bluePoint, whitePoint } from './styles.js';
import { fillDataTypesList, fillYearsList } from './data_types.js';

const selectedDataTypes = new Set();
const selectedLocations = new Set();
const selectedYears = new Set();

const dataTypesList = document.querySelector(".data-types-list");
const locationsList = document.querySelector(".locations-list");
const resetQuery = document.querySelector(".reset-query");
const searchFilter = document.querySelector(".search-filter");
const yearsList = document.querySelector(".years-list");

const searchKeyword = searchFilter.addEventListener("input", () => {
    const searchInput = document.querySelector(".search-filter").value;
    const currentLocationsSet = new Set();
    locationsSet.forEach((location) => {
        const locationString = location.get("name") + " (" + location.get("proj") + ")";
        if ((locationString.toLowerCase()).includes(searchInput.toLowerCase())) currentLocationsSet.add(location.get("proj"));
    });
    if (dataTypesList.value) {
        const initialSiteCodesSet = dataTypesMap.get(dataTypesList.value)[0];
        const filteredSiteCodesSet = filterMultipleSets(initialSiteCodesSet, selectedDataTypes, dataTypesMap);
        ANDLogicEnforcement(currentLocationsSet, filteredSiteCodesSet);
    }
    addLocationOptions(currentLocationsSet);
    fillSidebar(selectedDataTypes, selectedLocations);
});

const dataTypeFilter = dataTypesList.addEventListener("click", function(e) {
    if (e.target.tagName === "OPTION") {
        selectMultipleOptions(selectedDataTypes, dataTypesList.value, dataTypesList);
        if (selectedDataTypes.size === 0) {
            fillDataTypesList();
            fillLocationsList();
            fillSidebar(selectedDataTypes, selectedLocations);
        } else {
            const initialSiteCodesSet = dataTypesMap.get(dataTypesList.value)[0];
            const filteredSiteCodesSet = filterMultipleSets(initialSiteCodesSet, selectedDataTypes, dataTypesMap);
            addLocationOptions(filteredSiteCodesSet);
        }
    }
});

const locationListFilter = locationsList.addEventListener('click', (e) => {
    if (e.target.tagName === "OPTION") locationSelected(locationsList.value);
});

const locationPointsFilter = map.on("singleclick", point => {
    map.forEachFeatureAtPixel(point.pixel, point => {
        if (point.getGeometry().getType() === 'Point') locationSelected(point.get("name") + " (" + point.get("proj") + ")");
    });
});

function locationSelected(locationString) {
    try {
        selectMultipleOptions(selectedLocations, locationString, locationsList);
        if (selectedLocations.size === 0) {
            fillDataTypesList();
            fillSidebar(selectedDataTypes, selectedLocations);
        } else {
            const selectedSiteCodes = new Set();
            selectedLocations.forEach((locationString) => selectedSiteCodes.add(locationStringToSiteCode(locationString)));
            const currentSiteCode = locationStringToSiteCode(locationsList.value);
            const initialDataTypesSet = locationsMap.get(currentSiteCode)[0];
            const filteredDataTypesSet = filterMultipleSets(initialDataTypesSet, selectedSiteCodes, locationsMap);
            addDataTypeOptions(filteredDataTypesSet);
        }   
        fillPoints(locationsSet, selectedLocations);
    } catch (TypeError) {
        console.error("No data types were found at the current location. Selecting an invalid location will also invalidate all other locations.");
    }
}

const yearsFilter = yearsList.addEventListener("click", function(e) {
    if (e.target.tagName === "OPTION") {
        selectMultipleOptions(selectedYears, yearsList.value, yearsList);
    }
});

const reset = resetQuery.addEventListener("click", () => {
    selectedDataTypes.clear();
    selectedLocations.clear();
    selectedYears.clear();
    document.querySelector(".url-text").innerHTML = "";
    searchFilter.value = "";
    fillSidebar(selectedDataTypes, selectedLocations);
    fillPoints(locationsSet, selectedLocations);
    fillLocationsList();
    fillDataTypesList();
    fillYearsList();
});

// utility methods
function selectMultipleOptions(selectedSet, value, list) {
    if (!selectedSet.has(value)) selectedSet.add(value);
    else selectedSet.delete(value);
    for (let i = 0; i < list.length; i++) {
        const option = list[i];
        if (selectedSet.has(option.value)) option.selected = true;
        else option.selected = false;
    }
}

function filterMultipleSets(initialSet, selectedSet, selectedMap) {
    const filteredSet = new Set(initialSet);
    if (selectedSet.size > 1) {    
        selectedSet.forEach((elem) => {
            const newSet = new Set(selectedMap.get(elem)[0]);
            ANDLogicEnforcement(filteredSet, newSet);
        });
    }
    return filteredSet;
}

function ANDLogicEnforcement(currentSet, newSet) {
    currentSet.forEach((value) => {
        if (!newSet.has(value)) currentSet.delete(value);
    });
}

function fillSidebar(selectedDataTypes, selectedLocations) {
    selectedDataTypes.forEach((dataType) => {
        for (let i = 0; i < dataTypesList.length; i++) {
            const dataTypeOption = dataTypesList[i];
            if (dataType === dataTypeOption.value) dataTypeOption.selected = true;
        }
    });
    selectedLocations.forEach((locationString) => {
        for (let i = 0; i < locationsList.length; i++) {
            const locationOption = locationsList[i];
            if (locationString === locationOption.value) locationOption.selected = true;
        }
    });
}
// https://stackoverflow.com/questions/17094230/how-do-i-loop-through-children-objects-in-javascript

function fillPoints(locationsSet, selectedLocations) {
    locationsSet.forEach((location) => {
        if (selectedLocations.has(location.get("name") + " (" + location.get("proj") + ")")) location.setStyle(bluePoint);
        else location.setStyle(whitePoint);
    });
}

function addDataTypeOptions(currentDataTypesSet) {
    // save currently selected data types
    const currentSelectedDataTypes = new Set();
    if (currentDataTypesSet) {
        for (let i = 0; i < dataTypesList.length; i++) {
            const option = dataTypesList[i];
            if (option.selected) currentSelectedDataTypes.add(option.innerText);
        }
        const currentDataTypesSetSorted = sortAlphabetically(currentDataTypesSet);
        // add data type options to data types list
        dataTypesList.innerHTML = "";
        currentDataTypesSetSorted.forEach((dataType) => {
            const newElem = document.createElement("option");
            newElem.innerHTML = dataType;
            if (currentSelectedDataTypes.has(dataType)) newElem.selected = true;
            dataTypesList.appendChild(newElem);
        });
    }
}

function addLocationOptions(currentSiteCodesSet) {
    // save currently selected locations
    const currentSelectedLocations = new Set();
    for (let i = 0; i < locationsList.length; i++) {
        const option = locationsList[i];
        if (option.selected) currentSelectedLocations.add(option.innerText);
    }
    const currentLocationsStringSet = new Set();
    // convert site codes to location strings
    currentSiteCodesSet.forEach((siteCode) => currentLocationsStringSet.add(siteCodeToLocationString(siteCode)));
    const currentLocationsStringSetSorted = sortAlphabetically(currentLocationsStringSet);
    // add location options to locations list
    locationsList.innerHTML = "";
    currentLocationsStringSetSorted.forEach((locationString) => {
        if (locationString) {
            const newElem = document.createElement("option");
            newElem.innerHTML = locationString;
            if (currentSelectedLocations.has(locationString)) newElem.selected = true;
            locationsList.appendChild(newElem);
        }
    });
}

// three letter site code --> full location string
function siteCodeToLocationString(siteCode) {
    let newLocationString = "";
    locationsSet.forEach((location) => {
        if (siteCode === location.get("proj")) newLocationString = location.get("name") + " (" + location.get("proj") + ")";
    });
    return newLocationString;
}

// full location string --> three letter site code
function locationStringToSiteCode(locationString) {
    let newSiteCode = "";
    locationsSet.forEach((location) => {
        if (locationString === location.get("name") + " (" + location.get("proj") + ")") newSiteCode = location.get("proj");
    });
    return newSiteCode;
}

function sortAlphabetically(currentSet) {
    let array = new Array();
    currentSet.forEach((elem) => array.push(elem));
    array.sort((a, b) => (a > b) ? 1 : -1);
    const newSet = new Set();
    array.forEach((elem) => newSet.add(elem));
    return newSet;
}

export { searchFilter };