import createMap from './main.js';
import { locationGeoJSON } from './vector_layers.js';

window.onload = init;

function init() {
    // SACPAS
    createMap(-13450000, 4700000, locationGeoJSON);
}