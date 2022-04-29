# OpenLayers_Demo

Web App Link: https://allenz3.github.io/OpenLayers_Demo/

This is a map interface I am currently developing for Columbia Basin Research (CBR), part of the School of Aquatic and Fishery Sciences at the University of Washington. This map is intended to show a list of locations a user can choose from, and then highlight the location on the map when selected. There are many different base layers and additional layers that provide additional information to the user. This map interface will eventually be integrated into several pages the [CBR Website](https://www.cbr.washington.edu/), such as the [SacPAS](https://www.cbr.washington.edu/sacramento/) page, and the [DART](https://www.cbr.washington.edu/dart) page.

# Current Display

![Current Map Interface](/images/curr_map.png "OpenLayers Map Interface")

## Locations

You can search for a location's name using keywords in the search bar. The search results will be filtered so that only the location names containing your query will be displayed in the locations selection list.
## Selected Locations

You can select locations in the locations selection list by clicking on them. The location will then appear in the selected locations in the sidebar, and the corresponding location point on the map will turn blue. Once the location is selected, it can be deselected by clicking on it in the locations selection list, or in the selected locations list. The corresponding location point on the map will turn white again. Locations can also be selected and deselected by clicking on the location points on the map, which will add the newly selected location into the selected locations list. Clicking on the "Deselect All" button will clear the locations selection list. The selected location on the map will also turn white again.
## Base Layers

The base layer of the map can be changed using the drop down menu. Simply select your base layer of choice in accordance with your personal needs.

## Additional Layers

Additional overlays can be added to the map interface. Unlike the base layer, multiple overlays can be displayed at the same time. Simply select the overlays of your choice in accordance with your personal needs.

## Dataset Used

Still in development. The plan is to have the SacPAS locations displayed when the SacPAS button is clicked and to have the DART locations displayed when the DART button is clicked.

## Implementation Details

+ Libraries Used: OpenLayers is used to display the map interface
+ Locations are derived from CSV files that are transformed into GeoJSON files using Python scripts and displayed on the map interface using OpenLayers
+ Web App displayed using HTML/CSS, JavaScript used for the programming logic
    - base_layers.js contains the base layers used
    - controls.js contains the view controls for the map interface
    - interactions.js defines the user interactions for the map interface
    - locations.js sets up the locations list on the sidebar, and the location points on the map interface, and contains the logic needed to select and deselect locations
    - main.js runs the application and its functionalities
    - overlays.js has overlaid map interface interactions
    - raster_layers.js contains additional layers that can be overlayed onto the base layer
    - styles.js contains the styling for the map interface
    - vector_layers.js creates the location points for the map interface
    - view.js contains the map view for the application