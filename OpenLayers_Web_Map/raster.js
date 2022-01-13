window.onload = init

function init() {
    // initialize map
    const map = new ol.Map({
        view: new ol.View({
            center: [-13392860.93604214, 6011494.743803331],
            zoom: 7
        }),
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM(),
                zIndex: 1,
                visible: false,
                extent: [-13872002.193052245, 5686505.724526227, -13025867.222039266, 6339232.393199415],
                opacity: 0.5
            }),
        ],
        target: 'js-map'
    });

    // Layer Group
    const layerGroup = new ol.layer.Group({
        layers: [
            new ol.layer.Tile({ // OpenStreetMap
                source: new ol.source.OSM({
                    url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
                    //https://wiki.openstreetmap.org/wiki/Tile_servers
                }),
                zIndex: 0,
                visible: true
            }),
            new ol.layer.Tile({ // Bing Maps (key required)
                source: new ol.source.BingMaps({
                    key: "Ahi7Plxe8amf9CFyGXySP2KXiTJ9ZENIYigIqIUW0rQ5UVJU5JCnzXbat-LsfQ48",
                    imagerySet: 'AerialWithLabelsOnDemand'
                    //https://docs.microsoft.com/en-us/bingmaps/rest-services/imagery/get-imagery-metadata
                }),
                visible: false
            }),
            new ol.layer.Tile({ // CartoDB
                source: new ol.source.XYZ({
                    url: 'https://{1-4}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{scale}.png'
                    //https://github.com/CartoDB/basemap-styles
                }),
                visible: false
            }),
            new ol.layer.Tile({ // Tile Debug
                source: new ol.source.TileDebug(),
                visible: false
            }),
            new ol.layer.Tile({ // Stamen
                source: new ol.source.Stamen({
                    layer: 'terrain'
                    //http://maps.stamen.com/#terrain/12/37.7706/-122.3782
                }),
                visible: false
            }),
            new ol.layer.Tile ({ // ArcGIS
                source: new ol.source.TileArcGISRest({
                    url: 'https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Population_World/MapServer'
                    //https://sampleserver1.arcgisonline.com/ArcGIS/rest/services
                }),
                visible: false
            })
        ]
    })
    map.addLayer(layerGroup);
    
    map.on('click', function(e) {
        console.log(e.coordinate);
    });
}