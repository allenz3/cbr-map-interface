import csv
import os
import json

# This script converts csv data into GeoJSON data so that OpenLayers can use it.
# This script creates a new JSON file, so it only needs to be run once per CSV file.

os.chdir("../OpenLayers_Demo")

with open('./data/csv/CB_river_stations_latlong.csv', 'r') as locations:
    csv_reader = csv.reader(locations)

    next(csv_reader)

    with open("./data/json/DART_locations_GeoJSON.geojson", "w") as new_file:

        locations = {
            "type": "FeatureCollection",
            "features": [

            ]
        }

        for line in csv_reader: 
            location = {
                "type": "Feature",
                "properties": {"proj": line[0], "name": line[1], "lat": line[2], "lon": line[3]},
                "geometry": {
                    "type": "Point",
                    "coordinates": [line[3], line[2]]
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
