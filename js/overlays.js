// Map Overlays
// coordinates on click
const popupContainerElement = document.getElementById('popup-coordinates');
const popup = new ol.Overlay({
    element: popupContainerElement,
    positioning: 'center-left'
});

// map.on('click', function(e) {
//     console.log(e.coordinate);
//     const clickedCoordinate = e.coordinate;
//     popup.setPosition(undefined);
//     popup.setPosition(clickedCoordinate);
//     popupContainerElement.innerHTML = clickedCoordinate;
// });

export { popup };