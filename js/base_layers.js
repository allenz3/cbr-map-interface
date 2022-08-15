const openStreetMapStandard = new ol.layer.Tile({
    source: new ol.source.OSM(),
    visible: true,
    title: 'OSMStandard'
});
// https://www.openstreetmap.org/

const bingMaps = new ol.layer.Tile({
    source: new ol.source.BingMaps({
        // key required
        key: "Ahi7Plxe8amf9CFyGXySP2KXiTJ9ZENIYigIqIUW0rQ5UVJU5JCnzXbat-LsfQ48",
        imagerySet: 'AerialWithLabelsOnDemand'
    }),
    visible: false,
    title: 'BingMaps'
});
// https://docs.microsoft.com/en-us/bingmaps/rest-services/imagery/get-imagery-metadata
    
const stamenTerrain = new ol.layer.Tile({ // Stamen Terrain
    source: new ol.source.Stamen({
        layer: 'terrain',
        attributions: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    visible: false,
    title: 'StamenTerrain'
});
// http://maps.stamen.com/#terrain/12/37.7706/-122.3782

const baseLayerGroup = new ol.layer.Group({ layers: [ openStreetMapStandard, bingMaps, stamenTerrain ] });

const baseLayerElements = document.querySelector("select[name=base_layers]");
const selectBaseLayer = baseLayerElements.addEventListener('change', () => 
    baseLayerGroup.getLayers().forEach((layer) => 
        layer.setVisible(layer.get('title') === baseLayerElements.value)
    )
);

export default baseLayerGroup;