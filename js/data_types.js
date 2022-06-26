const dataTypesAndLocations = new Map();
const locationsAndDataTypes = new Map();
const dataTypes = new Set();

// make maps of data types to locations and locations to data types
async function makeInventory() {
    const response = await fetch('./data/json/year_and_data_types_JLGedits.json');
    const inventory = await response.json();
    inventory["river_data"].forEach((siteData) => {
        if (siteData["onlineData"] === "1") {
            const siteCode = siteData["siteCode"];
            const dataTypeName = siteData["onlineNames"];
            if (!locationsAndDataTypes.has(siteCode)) locationsAndDataTypes.set(siteCode, new Set());
            if (!dataTypesAndLocations.has(dataTypeName)) {
                dataTypes.add(dataTypeName);
                dataTypesAndLocations.set(dataTypeName, new Set());
            }
            dataTypesAndLocations.get(dataTypeName).add(siteCode);
            locationsAndDataTypes.get(siteCode).add(dataTypeName);
        }
    });
    initFillDataTypes();
}

function initFillDataTypes() {
    const dataTypesList = document.querySelector(".data-types");
    dataTypesList.innerHTML = "";
    dataTypes.forEach((dataType) => {
        const newElem = document.createElement("option");
        newElem.innerHTML = dataType;
        document.querySelector(".data-types").appendChild(newElem);
    });
}

export { makeInventory, initFillDataTypes, dataTypesAndLocations, locationsAndDataTypes };

// https://youtu.be/uxf0--uiX0I
// https://www.w3schools.com/js/js_maps.asp