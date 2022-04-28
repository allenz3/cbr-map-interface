const fillStyle = new ol.style.Fill({
    color: [245, 49, 5, 1]
});

const strokeStyle = new ol.style.Stroke({
    color: [0, 0, 0, 1],
    width: 2,
    // lineCap: 'square',
    // lineJoin: 'bevel',
    // lineDash: [3, 3]
});

const circleStyle = new ol.style.Circle({
    fill: new ol.style.Fill({
        color: [255, 255, 255, 1]
    }),
    radius: 8,
    stroke: strokeStyle
});

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

const source = locationGeoJSON.getSource().Uu;

// Vector Layer Group
const vectorLayerGroup = new ol.layer.Group({
    layers: [
        locationGeoJSON
    ]
});

export default { vectorLayerGroup, source };