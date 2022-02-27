import { selectedLocationsSet } from "./main.js";

// input and save csv location data
async function getLocation() {
    const response = await fetch('../data/csv/CV_SacPAS_Proj_LatLon.csv');
    const data = await response.text();
    const locations = data.split('\n').slice(1);
    const locationsInfo = locations.map(location => {
        const col = location.split(',');
        // creates location list in page sidebar
        const newElem = document.createElement("option");
        newElem.innerHTML = col[1] + " (" + col[0] + ")";
        newElem.className = "location";  
        document.querySelector(".locationsList").appendChild(newElem);
        // returns array of location data
        return { proj: col[0], name: col[1], basin: col[2], lat: col[3], lon: col[4] };
    });
    return locationsInfo;
}

// add location by clicking on an option in the select box
const locationsList = document.querySelector(".locationsList");
locationsList.addEventListener("click", location => addLocation(location));

function addLocation(location) {
    // prevents event listener from selecting the select element
    if (location.target.tagName === "OPTION" && !selectedLocationsSet.has(location.target.innerHTML)) { // can also use e.target.className === "location"
        selectedLocationsSet.add(location.target.innerHTML);
        console.log(selectedLocationsSet);
        const newElem = document.createElement("li");
        newElem.innerHTML = location.target.innerHTML;
        newElem.className = "selectedLocations"; 
        document.querySelector(".selectedLocationsList").appendChild(newElem);
    }
}

// remove location by clicking on the list element directly
const selectedLocationsList = document.querySelector(".selectedLocationsList");
selectedLocationsList.addEventListener("click", html => removeLocation(html)); 

function removeLocation(html) {
    selectedLocationsSet.delete(html.target.innerHTML);
    console.log(selectedLocationsSet);
    const child = html.target;
    selectedLocationsList.removeChild(child);
}

export default { getLocation, addLocation, removeLocation };
// https://youtu.be/RfMkdvN-23o
// https://code-boxx.com/add-html-code-in-javascript/#:~:text=WAYS%20TO%20ADD%20HTML%20CODE%201%20METHOD%201%29,TAKE%20EXTRA%20NOTE%20OF%20THE%20LOADING%20ORDER%21%20
// https://dev.to/ramonak/javascript-how-to-access-the-return-value-of-a-promise-object-1bck