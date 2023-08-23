import os
import requests
import json

def fetch_all_images():
    save_directory = "/home/druglord/Documents/Important/Marss/three_js/Experimental/API/IngenuityPictures/picture_json"
    os.makedirs(save_directory, exist_ok=True)

    total_images = 9070  # Total number of images
    images_per_page = 25

    total_pages = total_images // images_per_page + 1

    image_metadata = []

    for page in range(total_pages):
        url = f"https://mars.nasa.gov/rss/api/?feed=raw_images&category=ingenuity&feedtype=json&page={page}"
        response = requests.get(url)

        if response.status_code == 200:
            data = response.json()
            images = data.get("images", [])

            for idx, image_data in enumerate(images):
                image_url = image_data.get("image_files", {}).get("medium")
                if image_url:
                    filename = f"image{(page * images_per_page) + idx}.jpg"
                    original_filename = os.path.join(save_directory, filename)

                    image_response = requests.get(image_url)
                    if image_response.status_code == 200:
                        with open(original_filename, "wb") as image_file:
                            image_file.write(image_response.content)
                        print(f"Downloaded: {filename}")

                        metadata = {
                            "sol": image_data.get("sol", ""),
                            "image_id": image_data.get("imageid", ""),
                            "caption": image_data.get("caption", ""),
                            "date_taken_mars": image_data.get("date_taken_mars", ""),
                            "date_taken_utc": image_data.get("date_taken_utc", ""),
                            "title": image_data.get("title", ""),
                            "date_received": image_data.get("date_received", ""),
                            "original_image": original_filename
                        }

                        image_metadata.append(metadata)
        else:
            print(f"Error: Unable to retrieve data for page {page}. Status code: {response.status_code}")

    # Save all image metadata in a single JSON file
    all_metadata_filename = "all_image_metadata.json"
    all_metadata_path = os.path.join(save_directory, all_metadata_filename)
    with open(all_metadata_path, "w") as all_metadata_file:
        json.dump(image_metadata, all_metadata_file, indent=4)

fetch_all_images()
