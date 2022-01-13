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
                visible: true,
                extent: [-13872002.193052245, 5686505.724526227, -13025867.222039266, 6339232.393199415],
                opacity: 0.5
            }),
        ],
        target: 'js-map'
    });

    // Layer Group
    const layerGroup = new ol.layer.Group({
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM({
                    url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
                }),
                zIndex: 0,
                visible: true
            })
        ]
    })
    map.addLayer(layerGroup);
    
    map.on('click', function(e) {
        console.log(e.coordinate);
    });
}