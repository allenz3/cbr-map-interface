import map from './view.js';

// Map Overlays
// coordinates on click
const popupContainerElement = document.getElementById('popup-coordinates');
const popup = new ol.Overlay({
    element: popupContainerElement,
    positioning: 'center-left'
});

// location name pop-up
const overlayContainerElement = document.querySelector(".overlay-container");
const overlayLayer = new ol.Overlay({
    element: overlayContainerElement
});
map.addOverlay(overlayLayer);
const overlayFeatureName = document.getElementById("feature-name");

// when the pointer hovers over a location point, the location name appears
const pointMove = map.on("pointermove", function(e) {
    overlayLayer.setPosition(undefined);
    map.forEachFeatureAtPixel(e.pixel, function(feature) {
        overlayLayer.setPosition(e.coordinate);
        overlayLayer.setOffset([10, 10]);
        overlayFeatureName.innerHTML = feature.get("name");
    });
});
// https://openlayers.org/en/latest/apidoc/module-ol_MapBrowserEvent-MapBrowserEvent.html
// https://openlayers.org/en/latest/apidoc/module-ol_Overlay-Overlay.html

// map.on('click', function(e) {
//     console.log(e.coordinate);
//     const clickedCoordinate = e.coordinate;
//     popup.setPosition(undefined);
//     popup.setPosition(clickedCoordinate);
//     popupContainerElement.innerHTML = clickedCoordinate;
// });

export { popup };