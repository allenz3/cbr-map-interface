# CBR Map Interface

Web App Link: https://allenz3.github.io/OpenLayers_Demo/

This is a map interface I have developed for Columbia Basin Research (CBR), part of the School of Aquatic and Fishery Sciences at the University of Washington. The user can select multiple location, data type, and year filters and create a query that can be viewed on the CBR website with the URL generated. The user can also select between several different base layers and additional layers. This map interface is integrated into several pages on the [CBR Website](https://www.cbr.washington.edu/), such as the [SacPAS](https://www.cbr.washington.edu/sacramento/) web page, and the [DART](https://www.cbr.washington.edu/dart) web page.

# Display
After selecting between SacPAS or DART on the index page, you will be greeted with this display (SacPAS displayed here): 

![Current Map Interface](/images/curr_map.png "OpenLayers Map Interface")

## Locations
You can select multiple locations at once from the locations list. You can also search for a location's name using keywords in the search bar. The search results will be filtered so that only the location names containing your keywords will be displayed in the locations selection list. When a location is selected, the data types list will be updated so that only the data types that are measured at the selected location will appear. If multiple locations are selected, only the data types that are present in all selected locations will appear.
## Location Points
You can select multiple location points at once from the map interface. The name of the location will be displayed when you hover over the location point. A selected location point will be blue and a deselected location point will be white. Selecting a location point from the map interface has the same functionality as selecting a location from the location list.
## Data Types
You can select multiple data types at once from the data types list. When a data type is selected, the locations list is updated so that only the locations that measure the selected data type will appear. Selecting multiple data types at once will filter the locations list so that only the locations that contain all of the selected data types will appear.
## Years
You can select multiple years at once from the years list. Selecting years currently has no effect on the other two lists. A filtering functionality for the years list will potentially be added in the future.
## Base Layers
The base layer of the map can be changed using the drop down menu. Changing the base layer of the map interface will change the appearance of the underlying map. Simply select your base layer of choice in accordance with your personal needs.
## Additional Layers
Additional layers can be added to the map interface, and will be overlaid on top of the map interface. Unlike the base layers, multiple additional layers can be displayed at the same time. Simply select the additional layers of your choice in accordance with your personal needs.
## URL Generated
Hitting the "Submit Query" button will generate a query URL that can be used to view the data on a CBR web page. The URL is generated based on the currently selected filters. You can reset the filters by pressing the "Reset Query" button.
## Implementation Details
+ Libraries Used: OpenLayers is used to display the map interface
+ Locations are derived from CSV and text files that are transformed into GeoJSON files using Python scripts and displayed on the map interface using OpenLayers
+ Web App displayed using HTML/CSS, JavaScript used for the programming logic
    - base_layers.js contains the base layers used
    - controls.js contains the view controls for the map interface
    - DART.js sends a command to initialize the DART web page
    - data_types.js creates an location-based data type inventory that can be used by the other files
    - filters.js is responsible for managing all the interactions for the filters (location, data type, year) used
    - interactions.js defines the user interactions for the map interface
    - locations.js initializes the locations used for the map interface
    - main.js initializes the web pages
    - overlays.js has overlaid map interface interactions
    - raster_layers.js contains additional layers that can be overlaid onto the base layer
    - SacPAS.js sends a command to initialize the SacPAS web page
    - styles.js contains the styling for the map interface, including the location points
    - url.js generates the query URLs for the data that can be viewed on a CBR web page
    - vector_layers.js creates the location points for the map interface
    - view.js contains the map view for the application