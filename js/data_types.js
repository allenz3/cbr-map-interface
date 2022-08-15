const dataTypesMap = new Map();
const locationsMap = new Map();
const yearsMap = new Map();
let dataTypes = new Array();
const years = new Set();

// Note: the maps are constructed in alphabetical order (data types, then locations, then years) but the CBR site uses a different order (locations, then data types, then years)
async function makeFilterInventories(dataTypesJSON) {
    const response = await fetch(dataTypesJSON);
    const inventory = await response.json();
    inventory["river_data"].forEach((siteData) => {
        // onlineData checks if the siteData is applicable to the query system
        if (siteData["onlineData"] === "1") {
            const siteCode = siteData["siteCode"];
            const dataTypeName = siteData["onlineNames"];
            const year = siteData["year"];

            if (!dataTypesMap.has(dataTypeName)) {
                dataTypes.push(dataTypeName);
                dataTypesMap.set(dataTypeName, new Array(new Set(), new Set()));
            }
            dataTypesMap.get(dataTypeName)[0].add(siteCode);
            dataTypesMap.get(dataTypeName)[1].add(year);

            if (!locationsMap.has(siteCode)) {
                locationsMap.set(siteCode, new Array(new Set(), new Set()));
            }
            locationsMap.get(siteCode)[0].add(dataTypeName);
            locationsMap.get(siteCode)[1].add(year);

            if (!yearsMap.has(year)) {
                years.add(year);
                yearsMap.set(year, new Array(new Set(), new Set()));
            }
            yearsMap.get(year)[0].add(dataTypeName);
            yearsMap.get(year)[1].add(siteCode);
        }
    });
    fillDataTypesList();
    fillYearsList();
}
// https://youtu.be/uxf0--uiX0I
// https://www.w3schools.com/js/js_maps.asp

function fillDataTypesList() {
    const dataTypesList = document.querySelector(".data-types-list");
    dataTypesList.innerHTML = "";
    dataTypes.sort();
    dataTypes.forEach((dataType) => {
        const newElem = document.createElement("option");
        newElem.innerHTML = dataType;
        dataTypesList.appendChild(newElem);
    });
}

function fillYearsList() {
    const yearsList = document.querySelector(".years-list");
    yearsList.innerHTML = "";
    for (let i = 2022; i >= 1945; i--) {
        const newElem = document.createElement("option");
        newElem.innerHTML = i;
        yearsList.appendChild(newElem);
    }
}

export { makeFilterInventories, fillDataTypesList, fillYearsList, dataTypesMap, locationsMap, yearsMap };