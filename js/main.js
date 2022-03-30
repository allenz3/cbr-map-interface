import baseLayerGroup from './base_layers.js';
import rasterLayerGroup from './raster_layers.js';
import vectorLayers from './vector_layers.js';
import controls from './controls.js';
import interactions from './interactions.js';
import overlays from './overlays.js';
import locations from './locations.js';
// https://youtu.be/cRHQNNcYf6s

window.onload = init

const locationsSet = new Set();
const selectedLocationsSet = new Set();

function init() {
    
    // initialize map
    const map = new ol.Map({
        view: new ol.View({
            // center: [-13392860.93604214, 6011494.743803331],
            // center: ol.proj.transform([-120.740135, 47.751076], 'EPSG:4326', 'EPSG:3857'),
            center: ol.proj.transform([-120.740135, 38.751076], 'EPSG:4326', 'EPSG:3857'),
            zoom: 7
            // maxZoom: 6,
            // minZoom: 2,
            // rotation: 0.5
            // https://stackoverflow.com/quiestions/27820784/openlayers-3-center-map
        }),
        target: 'js-map',
        keyboardEventTarget: document,
        controls: controls
    });

    // Views
    map.addInteraction(interactions.dragRotateInteraction);
    // map.addInteraction(interactions.drawInteraction);

    // Layers
    map.addLayer(baseLayerGroup);
    map.addLayer(rasterLayerGroup);
    map.addLayer(vectorLayers.vectorLayerGroup);

    // Overlays
    map.addOverlay(overlays.popup);

    // create location option selection list
    locations.getLocation();

    // fill set containing all locations
    function fillSet(param) {
        Object.values(param).forEach(location => locationsSet.add(location));
    }
    setTimeout(fillSet, 500, vectorLayers.source);

    // if location option is clicked
    const locationsList = document.querySelector(".locationsList");
    const selectedLocationsList = document.querySelector(".selectedLocationsList");
    locationsList.addEventListener("click", locationOption => findLocation(locationOption));
    selectedLocationsList.addEventListener("click", locationOption => findLocation(locationOption));

    // if a location option is selected
    function findLocation(locationOption) { // argument: option element from location list
        // prevents event listener from selecting the select element (entire list)
        if (locationOption.target.tagName === "OPTION" || locationOption.target.tagName === "LI") { // can also use e.target.className === "location"
            locationsSet.forEach((location) => {
                const locationString = location.A.name + " (" + location.A.proj + ")";
                if (locationString === locationOption.target.innerHTML) {
                    if (!selectedLocationsSet.has(location)) {
                        selectedLocationsSet.add(location);
                    } else {
                        selectedLocationsSet.delete(location);
                    }
                }
            });
            fillSidebar(selectedLocationsSet);
            fillPoints(locationsSet, selectedLocationsSet);
        }
    }

    // if a point on the map is clicked
    map.on("singleclick", point => {
        map.forEachFeatureAtPixel(point.pixel, point => {
            if (point.getGeometry().getType() === 'Point') {
                locationsSet.forEach((location) => {
                    if (location.A.proj === point.A.proj) {
                        if (!selectedLocationsSet.has(location)) { // select point
                            selectedLocationsSet.add(location);
                        } else { // deselect point
                            selectedLocationsSet.delete(location);
                        }
                    }
                });
            }
        });
        fillSidebar(selectedLocationsSet);
        fillPoints(locationsSet, selectedLocationsSet);
    });

    // fills the selected locations list sidebar after a location option selection or a mouse click on a point
    function fillSidebar(selectedLocationsSet) {
        const selectedLocationsList = document.querySelector(".selectedLocationsList");
        selectedLocationsList.innerHTML = "";
        selectedLocationsSet.forEach((location) => {
            if (selectedLocationsSet.has(location)) { // if location is selected put it in the sidebar
                selectedLocationsSet.add(location);
                const newElem = document.createElement("li");
                newElem.innerHTML = location.A.name + " (" + location.A.proj + ")";
                newElem.className = "selectedLocations"; 
                document.querySelector(".selectedLocationsList").appendChild(newElem);
            }
        });
        console.log(selectedLocationsSet);
    }

    // fills in the points on the map after a location option selection or a mouse click on a point
    function fillPoints(locationsSet, selectedLocationsSet) {
        locationsSet.forEach((location) => {
            if (selectedLocationsSet.has(location)) { // color points blue if selected
                location.setStyle(
                    new ol.style.Style({
                        image: new ol.style.Circle({
                            fill: new ol.style.Fill({
                                color: [0, 153, 255, 1]
                            }),
                            radius: 8,
                            stroke: new ol.style.Stroke({
                                color: [0, 0, 0, 1],
                                width: 2
                            })
                        }),
                        zIndex: 1
                    })
                )
            } else { // color points white if not selected
                location.setStyle(
                    new ol.style.Style({
                        image: new ol.style.Circle({
                            fill: new ol.style.Fill({
                                color: [255, 255, 255, 1]
                            }),
                            radius: 8,
                            stroke: new ol.style.Stroke({
                                color: [0, 0, 0, 1],
                                width: 2
                            })
                        }),
                        zIndex: 0
                    })
                )   
            }
        });
    }
}

export { locationsSet, selectedLocationsSet };

// https://openlayers.org/en/latest/apidoc/module-ol_layer_Vector-VectorLayer.html#getSource
// https://attacomsian.com/blog/javascript-iterate-objects
// https://www.freecodecamp.org/news/javascript-settimeout-how-to-set-a-timer-in-javascript-or-sleep-for-n-seconds/