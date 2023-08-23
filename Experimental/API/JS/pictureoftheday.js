const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const streamPipeline = promisify(require('stream').pipeline);
const { DateTime } = require('luxon');

const api_key = "7QVxWTvL4YZkPFPAgWQGydwacGjiVFoCN8UdnOcU"; // Replace with your actual API key
const save_directory = "./Experimental/API/PictureOfTheDay";

const url = `https://api.nasa.gov/planetary/apod?api_key=${api_key}`;

async function downloadImage() {
  try {
    const response = await fetch(url);

    if (response.status === 200) {
      const data = await response.json();
      const image_url = data.url;
      const image_title = data.title;

      const image_response = await fetch(image_url);
      
      if (image_response.status === 200) {
        const image_path = path.join(save_directory, "image.jpg");
        await streamPipeline(image_response.body, fs.createWriteStream(image_path));

        console.log("Image saved as 'image.jpg'");

        const fetched_images_file = path.join(save_directory, "fetched_images.txt");
        const current_time = DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss");
        
        const existingLines = fs.existsSync(fetched_images_file) ? fs.readFileSync(fetched_images_file, 'utf-8').split('\n') : [];
        const updatedLines = existingLines.map(line => {
          if (line.includes(image_title)) {
            return `${image_title} - ${current_time}`;
          }
          return line;
        });

        if (!existingLines.some(line => line.includes(image_title))) {
          updatedLines.push(`${image_title} - ${current_time}`);
        }

        fs.writeFileSync(fetched_images_file, updatedLines.join('\n'));

        // Introduce a delay before the next request to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 3000)); // Adjust the delay time as needed
      } else {
        console.log("Error downloading image:", image_response.status);
      }
    } else {
      console.log("Error:", response.status);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

downloadImage();
