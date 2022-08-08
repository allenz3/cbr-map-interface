// Base Layers
// OpenStreetMap Standard
const openStreetMapStandard = new ol.layer.Tile({
    source: new ol.source.OSM(),
    visible: true,
    // extent: [-13872002.193052245, 5686505.724526227, -13025867.222039266, 6339232.393199415],
    // opacity: 0.5,
    title: 'OSMStandard'
});

// Bing Maps (key required)
const bingMaps = new ol.layer.Tile({
    source: new ol.source.BingMaps({
        key: "Ahi7Plxe8amf9CFyGXySP2KXiTJ9ZENIYigIqIUW0rQ5UVJU5JCnzXbat-LsfQ48",
        imagerySet: 'AerialWithLabelsOnDemand'
        // https://docs.microsoft.com/en-us/bingmaps/rest-services/imagery/get-imagery-metadata
    }),
    visible: false,
    title: 'BingMaps'
});
    
const stamenTerrain = new ol.layer.Tile({ // Stamen Terrain
    source: new ol.source.Stamen({
    layer: 'terrain',
    attributions: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    // http://maps.stamen.com/#terrain/12/37.7706/-122.3782
    }),
    visible: false,
    title: 'StamenTerrain'
});

// Base Layer Group
const baseLayerGroup = new ol.layer.Group({
    layers: [
        openStreetMapStandard, bingMaps, stamenTerrain
    ]
});

// Layer Switcher Logic for BaseLayers
const baseLayerElements = document.querySelector('select[name=base_layers]');
baseLayerElements.addEventListener('change', function() {
    baseLayerGroup.getLayers().forEach(function(layer) {
        layer.setVisible(layer.get('title') === baseLayerElements.value);
    });
})

export default baseLayerGroup;