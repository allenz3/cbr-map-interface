window.onload = init

function init() {
    // initialize map
    const map = new ol.Map({
        view: new ol.View({
            center: [-13392860.93604214, 6011494.743803331],
            zoom: 7
        }),
        target: 'js-map'
    });

    const popupContainerElement = document.getElementById('popup-coordinates');
    const popup = new ol.Overlay({
        element: popupContainerElement,
        positioning: 'center-left'
    });
    
    // Base Layers
    // OpenStreetMap Standard
    const openStreetMapStandard = new ol.layer.Tile({
        source: new ol.source.OSM(),
        zIndex: 1,
        visible: true,
        extent: [-13872002.193052245, 5686505.724526227, -13025867.222039266, 6339232.393199415],
        opacity: 0.5,
        title: 'OSMStandard'
    })

    // OpenStreetMap Humanitarian
    const openStreetMapHumanitarian = new ol.layer.Tile({
        source: new ol.source.OSM({
            url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
            //https://wiki.openstreetmap.org/wiki/Tile_servers
        }),
        zIndex: 0,
        visible: false,
        title: 'OSMHumanitarian'
    })

    // Bing Maps (key required)
    const bingMaps = new ol.layer.Tile({
        source: new ol.source.BingMaps({
            key: "Ahi7Plxe8amf9CFyGXySP2KXiTJ9ZENIYigIqIUW0rQ5UVJU5JCnzXbat-LsfQ48",
            imagerySet: 'AerialWithLabelsOnDemand'
            //https://docs.microsoft.com/en-us/bingmaps/rest-services/imagery/get-imagery-metadata
        }),
        visible: false,
        title: 'BingMaps'
    })

    const cartoDB = new ol.layer.Tile({ // CartoDB
            source: new ol.source.XYZ({
            url: 'https://{1-4}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{scale}.png',
            attributions: '© CARTO'
            //https://github.com/CartoDB/basemap-styles
        }),
        visible: false,
        title: 'CartoDarkAll'
    })

    const tileDebug = new ol.layer.Tile({ // Tile Debug
        source: new ol.source.TileDebug(),
        visible: false
    })
      
    const stamenTerrainWithLabels = new ol.layer.Tile({ // Stamen Terrain With Labels
        source: new ol.source.Stamen({
        layer: 'terrain-labels',
        attributions: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
        //http://maps.stamen.com/#terrain/12/37.7706/-122.3782
        }),
        visible: false,
        title: 'StamenTerrainWithLabels'
    })
       
    const stamenTerrain = new ol.layer.Tile({ // Stamen Terrain
        source: new ol.source.Stamen({
        layer: 'terrain',
        attributions: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
        //http://maps.stamen.com/#terrain/12/37.7706/-122.3782
        }),
        visible: false,
        title: 'StamenTerrain'
    })
    
    const tileArcGISLayer = new ol.layer.Tile ({ // ArcGIS
        source: new ol.source.TileArcGISRest({
        url: 'https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Population_World/MapServer',
        attributions: '(c) ESRI and its data partners'
        //https://sampleserver1.arcgisonline.com/ArcGIS/rest/services
        }),
        visible: false
    })

    // Layer Group
    const baseLayerGroup = new ol.layer.Group({
        layers: [
            openStreetMapStandard, openStreetMapHumanitarian, bingMaps, cartoDB, stamenTerrainWithLabels, stamenTerrain
        ]
    })
    map.addLayer(baseLayerGroup);

    const NOAAWMSLayer = new ol.layer.Tile ({ // NOAA WMS Layer (not working)
        source: new ol.source.TileWMS({
            url: 'https://nowcoast.noaa.gov/arcgis/services/nowcoast/analysis_meteohydro_sfc_qpe_time/MapServer/WMSServer?https://nowcoast.noaa.gov/arcgis/services/nowcoast/sat_meteo_emulated_imagery_lightningstrikedensity_goes_time/MapServer/WmsServer?',
            params: {
                LAYERS: 1,
                FORMAT: 'image/png',
                TRANSPARENT: true
            }
            //attributions: '<a href=https://nowcoast.noaa.gov/>© NOAA<a/>'
        }),
        visible: false
    })
    //map.addLayer(NOAAWMSLayer);
    //NOAAWMSLayer.getSource().setAttributions('<a href=https://nowcoast.noaa.gov/>© NOAA<a/>');
    //NOAAWMSLayer.set('maxZoom', 5);

    map.on('click', function(e) {
        console.log(e.coordinate);
    });
}