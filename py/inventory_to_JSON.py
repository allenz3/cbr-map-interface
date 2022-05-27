import os
import json

# This script converts .txt data into JSON data for further JavaScript processing.
# This script creates a new JSON file, so it only needs to be run once per .txt file.

os.chdir("../OpenLayers_Demo")

with open('./data/txt/riverinventory4map.txt', 'r') as inventory:

    inventory.readline()

    with open("./data/json/year_and_data_types.json", "w") as new_file:

        riverData = {
            "river_data": [

            ]
        }

        for line in inventory.readlines():
            col = line.split("|")
            paramDBs = col[2].split(", ")
            dataTypes = []
            for param in paramDBs:
                dataTypes.append(param)
            siteData = {
                "site_code": col[0],
                "year": col[1],
                "paramDB": dataTypes,
                "paramWeb": col[3],
                "paramDisplayLabel": col[4]
            }
            riverData["river_data"].append(siteData)
        
        json.dump(riverData, new_file)

# Sources:
# https://youtu.be/Uh2ebFW8OYM
# https://www.w3schools.com/python/ref_string_split.asp