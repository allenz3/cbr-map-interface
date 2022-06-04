import createMap from './main.js';
import { locationGeoJSON2 } from './vector_layers.js';

window.onload = init;

function init() {
    // DART
    createMap(-13200000, 5850000, locationGeoJSON2);
}