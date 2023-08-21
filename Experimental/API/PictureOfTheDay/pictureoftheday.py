import requests
import os
import shutil
from datetime import datetime
import time

api_key = "7QVxWTvL4YZkPFPAgWQGydwacGjiVFoCN8UdnOcU"  # Replace with your actual API key
save_directory = "/home/druglord/Documents/Important/Marss/three_js/Experimental/API/PictureOfTheDay"

url = f"https://api.nasa.gov/planetary/apod?api_key={api_key}"
response = requests.get(url)

if response.status_code == 200:
    data = response.json()
    image_url = data.get("url")
    image_title = data.get("title")
    
    image_response = requests.get(image_url, stream=True)
    
    if image_response.status_code == 200:
        # Save the image with a fixed name
        image_path = os.path.join(save_directory, "image.jpg")
        with open(image_path, "wb") as image_file:
            image_response.raw.decode_content = True
            shutil.copyfileobj(image_response.raw, image_file)
        
        print(f"Image saved as 'image.jpg'")
        
        # Add image title with current date and time to fetched_images.txt
        fetched_images_file = os.path.join(save_directory, "fetched_images.txt")
        current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        with open(fetched_images_file, "a+") as fetched_file:
            existing_lines = fetched_file.readlines()
            updated = False
            fetched_file.seek(0)
            for line in existing_lines:
                if image_title in line:
                    updated_line = f"{image_title} - {current_time}\n"
                    fetched_file.write(updated_line)
                    updated = True
                else:
                    fetched_file.write(line)
            
            if not updated:
                fetched_file.write(f"{image_title} - {current_time}\n")
        
        # Introduce a delay before the next request to avoid rate limiting
        time.sleep(3)  # Adjust the delay time as needed
    else:
        print("Error downloading image:", image_response.status_code)
else:
    print("Error:", response.status_code)
