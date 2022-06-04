import { fillStyle, strokeStyle, circleStyle } from './styles.js';

const locationGeoJSON = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: './data/json/SacPAS_locations_GeoJSON.geojson',
        format: new ol.format.GeoJSON()
    }),
    visible: true,
    title: 'locationGeoJSON',
    style: new ol.style.Style({
        fill: fillStyle,
        stroke: strokeStyle,
        image: circleStyle
    })
});

const locationGeoJSON2 = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: './data/json/DART_locations_GeoJSON.geojson',
        format: new ol.format.GeoJSON()
    }),
    visible: true,
    title: 'locationGeoJSON2',
    style: new ol.style.Style({
        fill: fillStyle,
        stroke: strokeStyle,
        image: circleStyle
    })
});

export { locationGeoJSON, locationGeoJSON2 };