// Vector Layers
const washingtonGeoJSON = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: './data/json/locationsGeoJSON.geojson',
        format: new ol.format.GeoJSON()
    }),
    visible: true
})

// Vector Layer Group
const vectorLayerGroup = new ol.layer.Group({
    layers: [
        washingtonGeoJSON
    ]
});

export default vectorLayerGroup;