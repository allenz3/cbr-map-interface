// Raster Layers
const streamsLayer = new ol.layer.Tile ({ // ArcGIS
    source: new ol.source.TileArcGISRest({
        url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSHydroCached/MapServer',
        //sublayers: [{
        //    id: 7
        //}],
        attributions: '(c) ESRI and its data partners' 
    }),
    visible: false,
    title: 'StreamsLayer'
});

const NOAAWMSLayer = new ol.layer.Tile ({ // NOAA WMS Layer
    source: new ol.source.TileWMS({
        url: 'https://nowcoast.noaa.gov/arcgis/services/nowcoast/analysis_meteohydro_sfc_qpe_time/MapServer/WMSServer?https://nowcoast.noaa.gov/arcgis/services/nowcoast/sat_meteo_emulated_imagery_lightningstrikedensity_goes_time/MapServer/WmsServer?',
        params: {
            LAYERS: 1,
            FORMAT: 'image/png',
            TRANSPARENT: true
        }
        // attributions: '<a href=https://nowcoast.noaa.gov/>© NOAA<a/>'
    }),
    visible: false,
    title: 'NOAAWMSLayer'
});

// Tile Debug Layer, useful for development purposes
// const tileDebugLayer = new ol.layer.Tile({ 
//     source: new ol.source.TileDebug(),
//     visible: false,
//     title: 'TileDebugLayer'
// });

// Raster Layer Group
const rasterLayerGroup = new ol.layer.Group({
    layers: [
        streamsLayer, NOAAWMSLayer
    ]
});

// Layer Switcher Logic for Raster Layers
const rasterLayerElements = document.querySelector('select[name=additional_layers]');
const selectedLayers = new Set();
rasterLayerElements.addEventListener('click', function(e) {
    if (!selectedLayers.has(rasterLayerElements.value)) {
        e.target.innerHTML += "✅";
        selectedLayers.add(rasterLayerElements.value);
    } else {
        e.target.innerHTML = e.target.innerHTML.substring(0, e.target.innerHTML.length - 2);
        selectedLayers.delete(rasterLayerElements.value);
    }
    rasterLayerGroup.getLayers().forEach(function(layer) {
        layer.setVisible(selectedLayers.has(layer.get('title')));
    });
})

export default rasterLayerGroup;