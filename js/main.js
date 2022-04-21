import map from './view.js';
import baseLayerGroup from './base_layers.js';
import rasterLayerGroup from './raster_layers.js';
import vectorLayers from './vector_layers.js';
import interactions from './interactions.js';
import overlays from './overlays.js';
import locations from './locations.js';
// https://youtu.be/cRHQNNcYf6s

window.onload = init

function init() {
    
    // map.on('click', function(e) {
    //     console.log(e.coordinate);
    // });

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
}

// https://openlayers.org/en/latest/apidoc/module-ol_layer_Vector-VectorLayer.html#getSource
// https://attacomsian.com/blog/javascript-iterate-objects
// https://www.freecodecamp.org/news/javascript-settimeout-how-to-set-a-timer-in-javascript-or-sleep-for-n-seconds/