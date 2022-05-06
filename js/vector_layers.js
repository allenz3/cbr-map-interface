import styles from './styles.js';

const locationGeoJSON = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: './data/json/SacPAS_locations_GeoJSON.geojson',
        format: new ol.format.GeoJSON()
    }),
    visible: true,
    title: 'locationGeoJSON',
    style: new ol.style.Style({
        fill: styles.fillStyle,
        stroke: styles.strokeStyle,
        image: styles.circleStyle
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
        fill: styles.fillStyle,
        stroke: styles.strokeStyle,
        image: styles.circleStyle
    })
});

const source = locationGeoJSON.getSource().Uu;
const source2 = locationGeoJSON2.getSource().Uu;

export default { locationGeoJSON, locationGeoJSON2, source, source2 };