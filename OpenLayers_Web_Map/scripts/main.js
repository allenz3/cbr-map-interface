import baseLayerGroup from './base_layers.js'
import rasterLayerGroup from './raster_layers.js'
// https://youtu.be/cRHQNNcYf6s

window.onload = init

function init() {
    // controls
    const fullScreenControl = new ol.control.FullScreen();
    const mousePositionControl = new ol.control.MousePosition();
    const overViewMapControl = new ol.control.OverviewMap({
        collapsed: false,
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ]
    });
    const scaleLineControl = new ol.control.ScaleLine();
    const zoomSliderControl = new ol.control.ZoomSlider();
    const zoomToExtentControl = new ol.control.ZoomToExtent();
    const attributionControl = new ol.control.Attribution({
        collapsible: true
    });
    
    // initialize map
    const map = new ol.Map({
        view: new ol.View({
            //center: [-13392860.93604214, 6011494.743803331],
            center: ol.proj.transform([-120.740135, 47.751076], 'EPSG:4326', 'EPSG:3857'),
            zoom: 7
            //maxZoom: 6,
            //minZoom: 2,
            //rotation: 0.5
            //https://stackoverflow.com/questions/27820784/openlayers-3-center-map
        }),
        target: 'js-map',
        keyboardEventTarget: document,
        controls: ol.control.defaults({attribution: false}).extend([
            fullScreenControl,
            //mousePositionControl,
            overViewMapControl,
            scaleLineControl,
            zoomSliderControl,
            zoomToExtentControl,
            attributionControl
        ]),
    });

    // coordinates on click
    const popupContainerElement = document.getElementById('popup-coordinates');
    const popup = new ol.Overlay({
        element: popupContainerElement,
        positioning: 'center-left'
    });
    //map.addOverlay(popup);

    // map.on('click', function(e) {
    //     console.log(e.coordinate);
    //     const clickedCoordinate = e.coordinate;
    //     popup.setPosition(undefined);
    //     popup.setPosition(clickedCoordinate);
    //     popupContainerElement.innerHTML = clickedCoordinate;
    // });

    // hold alt + left click and drag mouse cursor to rotate
    const dragRotateInteraction = new ol.interaction.DragRotate({
        condition: ol.events.condition.altKeyOnly
    });
    map.addInteraction(dragRotateInteraction);

    // draw coordinate polygons
    const drawInteraction = new ol.interaction.Draw({
        type: 'Polygon',
        freehand: true
    });
    //map.addInteraction(drawInteraction);

    drawInteraction.on('drawend', function(e) {
        let parser = new ol.format.GeoJSON();
        let drawnFeatures = parser.writeFeaturesObject([e.feature]);
        console.log(drawnFeatures.features[0].geometry.coordinates);
    });

    map.addLayer(baseLayerGroup);

    // Layer Switcher Logic for BaseLayers
    const baseLayerElements = document.querySelectorAll('.sidebar > input[type=radio]');
    for (let baseLayerElement of baseLayerElements) {
        baseLayerElement.addEventListener('change', function() {
            let baseLayerElementValue = this.value;
            baseLayerGroup.getLayers().forEach(function(element, index, array) {
                let baseLayerName = element.get('title');
                element.setVisible(baseLayerName === baseLayerElementValue)
            })
        })
    }
    //https://www.w3schools.com/jsref/met_document_queryselectorall.asp

    const washingtonGeoJSON = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: './data/json/locationsGeoJSON.geojson',
            format: new ol.format.GeoJSON()
        }),
        visible: true
    })
    map.addLayer(washingtonGeoJSON);

    map.addLayer(rasterLayerGroup);

    // Layer Switcher Logic for Raster Tile Layers
    const tileRasterLayerElements = document.querySelectorAll('.sidebar > input[type=checkbox]');
    for (let tileRasterLayerElement of tileRasterLayerElements) {
        tileRasterLayerElement.addEventListener('change', function() {
            let tileRasterLayerElementValue = this.value;
            let tileRasterLayer;

            rasterLayerGroup.getLayers().forEach(function(element, index, array) {
                if (tileRasterLayerElementValue === element.get('title')) {
                    tileRasterLayer = element;
                }
            })
            this.checked ? tileRasterLayer.setVisible(true) : tileRasterLayer.setVisible(false);
        })
    }
}