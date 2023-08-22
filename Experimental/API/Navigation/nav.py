import json

# List of file names
file_names = ["nav1.json", "nav2.json"]

# Loop through each file
for file_name in file_names:
    try:
        with open(file_name, "r") as json_file:
            data = json.load(json_file)
        
        # Format the JSON data
        formatted_data = json.dumps(data, indent=4)

        # Save the formatted JSON back to the file
        with open(file_name, "w") as json_file:
            json_file.write(formatted_data)

        print(f"Formatted and saved {file_name} with proper indentation.")
    except Exception as e:
        print(f"Error processing {file_name}: {e}")

