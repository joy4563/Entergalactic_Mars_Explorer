const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const crypto = require('crypto');

async function rover(starting_number, max_iterations, size_threshold, num_pictures) {
    const save_directory = "./Experimental/API/JS/JSPictures";
    const fetch_directory = "./Experimental/API/JS/JSPictures";

    const params = { "earth_date": "2016-10-17", "api_key": "7QVxWTvL4YZkPFPAgWQGydwacGjiVFoCN8UdnOcU" };
    const url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos";

    try {
        const response = await fetch(`${url}?${new URLSearchParams(params)}`);
        const data = await response.json();

        if ("photos" in data) {
            const photos = data.photos;
            const uniqueImages = new Set();

            let iterationsDone = 0;
            let picturesDownloaded = 0;

            while (picturesDownloaded < num_pictures && iterationsDone < max_iterations) {
                if (uniqueImages.has(starting_number)) {
                    break;
                }

                const randomPhoto = photos[Math.floor(Math.random() * photos.length)];
                const imgSrc = randomPhoto.img_src;
                const imageResponse = await fetch(imgSrc);
                const imageBuffer = await imageResponse.buffer();

                if (imageBuffer.length >= size_threshold) {
                    const imageHash = crypto.createHash('md5').update(imageBuffer).digest('hex');
                    const imageFileName = `image${starting_number}.jpg`;

                    // Save to the fetch directory
                    const fetchSavePath = path.join(fetch_directory, `image${picturesDownloaded}.jpg`);

                    // If the image is unique, save it in both directories
                    if (!uniqueImages.has(imageHash)) {
                        uniqueImages.add(imageHash);

                        await fs.promises.writeFile(fetchSavePath, imageBuffer);
                        console.log(`Fetched ${imageFileName}`);

                        // const mainSavePath = path.join(save_directory, imageFileName);
                        // await fs.promises.writeFile(mainSavePath, imageBuffer);
                        // console.log(`Saved ${imageFileName} in main directory`);

                        picturesDownloaded += 1;
                    }
                }

                iterationsDone += 1;
                starting_number += 1;
            }
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

// Set your desired values for starting_number, max_iterations, size_threshold, and num_pictures
const starting_number = 89000;
const max_iterations = 100;
const size_threshold = 50000; // Example size in bytes
const num_pictures = 5;

rover(starting_number, max_iterations, size_threshold, num_pictures);
