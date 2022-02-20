import baseLayerGroup from './base_layers.js';
import rasterLayerGroup from './raster_layers.js';
import vectorLayerGroup from './vector_layers.js';
import controls from './controls.js';
import interactions from './interactions.js';
import overlays from './overlays.js';
import { getLocation } from './locations.js';
// https://youtu.be/cRHQNNcYf6s

window.onload = init

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
            // https://stackoverflow.com/questions/27820784/openlayers-3-center-map
        }),
        target: 'js-map',
        keyboardEventTarget: document,
        controls: controls
    });

    // Views
    map.addInteraction(interactions.dragRotateInteraction);
    // map.addInteraction(interactions.drawInteraction);
    map.addInteraction(interactions.selectInteraction);

    // Layers
    map.addLayer(baseLayerGroup);
    map.addLayer(rasterLayerGroup);
    map.addLayer(vectorLayerGroup);

    // Overlays
    map.addOverlay(overlays.popup);

    getLocation();
}