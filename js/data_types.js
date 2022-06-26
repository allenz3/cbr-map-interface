const dataTypesAndLocations = new Map();
const locationsAndDataTypes = new Map();
const dataTypes = new Set();

// make maps of data types to locations and locations to data types
async function makeInventory() {
    const response = await fetch('./data/json/year_and_data_types.json');
    const inventory = await response.json();
    inventory["river_data"].forEach((siteData) => {
        const siteCode = siteData["site_code"];
        const params = siteData["paramDB"];
        if (!locationsAndDataTypes.has(siteCode)) locationsAndDataTypes.set(siteCode, new Set());
        params.forEach((param) => {
            if (!dataTypesAndLocations.has(param)) {
                dataTypes.add(param);
                dataTypesAndLocations.set(param, new Set());
            }
            dataTypesAndLocations.get(param).add(siteCode);
            locationsAndDataTypes.get(siteCode).add(param);
        });
    });
    initFillDataTypes();
}

function initFillDataTypes() {
    const dataTypesList = document.querySelector(".data-types");
    dataTypesList.innerHTML = "";
    dataTypes.forEach((dataType) => {
        const newElem = document.createElement("option");
        newElem.innerHTML = dataType;
        //newElem.className = "location";
        document.querySelector(".data-types").appendChild(newElem);
    });
}

export { makeInventory, initFillDataTypes, dataTypesAndLocations, locationsAndDataTypes };

// https://youtu.be/uxf0--uiX0I
// https://www.w3schools.com/js/js_maps.asp