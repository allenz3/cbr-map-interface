import map from './view.js';
import { setCenterPoint } from './view.js';
import baseLayerGroup from './base_layers.js';
import rasterLayerGroup from './raster_layers.js';
import { dragRotateInteraction, drawInteraction, freehandDraw } from './interactions.js';
import { popup } from './overlays.js';
import { initLocations } from './locations.js';
import { makeDataTypesInventory } from './data_types.js';
import { search } from './filters.js'
import { makeURLInventory, generateURL } from './url.js';
// https://youtu.be/cRHQNNcYf6s]

function createMap(long, lat, locationGeoJSON, dataTypesJSON, URLConstant) {
    
    // set view center
    setCenterPoint(long, lat);

    // set up data types and URL generation
    document.querySelector(".submit-query").addEventListener("click", () => {
        generateURL(URLConstant)
    });
    makeDataTypesInventory(dataTypesJSON);
    makeURLInventory(dataTypesJSON);

    // map.on('click', (e) => console.log(e.coordinate));

    map.addInteraction(dragRotateInteraction);
    // map.addInteraction(drawInteraction);

    // Layers
    map.addLayer(baseLayerGroup);
    map.addLayer(rasterLayerGroup);
    map.addLayer(locationGeoJSON);

    // Overlays
    map.addOverlay(popup);

    // create location option selection list
    initLocations(locationGeoJSON);

    // locationGeoJSON.getFeaturesInExtent(freehandDraw);
}

export { createMap };

// https://www.udemy.com/course/openlayers-6-from-scratch-with-a-project/
// https://openlayers.org/en/latest/apidoc/module-ol_layer_Vector-VectorLayer.html#getSource
// https://attacomsian.com/blog/javascript-iterate-objects
// https://www.freecodecamp.org/news/javascript-settimeout-how-to-set-a-timer-in-javascript-or-sleep-for-n-seconds/