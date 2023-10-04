import * as THREE from "three";

import { MarkedPoints, Point } from "../../data/LocalData";
import { DataFetcher } from "../../data/APIDataFetcher";
import { MySphere } from "../../SphereMarker";
import { MyCanvas } from "../../MyCanvas";
import { Colors } from "../../Color";
// import f from "../../travel/travel.html"
let scene, camera, renderer;
const canvas = new MyCanvas(window);

scene = canvas.scene;
canvas.setBackgroundEXR("../../BackgroundDemo/starmap_2020_4k.exr");
camera = canvas.camera;
renderer = canvas.renderer;
canvas.init(document);

const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

canvas.init(document);

const sphere = new MySphere(2, 320, 160, "../../images/mars8k.jpg");
scene.add(sphere.sphere);
camera.position.z = 2;

// sphere.addMarker("LAT_LONG", 30, -90, (object) => {
//     var geometry = new THREE.SphereGeometry(0.05, 10, 5);
//     var material = new THREE.MeshBasicMaterial({ color: Colors.BLUE });
//     var box = new THREE.Mesh(geometry, material);
//     box.applyMatrix4(object);
//     return box;
// });

// markerPointDemo();
apiDataDemo();
canvas.gameLoop(() => {
    // sphere.sphere.rotation.x -= 0.01;
    // sphere.sphere.rotation.y -= 0.01;
    // sphere.sphere.rotation.z += 0.001;
    // 
});



const showInfo = (point) => {
    // console.log(point);
    // console.log(point.total);
    let infoDiv = document.getElementById("info");
    let location = document.getElementById("locationBtn");
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
        // infoDiv.innerHTML = "Click on a marker to see the details";
        document.body.appendChild(infoDiv);
    }
    // infoDiv.innerHTML = `IDdf: ${point.id}<br>Name: ${point.name}<br>Details: ${point.details}`;

    infoDiv.innerHTML = `
      <div class="grid grid-cols-12 gap-6  mt-10 ml-10 mr-10 text-xs leading-relaxed">
        <div class="col-start-1 col-end-4 text-[18px] font-mono">

        <div class="border border-white py-3 px-4 rounded-[15px] mt-4">
        <p > <span class="font-bold" >Type: </span> ${point.total.type}</p>
        <p> <span class="font-bold" >Location: </span> ${point.total.location}</p>
        <p> <span class="font-bold" > Lat: </span>${point.total.coordinatesForShow.latitude}</p>
        <p> <span class="font-bold" >Lon:</span>  ${point.total.coordinatesForShow.longitude}</p>
        <div id="detail" class=" h-[200px] mt-2  mb-3 overflow-y-scroll  custom-scrollbar text-justify">
          <p> <span class="font-bold" >Details: </span> ${point.total.details}</p>
        </div>
      </div>

        </div>
        <div class="ml-[18vw] w-[400px] text-3xl text-center font-mono font-bold mt-5" id="pointName"> ${point.name}</div>
      </div>
      <div class="" id="showDateTime"></div>
      <div class="col-start-8 col-end-12 max-w-[400px] mt-10 pr-10" id="showInfo">
        <div id="new" class="text-[16px] font-mono">
        <input type="text" id="search" onkeyup="searchFunction()" placeholder="Search...." class="border border-white mb-4 bg-transparent w-[360px] text-gray-400 py-3 px-4 rounded-[20px]"/>
        <ul id="listItemsLocation" class="list hidden text-white mb-4 z-10 fixed bg-orange-400 rounded-[20px] w-[360px] py-3 px-4"></ul>
          <p class="border border-white py-3 px-4 rounded-[15px]">Name: ${point.name}</p>
          <a href="../../travel/travel.html"><button class="btn py-1 w-40">Book Now</button></a>
          
          <div class="border border-white py-3 px-4 rounded-[15px] mt-4">
            <p > <span class="font-bold" >Type: </span> ${point.total.type}</p>
            <p> <span class="font-bold" >Location: </span> ${point.total.location}</p>
            <p> <span class="font-bold" > Lat: </span>${point.total.coordinatesForShow.latitude}</p>
            <p> <span class="font-bold" >Lon:</span>  ${point.total.coordinatesForShow.longitude}</p>
            <div id="detail" class=" h-[120px] mt-2  mb-3 overflow-y-scroll  custom-scrollbar text-justify">
              <p> <span class="font-bold" >Details: </span> ${point.total.details}</p>
            </div>
          </div>
         
          <div class="custom-scrollbar border flex w-[357px] -ml-[2px] border-white p-3       rounded-[15px] m-4 h-[200px] text-center py-3 overflow-x-scroll  custom-scrollbar">
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
              <img src="${point.total.photo3}" class="w-[380px] h-[180px] rounded-[15px]" />
              <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide2" class="btn btn-circle">❮</a>
                <a href="#slide1" class="btn btn-circle">❯</a>
              </div>
            </div>

          </div>
              </div>

            </div>
          </div>
          <br>
        </div>
      </div>
    `;
}


function apiDataDemo() {
    const dataFetcher = new DataFetcher((data) => {
        // console.log(data[0].coordinates.latitude);
        let markedPoints = new MarkedPoints();
        for (let user of data) {
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