import createMap from './main.js';
import { locationGeoJSON, source, locationGeoJSON2, source2 } from './vector_layers.js';

window.onload = init;

function init() {
    // DART
    createMap(-13200000, 5800000, locationGeoJSON2, source2);
}