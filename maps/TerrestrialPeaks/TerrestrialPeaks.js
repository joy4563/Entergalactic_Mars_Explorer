import * as THREE from "three";

import { MarkedPoints, Point } from "../../data/LocalData.js";
import { DataFetcher } from "../../data/APIDataFetcher.js";
import { MySphere } from "../../SphereMarker.js";
import { MyCanvas } from "../../MyCanvas.js";
import { Colors } from "../../Color.js";

let scene, camera, renderer;
const canvas = new MyCanvas(window);

scene = canvas.scene;
canvas.setBackgroundEXR("/BackgroundDemo/starmap_2020_4k.exr");
camera = canvas.camera;
renderer = canvas.renderer;
canvas.init(document);

const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

canvas.init(document);

const sphere = new MySphere(2, 320, 160, "../../mars_4k_color.jpg");
scene.add(sphere.sphere);
camera.position.z = 5;

sphere.addMarker("LAT_LONG", 30, -90, (object) => {
    var geometry = new THREE.SphereGeometry(0.05, 10, 5);
    var material = new THREE.MeshBasicMaterial({ color: Colors.BLUE });
    var box = new THREE.Mesh(geometry, material);
    box.applyMatrix4(object);
    return box;
});

// markerPointDemo();
apiDataDemo();
canvas.gameLoop(() => {
    sphere.sphere.rotation.x += 0.0;
    sphere.sphere.rotation.y += 0.0002;
});

function showInfo(point) {
    // console.log(point);
    // console.log(point.total);
    let infoDiv = document.getElementById("info");
    if (!infoDiv) {
        infoDiv = document.createElement("div");
        infoDiv.id = "info";
        infoDiv.style.position = "absolute";
        infoDiv.style.top = "10px";
        infoDiv.style.display = "flex";
        // infoDiv.style.alignItems = "center";
        // infoDiv.style.justifyContent = "space-between";
        infoDiv.style.left = "10px";
        infoDiv.style.color = "white";
        infoDiv.style.fontSize = "18px";
        infoDiv.innerHTML = "Click on a marker to see the details";
        document.body.appendChild(infoDiv);
    }
    // infoDiv.innerHTML = `IDdf: ${point.id}<br>Name: ${point.name}<br>Details: ${point.details}`;

    infoDiv.innerHTML = `    <div>
      <div class=" max-w-[400px] mt-10 pr-10 font-mono" id="showInfo">
        <div class=" border flex w-[357px]  border-white p-3 rounded-[15px]  h-[200px] text-center py-3 ">
          <div class="carousel  w-[357px] rounded-lg">
            <div id="slide1" class="carousel-item relative w-[330px]">
              <img src="${point.total.photo1}" class="w-[380px] h-[180px] rounded-[15px]" />
              <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide3" class="btn btn-circle">❮</a>
                <a href="#slide2" class="btn btn-circle">❯</a>
              </div>
            </div>
            <div id="slide2" class="carousel-item relative w-[330px]">
              <img src="${point.total.photo2}" class="w-[380px] h-[180px] rounded-[15px]" />
              <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide1" class="btn btn-circle">❮</a>
                <a href="#slide3" class="btn btn-circle">❯</a>
              </div>
            </div>
            <div id="slide3" class="carousel-item relative w-[330px]">
              <img src="${point.total.photo1}" class="w-[380px] h-[180px] rounded-[15px]" />
              <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide2" class="btn btn-circle">❮</a>
                <a href="#slide1" class="btn btn-circle">❯</a>
              </div>
            </div>

          </div>
        </div>

        <div class="border border-white py-3 px-4 rounded-[15px] mt-4">
          <p> <span class="font-bold" >Type: </span>${point.total.type}</p>
          <p> <span class="font-bold" >Location: </span>${point.total.location}</p>
          <p> <span class="font-bold" >Lat: </span>${point.total.coordinates.latitude}</p>
          <p> <span class="font-bold" >Lon: </span>${point.total.coordinates.longitude}</p>
          <div id="detail" class="  mt-2  mb-3 text-justify">
            <p> <span class="font-bold" >Details: </span>${point.total.details}</p>
          </div>
        </div>
      </div>

      
    </div>
<div class="ml-[18vw] w-[400px] text-3xl text-center font-mono font-bold mt-10"> ${point.name}</div>
   `;
}

function apiDataDemo() {
    const dataFetcher = new DataFetcher((data) => {
        // console.log(data);
        const result = data.filter(
            (single) => single.topographicalgroup == "TerrestrialPeaks"
        );
        // console.log(result);
        let markedPoints = new MarkedPoints();
        for (let user of result) {
            // console.log(user.description);
            markedPoints.add(user.id, user.name, user);
            sphere.addMarker(
                user.name,
                user.coordinates.latitude,
                user.coordinates.longitude,
                (matrix) => {
                    var geometry = new THREE.BoxGeometry(0.05, 0.05, 0.05);
                    var material = new THREE.MeshBasicMaterial({
                        color: Colors.RED,
                    });
                    var box = new THREE.Mesh(geometry, material);
                    box.applyMatrix4(matrix);
                    return box;
                }
            );
        }

        sphere.onMarkerClick(camera, (text) => {
            const point = markedPoints.find(text);
            if (point != null) {
                showInfo(point);
            }
        });
    });

    dataFetcher.fetchData("../../data/most_interesting_places.json");
}
