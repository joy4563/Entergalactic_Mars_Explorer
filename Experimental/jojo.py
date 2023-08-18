import json

# Replace with the absolute path to your "mars_features.json" file
json_file_path = "/home/druglord/Documents/Important/Marss/three_js/Experimental/most_interesting_places.json"

# Load the JSON data from the file
with open(json_file_path, 'r') as json_file:
    data = json.load(json_file)

# Iterate through the features and print their details
for feature in data['features']:
    print(f"ID: {feature['id']}")
    print(f"Type: {feature['type']}")
    print(f"Name: {feature['name']}")
    print(f"Location: {feature['location']}")
    print(f"Description: {feature['description']}")
    print(f"Coordinates: Latitude {feature['coordinates']['latitude']}, Longitude {feature['coordinates']['longitude']}")
    print()