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

# Sources:
# https://en.wikipedia.org/wiki/GeoJSON
# https://stackoverflow.com/questions/1432924/python-change-the-scripts-working-directory-to-the-scripts-own-directory
# https://youtu.be/q5uM4VKywbA
# https://www.w3schools.com/python/python_json.asp
# https://stackoverflow.com/questions/12309269/how-do-i-write-json-data-to-a-file
