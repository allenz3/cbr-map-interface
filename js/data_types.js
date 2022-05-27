const dataTypesAndLocations = new Map();
const dataTypes = new Set();

async function makeInventory() {
    const response = await fetch('../data/json/year_and_data_types.json');
    const inventory = await response.json();
    inventory["river_data"].forEach((siteData) => {
        const siteCode = siteData["site_code"];
        const params = siteData["paramDB"];
        params.forEach((param) => {
            if (!dataTypesAndLocations.has(param)) {
                dataTypes.add(param);
                dataTypesAndLocations.set(param, new Set());
            }
            dataTypesAndLocations.get(param).add(siteCode);
        });
    });
}

function fillDataTypes() {
    console.log(dataTypes);
    dataTypes.forEach((dataType) => {
        const newElem = document.createElement("option");
        newElem.innerHTML = dataType;
        newElem.className = "data-type";  
        document.querySelector(".data-type").appendChild(newElem);
    });
}

export { makeInventory, fillDataTypes, dataTypes, dataTypesAndLocations };

// https://youtu.be/uxf0--uiX0I
// https://www.w3schools.com/js/js_maps.asp