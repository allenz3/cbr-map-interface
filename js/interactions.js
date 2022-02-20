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

const selectInteraction = new ol.interaction.Select();
const selectedPoints = new Set();
selectInteraction.on('select', function(e) {
    const curr = e.selected[0];
    if (e.selected.length > 0 && curr.getGeometry().getType() === 'Point') {
        selectedPoints.add(curr);
    }
    selectedPoints.forEach(point => {
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
    })
});

export default {dragRotateInteraction, drawInteraction, selectInteraction};
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export