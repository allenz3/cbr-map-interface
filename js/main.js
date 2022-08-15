import map from './view.js';
import { setViewCenter } from './view.js';
import baseLayerGroup from './base_layers.js';
import rasterLayerGroup from './raster_layers.js';
import { popup } from './overlays.js';
import { createLocationsSet } from './locations.js';
import { makeFilterInventories } from './data_types.js';
import { makeURLInventories, generateURL } from './url.js';
// unused import needed for search filter function
import { searchFilter } from './filters.js';
// https://youtu.be/cRHQNNcYf6s]

function createMap(long, lat, vectorLayer, dataTypesJSON, URLConstant) {

    setViewCenter(long, lat);

    makeFilterInventories(dataTypesJSON);
    makeURLInventories(dataTypesJSON);
    const submitQuery = document.querySelector(".submit-query");
    submitQuery.addEventListener("click", () => generateURL(URLConstant));

    map.addLayer(baseLayerGroup);
    map.addLayer(rasterLayerGroup);
    map.addLayer(vectorLayer);
    map.addOverlay(popup);

    createLocationsSet(vectorLayer);
}

export { createMap };

// https://www.udemy.com/course/openlayers-6-from-scratch-with-a-project/