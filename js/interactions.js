import { selectedLocationsSet } from "./main.js";

// Map View Interactions
// hold alt + left click and drag mouse cursor to rotate
const dragRotateInteraction = new ol.interaction.DragRotate({
    condition: ol.events.condition.altKeyOnly
});

// draw coordinate polygons
const drawInteraction = new ol.interaction.Draw({
    type: 'Polygon',
    freehand: true
});

drawInteraction.on('drawend', function(e) {
    let parser = new ol.format.GeoJSON();
    let drawnFeatures = parser.writeFeaturesObject([e.feature]);
    console.log(drawnFeatures.features[0].geometry.coordinates);
});

function addPoint(point, locationString) {
    selectedLocationsSet.add(locationString); 
    point.setStyle(
        new ol.style.Style({
            image: new ol.style.Circle({
                fill: new ol.style.Fill({
                    color: [0, 153, 255, 1]
                }),
                radius: 8,
                stroke: new ol.style.Stroke({
                    color: [0, 0, 0, 1],
                    width: 2
                })
            })
        })
    )
}

function removePoint(point, locationString) {
    selectedLocationsSet.delete(locationString);
    point.setStyle(
        new ol.style.Style({
            image: new ol.style.Circle({
                fill: new ol.style.Fill({
                    color: [255, 255, 255, 1]
                }),
                radius: 8,
                stroke: new ol.style.Stroke({
                    color: [0, 0, 0, 1],
                    width: 2
                })
            })
        })
    )   
}

export default { dragRotateInteraction, drawInteraction, addPoint, removePoint };
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export