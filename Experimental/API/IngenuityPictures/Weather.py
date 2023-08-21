# import requests
# import json

# api_key = "7QVxWTvL4YZkPFPAgWQGydwacGjiVFoCN8UdnOcU"  # Replace with your actual API key
# sol = 650  # Change this to the sol you want to get data for
# url = f"https://api.nasa.gov/insight_weather/?api_key={api_key}&feedtype=json&ver=1.0&sol={sol}"

# response = requests.get(url)

# if response.status_code == 200:
#     data = response.json()
#     # Print the weather data
#     print("Weather data:")
#     print(json.dumps(data, indent=4))  # Indent the data for better readability
    
#     # Save the properly indented weather data as a JSON file
#     save_path = "/home/druglord/Documents/Important/Marss/three_js/Experimental/API/Weather/weather.json"
#     with open(save_path, "w") as json_file:
#         json.dump(data, json_file, indent=4)
#     print("Weather data saved to:", save_path)
# else:
#     print("Error:", response.status_code)

import requests
import json

sol = 650  # Replace this with the sol you want to get images for
url = f"https://mars.nasa.gov/rss/api/?feed=raw_images&category=ingenuity&feedtype=json&sol={sol}"

response = requests.get(url)

if response.status_code == 200:
    data = response.json()
    
    # Print the image data
    print("Image data:")
    print(json.dumps(data, indent=4))  # Indent the data for better readability
    
    # Save the properly indented image data as a JSON file
    save_path = "/home/druglord/Documents/Important/Marss/three_js/Experimental/API/Weather/weathersec.json"
    with open(save_path, "w") as json_file:
        json.dump(data, json_file, indent=4)
    print("Image data saved to:", save_path)
else:
    print("Error:", response.status_code)
