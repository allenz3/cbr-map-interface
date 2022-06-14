const dataTypesAndLocations = new Map();
const locationsAndDataTypes = new Map();
const dataTypes = new Set();

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
    fillDataTypes();
}

// fill checklist menu with data types
function fillDataTypes() {
    dataTypes.forEach((dataType) => {
        const container = document.createElement("div");

        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.id = dataType;
        checkbox.setAttribute("value", dataType);

        const label = document.createElement("label");
        label.setAttribute("for", "dataType");
        label.innerHTML = dataType;

        container.appendChild(checkbox);
        container.appendChild(label);
        document.querySelector(".data-type").appendChild(container);
    });
}

export { makeInventory, dataTypesAndLocations, locationsAndDataTypes };

// https://youtu.be/uxf0--uiX0I
// https://www.w3schools.com/js/js_maps.asp