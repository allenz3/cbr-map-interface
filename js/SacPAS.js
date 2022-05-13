import createMap from './main.js';
import { locationGeoJSON, source, locationGeoJSON2, source2 } from './vector_layers.js';

window.onload = init;

function init() {
    // SACPAS
    createMap(-13450000, 4700000, locationGeoJSON, source);
}