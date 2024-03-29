import { locationsSet } from "./locations.js";

const nameMap = new Map();
const siteCodeMap = new Map();

async function makeURLInventories(dataTypesJSON) {
    const response = await fetch(dataTypesJSON);
    const inventory = await response.json();
    inventory["river_data"].forEach((siteData) => {
        if (siteData["onlineData"] === "1") {
            const dataTypeName = siteData["onlineNames"];
            const webName = siteData["paramWeb"];
            if (!nameMap.has(dataTypeName)) nameMap.set(dataTypeName, webName);
        }
    });
    locationsSet.forEach((location) => {
        const locationString = location.get("name") + " (" + location.get("proj") + ")";
        if (!siteCodeMap.has(locationString)) siteCodeMap.set(locationString, location.get("proj"));
    });
}
// https://youtu.be/uxf0--uiX0I

const urlText = document.querySelector(".url-text");
const dataTypesList = document.querySelector(".data-types-list");
const locationsList = document.querySelector(".locations-list");
const yearsList = document.querySelector(".years-list");
// the URL generation should be in the following order: locations, data types, and years
function generateURL(URLConstant) {
    let URLString = URLConstant;
    for (let i = 0; i < locationsList.length; i++) {
        const option = locationsList[i];
        if (option.selected) {
            const newString = "&loc[]=" + siteCodeMap.get(option.innerText);
            URLString += newString;
        }
    }
    for (let i = 0; i < dataTypesList.length; i++) {
        const option = dataTypesList[i];
        if (option.selected) {
            const newString = "&data[]=" + nameMap.get(option.innerText);
            URLString += newString;
        }
    }
    for (let i = 0; i < yearsList.length; i++) {
        const option = yearsList[i];
        if (option.selected) {
            const newString = "&year[]=" + option.innerText;
            URLString += newString;
        }
    }
    urlText.innerHTML = URLString;
}
// https://betterprogramming.pub/whats-best-innertext-vs-innerhtml-vs-textcontent-903ebc43a3fc

export { makeURLInventories, generateURL };