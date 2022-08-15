const locationsSet = new Set();

function createLocationsSet(vectorLayer) {
    locationsSet.clear();
    vectorLayer.getSource().on('featuresloadend', (e) => {
        const locations = e.target.getFeatures();
        // sort location names into alphabetical order
        let locationsArray = new Array();
        locations.forEach(location => locationsArray.push(location));
        locationsArray.sort((a, b) => (a.get("name") > b.get("name")) ? 1 : -1);
        locationsArray.forEach(location => locationsSet.add(location));
        fillLocationsList();
    });
}
// https://openlayers.org/en/latest/apidoc/module-ol_layer_Vector-VectorLayer.html#getSource
// https://stackoverflow.com/questions/72496965/is-there-any-way-to-access-the-locations-for-a-vector-layer-in-openlayers/72498213
// https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/

function fillLocationsList() {
    const locationsList = document.querySelector(".locations-list");
    locationsList.innerHTML = "";
    locationsSet.forEach((location) => {
        const locationString = location.get("name") + " (" + location.get("proj") + ")";
        const newElem = document.createElement("option");
        newElem.innerHTML = locationString;
        document.querySelector(".locations-list").appendChild(newElem);
    });
}
// https://code-boxx.com/add-html-code-in-javascript/#:~:text=WAYS%20TO%20ADD%20HTML%20CODE%201%20METHOD%201%29,TAKE%20EXTRA%20NOTE%20OF%20THE%20LOADING%20ORDER%21%20

export { createLocationsSet, fillLocationsList, locationsSet };