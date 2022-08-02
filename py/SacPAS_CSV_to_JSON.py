import csv
import os
import json

# This script converts csv data into GeoJSON data so that OpenLayers can use it.
# This script creates a new JSON file, so it only needs to be run once per CSV file.

os.chdir("../OpenLayers_Demo")

with open('./data/csv/CV_SacPAS_Proj_LatLon_updated22-07-12.csv', 'r') as locations:
    csv_reader = csv.reader(locations)

    next(csv_reader)

    with open("./data/json/SacPAS_locations_GeoJSON.geojson", "w") as new_file:

        locations = {
            "type": "FeatureCollection",
            "features": [

            ]
        }

        for line in csv_reader:
            if line[5] == "1":
                location = {
                    "type": "Feature",
                    "properties": {"proj": line[0], "name": line[1], "basin": line[2], "lat": line[3], "lon": line[4]},
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
