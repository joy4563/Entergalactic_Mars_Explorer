import requests
import json
import os

save_dir = "/home/druglord/Documents/Important/Marss/three_js/Experimental/API/IngenuityPictures"
os.makedirs(save_dir, exist_ok=True)

all_curated_data = []

for sol in range(98, 1000):  # Adjust the range as needed
    url = f"https://mars.nasa.gov/rss/api/?feed=raw_images&category=ingenuity&feedtype=json&sol={sol}"
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        images_data = data['images']

        curated_data = []

        for image_data in images_data:
            image_url = image_data['image_files']['medium']  # Using medium resolution images
            image_filename = f"{sol}.jpg"
            image_path = os.path.join(save_dir, image_filename)
            image_response = requests.get(image_url)
            if image_response.status_code == 200:
                with open(image_path, 'wb') as img_file:
                    img_file.write(image_response.content)

            image_sol = image_data['sol']
            image_title = image_data['title']
            image_caption = image_data['caption']
            date_taken = image_data['date_taken_utc']
            date_received = image_data['date_received']
            date_taken_mars = image_data['date_taken_mars']

            curated_entry = {
                'image_file': image_filename,
                'sol': image_sol,
                'title': image_title,
                'caption': image_caption,
                'date_taken_utc': date_taken,
                'date_received': date_received,
                'date_taken_mars': date_taken_mars
            }
            curated_data.append(curated_entry)

        all_curated_data.extend(curated_data)

        # Save the full response as ingenuity.json for each sol
        full_response_path = os.path.join(save_dir, f"{sol}_ingenuity.json")
        with open(full_response_path, 'w') as response_file:
            json.dump(data, response_file, indent=4)
    else:
        print(f"Error for sol {sol}:", response.status_code)

# Save the aggregated curated data as curatedData.json
curated_json_path = os.path.join(save_dir, "curatedData.json")
with open(curated_json_path, 'w') as curated_json_file:
    json.dump(all_curated_data, curated_json_file, indent=4)

print("Images and curated data saved for all sol numbers.")
