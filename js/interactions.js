// Map View Interactions
// hold alt + left click and drag mouse cursor to rotate
const dragRotateInteraction = new ol.interaction.DragRotate({
    condition: ol.events.condition.altKeyOnly
});

// draw coordinate polygons
const drawInteraction = new ol.interaction.Draw({
    type: 'Polygon',
    freehandCondition: ol.events.condition.shiftKeyOnly
});

// freehand drawing with the mouse cursor
const freehandDraw = drawInteraction.on('drawend', function(e) {
    let parser = new ol.format.GeoJSON();
    let drawnFeatures = parser.writeFeaturesObject([e.feature]);
    return drawnFeatures.features[0].geometry.coordinates;
});

export { dragRotateInteraction, drawInteraction, freehandDraw };

// https://openlayers.org/en/latest/apidoc/module-ol_interaction_Draw-Draw.html
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export