import { locationsSet } from "./locations.js";

const nameMap = new Map();
const siteCodeMap = new Map();

async function makeInventory2() {
    const response = await fetch('./data/json/year_and_data_types_JLGedits.json');
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
const submitQuery = document.querySelector(".submit-query");
const urlSpace = document.querySelector(".url-generated");
const dataTypesList = document.querySelector(".data-types-list");
const locationsList = document.querySelector(".locations-list");
const yearsList = document.querySelector(".years-list");
// go through the filters, pick out all the selected filters
// find the equivalent paramweb for all the selected filters
// append the paramweb to the end of the URL constant using the correct syntax
const generateURL = submitQuery.addEventListener("click", () => {
    let URLString = "www.cbr.washington.edu/sacramento/data/php/rpt/mg.php?mgconfig=river&amp;outputFormat=plotImage&amp;tempUnit=F&amp;startdate=1/1&amp;enddate=12/31&amp;avgyear=0&amp;consolidate=1&amp;grid=1&amp;y1min=&amp;y1max=&amp;y2min=&amp;y2max=&amp;size=medium"
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
    const newElem = document.createElement("p");
    newElem.innerHTML = URLString;
    urlSpace.appendChild(newElem);
});

export default makeInventory2;