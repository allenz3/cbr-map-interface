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

    map.on('click', function(e) {
        console.log(e.coordinate);
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
        visible: true,
        //extent: [-13872002.193052245, 5686505.724526227, -13025867.222039266, 6339232.393199415],
        //opacity: 0.5,
        title: 'OSMStandard'
    });

    // OpenStreetMap Humanitarian
    const openStreetMapHumanitarian = new ol.layer.Tile({
        source: new ol.source.OSM({
            url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
            //https://wiki.openstreetmap.org/wiki/Tile_servers
        }),
        visible: false,
        title: 'OSMHumanitarian'
    });

    // Bing Maps (key required)
    const bingMaps = new ol.layer.Tile({
        source: new ol.source.BingMaps({
            key: "Ahi7Plxe8amf9CFyGXySP2KXiTJ9ZENIYigIqIUW0rQ5UVJU5JCnzXbat-LsfQ48",
            imagerySet: 'AerialWithLabelsOnDemand'
            //https://docs.microsoft.com/en-us/bingmaps/rest-services/imagery/get-imagery-metadata
        }),
        visible: false,
        title: 'BingMaps'
    });

    const cartoDB = new ol.layer.Tile({ // CartoDB
            source: new ol.source.XYZ({
            url: 'https://{1-4}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{scale}.png',
            attributions: '© CARTO'
            //https://github.com/CartoDB/basemap-styles
        }),
        visible: false,
        title: 'CartoDarkAll'
    });

    const stamenTerrainWithLabels = new ol.layer.Tile({ // Stamen Terrain With Labels
        source: new ol.source.Stamen({
        layer: 'terrain-labels',
        attributions: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
        //http://maps.stamen.com/#terrain/12/37.7706/-122.3782
        }),
        visible: false,
        title: 'StamenTerrainWithLabels'
    });
       
    const stamenTerrain = new ol.layer.Tile({ // Stamen Terrain
        source: new ol.source.Stamen({
        layer: 'terrain',
        attributions: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
        //http://maps.stamen.com/#terrain/12/37.7706/-122.3782
        }),
        visible: false,
        title: 'StamenTerrain'
    });

    // Base Vector Layers
    // Vector Tile Layer OpenStreetMap
    const openStreetMapVectorTile = new ol.layer.VectorTile({
        source: new ol.source.VectorTile({
            url: 'https://api.maptiler.com/tiles/v3-openmaptiles/{z}/{x}/{y}.pbf?key=MLL7YM4jGtTtzUiYA4OH',
            format: new ol.format.MVT(),
            attributions: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        }),
        visible: false,
        title: 'VectorTileLayerOpenStreetMap'
    });

    const openStreetMapVectorTileStyles = 'https://api.maptiler.com/maps/623ecbc0-9057-4cc9-bb17-066c8ef24990/style.json?key=MLL7YM4jGtTtzUiYA4OH'
    fetch(openStreetMapVectorTileStyles).then(function(response) {
        response.json().then(function(glStyle) {
            console.log(glStyle);
            olms.applyStyle(openStreetMapVectorTile, glStyle, 'v3-openmaptiles');
        });
    })

    // Base Layer Group
    const baseLayerGroup = new ol.layer.Group({
        layers: [
            openStreetMapStandard, openStreetMapHumanitarian, bingMaps, cartoDB, stamenTerrainWithLabels, stamenTerrain, openStreetMapVectorTile
        ]
    });
    map.addLayer(baseLayerGroup);

    // Layer Switcher Logic for BaseLayers
    const baseLayerElements = document.querySelectorAll('.sidebar > input[type=radio]');
    for (let baseLayerElement of baseLayerElements) {
        baseLayerElement.addEventListener('change', function() {
            let baseLayerElementValue = this.value;
            baseLayerGroup.getLayers().forEach(function(element, index, array) {
                let baseLayerName = element.get('title');
                element.setVisible(baseLayerName === baseLayerElementValue)
            })
        })
    }
    //https://www.w3schools.com/jsref/met_document_queryselectorall.asp
    
    const tileArcGISLayer = new ol.layer.Tile ({ // ArcGIS
        source: new ol.source.TileArcGISRest({
        url: 'https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Population_World/MapServer',
        attributions: '(c) ESRI and its data partners'
        //https://sampleserver1.arcgisonline.com/ArcGIS/rest/services
        }),
        visible: false,
        title: 'TileArcGISLayer'
    });

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
        visible: false,
        title: 'NOAAWMSLayer'
    });
    //map.addLayer(NOAAWMSLayer);
    //NOAAWMSLayer.getSource().setAttributions('<a href=https://nowcoast.noaa.gov/>© NOAA<a/>');
    //NOAAWMSLayer.set('maxZoom', 5);

    const tileDebugLayer = new ol.layer.Tile({ // Tile Debug
        source: new ol.source.TileDebug(),
        visible: false,
        title: 'TileDebugLayer'
    });
    
    // Static Image OpenStreetMap Humanitarian
    const openStreetMapFragmentStatic = new ol.layer.Image({
        source: new ol.source.ImageStatic({
            url: './data/static_images/OpenLayers_Static_Humanitarian.png',
            imageExtent: [4991698.9328313675, 5050292.393744084, 10008191.828130603, 10013417.911357462],
            attributions: '<a href=https://www.openstreetmap.org/copyright/>© OpenStreetMap contributors<a/>'
        }),
        visible: false,
        title: 'openStreetMapFragmentStatic'
    });

    const washingtonGeoJSON = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: './data/vector_data/map.geojson',
            format: new ol.format.GeoJSON()
        }),
        visible: true
    })
    map.addLayer(washingtonGeoJSON);

    // Raster Tile Layer Group
    const rasterLayerGroup = new ol.layer.Group({
        layers: [
            tileArcGISLayer, NOAAWMSLayer, tileDebugLayer, openStreetMapFragmentStatic
        ]
    });
    map.addLayer(rasterLayerGroup);

    // Layer Switcher Logic for Raster Tile Layers
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
}