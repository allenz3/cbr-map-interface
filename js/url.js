import { locationsSet } from "./locations.js";

const nameMap = new Map();
const siteCodeMap = new Map();

async function makeURLInventory(dataTypesJSON) {
    const response = await fetch(dataTypesJSON);
    const inventory = await response.json();
    inventory["river_data"].forEach((siteData) => {
        if (siteData["onlineData"] === "1") {
            const dataTypeName = siteData["onlineNames"];
            const webName = siteData["paramWeb"];
            if (!nameMap.has(dataTypeName)) {
                nameMap.set(dataTypeName, webName);
            }
        }
    });
    locationsSet.forEach((location) => {
        const locationString = location.get("name") + " (" + location.get("proj") + ")";
        if (!siteCodeMap.has(locationString)) {
            siteCodeMap.set(locationString, location.get("proj"));
        }
    });
}

// when Submit button is clicked, a URL is generated
// const submitQuery = document.querySelector(".submit-query");
const urlSpace = document.querySelector(".url-generated");
const urlText = document.querySelector(".url-text");
const dataTypesList = document.querySelector(".data-types-list");
const locationsList = document.querySelector(".locations-list");
const yearsList = document.querySelector(".years-list");
// go through the filters, pick out all the selected filters
// find the equivalent paramweb for all the selected filters
// append the paramweb to the end of the URL constant using the correct syntax
// submitQuery.addEventListener("click", generateURL());
function generateURL(URLConstant) {
    let URLString = URLConstant;
    for (let i = 0; i < dataTypesList.length; i++) {
        const option = dataTypesList[i];
        if (option.selected) {
            const newString = "&data[]=" + nameMap.get(option.innerHTML);
            URLString += newString;
        }
    }
    for (let i = 0; i < locationsList.length; i++) {
        const option = locationsList[i];
        if (option.selected) {
            const newString = "&loc[]=" + siteCodeMap.get(option.innerHTML);
            URLString += newString;
        }
    }
    for (let i = 0; i < yearsList.length; i++) {
        const option = yearsList[i];
        if (option.selected) {
            const newString = "&year[]=" + option.innerHTML;
            URLString += newString;
        }
    }
    urlText.innerHTML = URLString;
    // window.open("https://" + URLConstant, "_blank");
}

export { makeURLInventory, generateURL };