// import {Circle, Fill, Stroke, Style} from '../libs/v6.10.0-dist/ol.js';

// const filled = new Style({
//   fill: new Fill({
//     color: 'rgba(255,255,255,0.8)',
//   })
// });

// Vector Layers
const locationGeoJSON = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: './data/json/locationsGeoJSON.geojson',
        format: new ol.format.GeoJSON()
    }),
    visible: true,
    title: 'locationGeoJSON',
    //style: filled
});

// Vector Layer Group
const vectorLayerGroup = new ol.layer.Group({
    layers: [
        locationGeoJSON
    ]
});

export default vectorLayerGroup;