const dataTypesMap = new Map();
const locationsMap = new Map();
const yearsMap = new Map();
let dataTypes = new Array();
const years = new Set();

// make maps of data types to locations and locations to data types
async function makeInventory() {
    const response = await fetch('./data/json/year_and_data_types_JLGedits.json');
    const inventory = await response.json();
    inventory["river_data"].forEach((siteData) => {
        if (siteData["onlineData"] === "1") {
            const siteCode = siteData["siteCode"];
            const dataTypeName = siteData["onlineNames"];
            const year = siteData["year"];
            // alphabetical order
            if (!dataTypesMap.has(dataTypeName)) {
                dataTypes.push(dataTypeName);
                dataTypesMap.set(dataTypeName, new Array(new Set(), new Set()));
            }
            if (!locationsMap.has(siteCode)) {
                locationsMap.set(siteCode, new Array(new Set(), new Set()));
            }
            if (!yearsMap.has(year)) {
                years.add(year);
                yearsMap.set(year, new Array(new Set(), new Set()));
            }
            // data type -> location
            dataTypesMap.get(dataTypeName)[0].add(siteCode);
            // data type -> year
            dataTypesMap.get(dataTypeName)[1].add(year);
            // location -> data type
            locationsMap.get(siteCode)[0].add(dataTypeName);
            // location -> year
            locationsMap.get(siteCode)[1].add(year);
            // year -> data type
            yearsMap.get(year)[0].add(dataTypeName);
            // year -> location
            yearsMap.get(year)[1].add(siteCode);
        }
    });
    initFillDataTypes();
    initFillYears();
}

function initFillDataTypes() {
    const dataTypesList = document.querySelector(".data-types-list");
    dataTypesList.innerHTML = "";
    dataTypes.sort();
    dataTypes.forEach((dataType) => {
        const newElem = document.createElement("option");
        newElem.innerHTML = dataType;
        dataTypesList.appendChild(newElem);
    });
}

function initFillYears() {
    // const yearsList = document.querySelector(".years-list");
    // yearsList.innerHTML = "";
    // const sortedYears = new Array();
    // years.forEach((year) => {
    //     sortedYears.push(year);
    // })
    // sortedYears.sort().reverse();
    // sortedYears.forEach((sortedYear) => {
    //     const newElem = document.createElement("option");
    //     newElem.innerHTML = sortedYear;
    //     yearsList.appendChild(newElem);
    // });
    const yearsList = document.querySelector(".years-list");
    yearsList.innerHTML = "";
    for (let i = 2022; i >= 1945; i--) {
        const newElem = document.createElement("option");
        newElem.innerHTML = i;
        yearsList.appendChild(newElem);
    }
}

export { makeInventory, initFillDataTypes, initFillYears, dataTypesMap, locationsMap, yearsMap };

// https://youtu.be/uxf0--uiX0I
// https://www.w3schools.com/js/js_maps.asp