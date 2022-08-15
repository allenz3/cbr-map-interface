import { fillStyle, strokeStyle, circleStyle } from './styles.js';

const SacPASVectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: './data/json/SacPAS_locations_GeoJSON.geojson',
        format: new ol.format.GeoJSON()
    }),
    visible: true,
    style: new ol.style.Style({
        fill: fillStyle,
        stroke: strokeStyle,
        image: circleStyle
    })
});

const DARTVectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: './data/json/DART_locations_GeoJSON.geojson',
        format: new ol.format.GeoJSON()
    }),
    visible: true,
    style: new ol.style.Style({
        fill: fillStyle,
        stroke: strokeStyle,
        image: circleStyle
    })
});

export { SacPASVectorLayer, DARTVectorLayer };