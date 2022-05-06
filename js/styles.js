const fillStyle = new ol.style.Fill({
    color: [245, 49, 5, 1]
});

const strokeStyle = new ol.style.Stroke({
    color: [0, 0, 0, 1],
    width: 2,
    // lineCap: 'square',
    // lineJoin: 'bevel',
    // lineDash: [3, 3]
});

const circleStyle = new ol.style.Circle({
    fill: new ol.style.Fill({
        color: [255, 255, 255, 1]
    }),
    radius: 8,
    stroke: strokeStyle
});

const bluePoint = new ol.style.Style({
    image: new ol.style.Circle({
        fill: new ol.style.Fill({
            color: [0, 153, 255, 1]
        }),
        radius: 8,
        stroke: new ol.style.Stroke({
            color: [0, 0, 0, 1],
            width: 2
        })
    }),
    zIndex: 1
});

const whitePoint = new ol.style.Style({
    image: new ol.style.Circle({
        fill: new ol.style.Fill({
            color: [255, 255, 255, 1]
        }),
        radius: 8,
        stroke: new ol.style.Stroke({
            color: [0, 0, 0, 1],
            width: 2
        })
    }),
    zIndex: 0
});

export default { fillStyle, strokeStyle, circleStyle, bluePoint, whitePoint }