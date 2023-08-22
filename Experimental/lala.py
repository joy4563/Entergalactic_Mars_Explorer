import json

json_file_path = "/home/druglord/Documents/Important/Marss/three_js/Experimental/most_interesting_places.json"

with open(json_file_path, "r") as json_file:
    data = json.load(json_file)

for entry in data:
    print(entry)  # Print the entire entry
    place_type = entry["type"]
    place_name = entry["name"]
    topography = entry["topogroup"]
    print(place_type, place_name, topography)  # Print the extracted values
