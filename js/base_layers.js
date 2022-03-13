// Base Layers
// OpenStreetMap Standard
const openStreetMapStandard = new ol.layer.Tile({
    source: new ol.source.OSM(),
    visible: true,
    // extent: [-13872002.193052245, 5686505.724526227, -13025867.222039266, 6339232.393199415],
    // opacity: 0.5,
    title: 'OSMStandard'
});

// OpenStreetMap Humanitarian
const openStreetMapHumanitarian = new ol.layer.Tile({
    source: new ol.source.OSM({
        url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        // https://wiki.openstreetmap.org/wiki/Tile_servers
    }),
    visible: false,
    title: 'OSMHumanitarian'
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

const cartoDB = new ol.layer.Tile({ // CartoDB
        source: new ol.source.XYZ({
        url: 'https://{1-4}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{scale}.png',
        attributions: '© CARTO'
        // https://github.com/CartoDB/basemap-styles
    }),
    visible: false,
    title: 'CartoDarkAll'
});

const stamenTerrainWithLabels = new ol.layer.Tile({ // Stamen Terrain With Labels
    source: new ol.source.Stamen({
    layer: 'terrain-labels',
    attributions: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    // http://maps.stamen.com/#terrain/12/37.7706/-122.3782
    }),
    visible: false,
    title: 'StamenTerrainWithLabels'
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

// Base Vector Layers
// Vector Tile Layer OpenStreetMap
const openStreetMapVectorTile = new ol.layer.VectorTile({
    source: new ol.source.VectorTile({
        url: 'https://api.maptiler.com/tiles/v3-openmaptiles/{z}/{x}/{y}.pbf?key=MLL7YM4jGtTtzUiYA4OH',
        format: new ol.format.MVT(),
        attributions: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    }),
    visible: false,
    title: 'VectorTileLayerOpenStreetMap'
});

const openStreetMapVectorTileStyles = 'https://api.maptiler.com/maps/623ecbc0-9057-4cc9-bb17-066c8ef24990/style.json?key=MLL7YM4jGtTtzUiYA4OH'
fetch(openStreetMapVectorTileStyles).then(function(response) {
    response.json().then(function(glStyle) {
        // console.log(glStyle);
        olms.applyStyle(openStreetMapVectorTile, glStyle, 'v3-openmaptiles');
    });
})

// Base Layer Group
const baseLayerGroup = new ol.layer.Group({
    layers: [
        openStreetMapStandard, openStreetMapHumanitarian, bingMaps, cartoDB, stamenTerrainWithLabels, stamenTerrain, openStreetMapVectorTile
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