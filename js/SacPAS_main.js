import map from './view.js';
import { setCenterPoint } from './view.js';
import baseLayerGroup from './base_layers.js';
import rasterLayerGroup from './raster_layers.js';
import { locationGeoJSON, source } from './vector_layers.js';
import { dragRotateInteraction, drawInteraction } from './interactions.js';
import { popup } from './overlays.js';
import initLocations from './locations.js';
// https://youtu.be/cRHQNNcYf6s

window.onload = init

function init() {
    
    // set view center
    setCenterPoint(-13450000, 4700000);

    map.on('click', function(e) {
        console.log(e.coordinate);
    });

    map.addInteraction(dragRotateInteraction);
    // map.addInteraction(drawInteraction);

    // Layers
    map.addLayer(baseLayerGroup);
    map.addLayer(rasterLayerGroup);
    map.addLayer(locationGeoJSON);

    // Overlays
    map.addOverlay(popup);

    // create location option selection list
    setTimeout(initLocations, 100, source);
}

// https://openlayers.org/en/latest/apidoc/module-ol_layer_Vector-VectorLayer.html#getSource
// https://attacomsian.com/blog/javascript-iterate-objects
// https://www.freecodecamp.org/news/javascript-settimeout-how-to-set-a-timer-in-javascript-or-sleep-for-n-seconds/