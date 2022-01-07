window.onload = init

function init(){
    const map = new ol.Map({
        view: new ol.View({
            center: ol.proj.transform([-120.740135, 47.751076], 'EPSG:4326', 'EPSG:3857'),
            zoom: 7
            //https://stackoverflow.com/questions/27820784/openlayers-3-center-map
        }),
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        target: "js-map"
    }) 
}