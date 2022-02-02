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
        tileArcGISLayer, NOAAWMSLayer, tileDebugLayer, openStreetMapFragmentStatic
    ]
});

// Layer Switcher Logic for Raster Layers
const tileRasterLayerElements = document.querySelectorAll('.sidebar > input[type=checkbox]');
for (let tileRasterLayerElement of tileRasterLayerElements) {
    tileRasterLayerElement.addEventListener('change', function() {
        let tileRasterLayerElementValue = this.value;
        let tileRasterLayer;

        rasterLayerGroup.getLayers().forEach(function(element, index, array) {
            if (tileRasterLayerElementValue === element.get('title')) {
                tileRasterLayer = element;
            }
        })
        this.checked ? tileRasterLayer.setVisible(true) : tileRasterLayer.setVisible(false);
    })
}

export default rasterLayerGroup;