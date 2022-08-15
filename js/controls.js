// Map View Controls

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

const controls = ol.control.defaults({ attribution: false }).extend([
    fullScreenControl,
    zoomSliderControl,
    zoomToExtentControl,
    attributionControl
])

export default controls;