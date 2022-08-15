import controls from './controls.js';

const map = new ol.Map({
    view: new ol.View({
        center: [0, 0],
        zoom: 6,
        maxZoom: 16,
        minZoom: 6,
        extent: [-14500000,3500000,-12000000,6500000]
    }),
    target: 'js-map',
    keyboardEventTarget: document,
    controls: controls
});

function setViewCenter(long, lat) {
    map.getView().setCenter([long, lat]);
}
// https://stackoverflow.com/questions/27820784/openlayers-3-center-map

export default map;
export { setViewCenter };