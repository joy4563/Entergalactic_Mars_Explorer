# # import os
# # import random
# # import requests

# # def rover():
# #     save_directory = "/home/druglord/Documents/Important/Marss/three_js/Experimental/API/CuriosityPictures/pictures"
# #     num_images = 5  # Number of images to generate and save
    
# #     params = {"earth_date": "2016-10-17", "api_key": "DEMO_KEY"}
# #     url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos"
# #     response = requests.get(url, params=params)
# #     data = response.json()

# #     if "photos" in data:
# #         photos = data["photos"]
# #         """
# #         random photo with random name start
# #         """
# #         # for _ in range(num_images):
# #         #     random_photo = random.choice(photos)  # Randomly choose a photo from the list
# #         #     img_src = random_photo["img_src"]
# #         #     image_data = requests.get(img_src).content
            
# #         #     # Generate a random image number
# #         #     random_image_number = random.randint(1000, 9999)  # Adjust range as needed
            
# #         #     # image_name = f"image{random_image_number}.jpg"
# #         #     image_name = f"image{num_images}.jpg"
# #         #     save_path = os.path.join(save_directory, image_name)
# #         """
# #         random photo with random name stops
# #         """

# #         """
# #         random photo with index based name starts
# #         """
# #         for index in range(num_images):
# #             # random_photo = photos[index % len(photos)]  # Use modulo to loop through photos
# #             random_photo = random.choice(photos)  # Use modulo to loop through photos
# #             img_src = random_photo["img_src"]
# #             image_data = requests.get(img_src).content
            
# #             image_name = f"image{index}.jpg"
# #             save_path = os.path.join(save_directory, image_name)
        

# #             with open(save_path, "wb") as f:
# #                 f.write(image_data)
# #                 print(f"Downloaded {image_name}")

# # rover()

# import os
# import random
# import requests

# def rover(size, num_iterations, num_pictures):
#     save_directory = "/home/druglord/Documents/Important/Marss/three_js/Experimental/API/CuriosityPictures/pictures"
    
#     params = {"earth_date": "2016-10-17", "api_key": "DEMO_KEY"}
#     url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos"
#     response = requests.get(url, params=params)
#     data = response.json()

#     if "photos" in data:
#         photos = data["photos"]
        
#         pictures_downloaded = 0
#         iterations_done = 0
        
#         while pictures_downloaded < num_pictures and iterations_done < num_iterations:
#             random_photo = random.choice(photos)  # Randomly choose a photo from the list
#             img_src = random_photo["img_src"]
#             image_data = requests.get(img_src).content
            
#             image_name = f"image{pictures_downloaded}.jpg"
#             save_path = os.path.join(save_directory, image_name)
            
#             with open(save_path, "wb") as f:
#                 f.write(image_data)
#                 print(f"Downloaded {image_name}")
                
#             if len(image_data) > size:
#                 pictures_downloaded += 1
#             iterations_done += 1

# # Set your desired values for size, num_iterations, and num_pictures
# size = 50000  # Example size in bytes
# num_iterations = 100
# num_pictures = 10

# rover(size, num_iterations, num_pictures)


import os
import random
import requests

def rover(starting_number, max_iterations, size_threshold, num_pictures):
    save_directory = "/home/druglord/Documents/Important/Marss/three_js/Experimental/API/CuriosityPictures/pictures"
    fetch_directory = "/home/druglord/Documents/Important/Marss/three_js/Experimental/API/CuriosityPictures/pictures/fetch"
    
    params = {"earth_date": "2016-10-17", "api_key": "7QVxWTvL4YZkPFPAgWQGydwacGjiVFoCN8UdnOcU"}
    url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos"
    response = requests.get(url, params=params)
    data = response.json()

    if "photos" in data:
        photos = data["photos"]
        unique_images = set()
        
        iterations_done = 0
        pictures_downloaded = 0
        
        while pictures_downloaded < num_pictures and iterations_done < max_iterations:
            if starting_number in unique_images:
                break
            
            random_photo = random.choice(photos)
            img_src = random_photo["img_src"]
            image_data = requests.get(img_src).content
            
            if len(image_data) >= size_threshold:
                image_hash = hash(image_data)  # Calculate hash to check uniqueness
                image_name = f"image{starting_number}.jpg"
                
                # Save to the fetch directory
                fetch_save_path = os.path.join(fetch_directory, f"image{pictures_downloaded}.jpg")
                
                # If the image is unique, save it in both directories
                if image_hash not in unique_images:
                    unique_images.add(image_hash)
                    
                    with open(fetch_save_path, "wb") as f:
                        f.write(image_data)
                        print(f"Fetched {image_name}")
                    
                    # main_save_path = os.path.join(save_directory, image_name)
                    # with open(main_save_path, "wb") as f:
                    #     f.write(image_data)
                    #     print(f"Saved {image_name} in main directory")
                    
                    pictures_downloaded += 1
            
            iterations_done += 1
            starting_number += 1

# Set your desired values for starting_number, max_iterations, size_threshold, and num_pictures
starting_number = 89000
max_iterations = 100
size_threshold = 50000  # Example size in bytes
num_pictures = 5

rover(starting_number, max_iterations, size_threshold, num_pictures)
