// Raster Layers
const tileArcGISLayer = new ol.layer.Tile ({ // ArcGIS
    source: new ol.source.TileArcGISRest({
        url: 'https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Population_World/MapServer',
        attributions: '(c) ESRI and its data partners'
        // https://sampleserver1.arcgisonline.com/ArcGIS/rest/services
    }),
    visible: false,
    title: 'TileArcGISLayer'
});

const tileArcGISLayer2 = new ol.layer.Tile ({ // ArcGIS
    source: new ol.source.TileArcGISRest({
        url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSHydroCached/MapServer',
        //sublayers: [{
        //    id: 7
        //}],
        attributions: '(c) ESRI and its data partners' 
    }),
    visible: false,
    title: 'TileArcGISLayer2'
});

const tileArcGISLayer3 = new ol.layer.Tile ({ // ArcGIS
    source: new ol.source.TileArcGISRest({
        url: 'https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/WaterTemplate/LocalGovernmentInfrastructureBasemap/MapServer',
        sublayers: [{
            id: 7
        }],
        attributions: '(c) ESRI and its data partners' 
    }),
    visible: false,
    title: 'TileArcGISLayer3'
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
// map.addLayer(NOAAWMSLayer);
// NOAAWMSLayer.getSource().setAttributions('<a href=https://nowcoast.noaa.gov/>© NOAA<a/>');
// NOAAWMSLayer.set('maxZoom', 5);

const tileDebugLayer = new ol.layer.Tile({ // Tile Debug
    source: new ol.source.TileDebug(),
    visible: false,
    title: 'TileDebugLayer'
});

// Static Image OpenStreetMap Humanitarian
const openStreetMapFragmentStatic = new ol.layer.Image({
    source: new ol.source.ImageStatic({
        url: './data/png/OpenLayers_Static_Humanitarian.png',
        imageExtent: [4991698.9328313675, 5050292.393744084, 10008191.828130603, 10013417.911357462],
        attributions: '<a href=https://www.openstreetmap.org/copyright/>© OpenStreetMap contributors<a/>'
    }),
    visible: false,
    title: 'openStreetMapFragmentStatic'
});

// Raster Layer Group
const rasterLayerGroup = new ol.layer.Group({
    layers: [
        tileArcGISLayer, tileArcGISLayer2, tileArcGISLayer3, NOAAWMSLayer, tileDebugLayer, openStreetMapFragmentStatic
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