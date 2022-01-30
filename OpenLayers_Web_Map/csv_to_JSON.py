import csv
import os
import json

os.chdir("./OpenLayers_Web_Map")

with open('./data/locations/CV_SacPAS_Proj_LatLon.csv', 'r') as locations:
    csv_reader = csv.reader(locations)

    next(csv_reader)

    with open("./data/vector_data/locationGeoJSON.geojson", "w") as new_file:

        locations = {
            "type": "FeatureCollection",
            "features": [

            ]
        }

        for line in csv_reader: 
            location = {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "Point",
                    "coordinates": [line[4], line[3]]
                }
            }
            locations["features"].append(location)
        
        json.dump(locations, new_file)