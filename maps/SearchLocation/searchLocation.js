import * as THREE from "three";

import { MarkedPoints, Point } from "../../data/LocalData";
import { DataFetcher } from "../../data/APIDataFetcher";
import { MySphere } from "../../SphereMarker";
import { MyCanvas } from "../../MyCanvas";
import { Colors } from "../../Color";
// import f from "../../Experimental/API/Weather/perseveranceWeather.html"
let scene, camera, renderer;
const canvas = new MyCanvas(window);

scene = canvas.scene;
canvas.setBackgroundEXR("../../BackgroundDemo/starmap_2020_4k.exr");
camera = canvas.camera;
renderer = canvas.renderer;
canvas.init(document);
let requiredLocation = localStorage.getItem("location");

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
apiDataDemo(requiredLocation);
canvas.gameLoop(() => {
    // sphere.sphere.rotation.x -= 0.01;
    // sphere.sphere.rotation.y -= 0.01;
    // sphere.sphere.rotation.z += 0.001;
    // 
});



const showInfo = (point) => {
    console.log(point);
    // console.log(point.total);
    let infoDiv = document.getElementById("info");

    infoDiv.innerHTML = `
      <div class="grid grid-cols-3 gap-32 mt-8">
        <div> 
          <div>
            <p class="ml-10 mb-4 w-[22vw] btn bg-transparent text-white hover:bg-gray-500">
              <a href="../../index.html">Back To Home</a>
            </p>
          </div>
          <div class="border border-white py-3 px-4 rounded-[15px] w-[22vw] text-white ml-10">
          <p > <span class="font-bold" >Type: </span> ${point.type}</p>
          <p class="mb-3"> <span class="font-bold" >Location: </span> ${point.location}</p>
          <p> <span class="font-bold" > Lat: </span>${point.coordinatesForShow.latitude}</p>
          <p> <span class="font-bold" >Lon:</span>  ${point.coordinatesForShow.longitude}</p>
          <div id="detail" class=" h-[322px] mt-2  mb-3 overflow-y-scroll  custom-scrollbar text-justify">
            <p> <span class="font-bold" >Details: </span> ${point.details}</p>
          </div>
        </div>
        </div>
        <div class="ml-19">
          <p class="text-3xl py-3 z-10 px-4 rounded-[15px] text-white text-center">${point.name}</p>
        </div>
        <div class="ml-16">
          <input type="text" id="search" onkeyup="searchFunction()" placeholder="Search...." class="border border-white mb-4 bg-transparent w-[25vw] text-gray-400 py-3 px-4 rounded-[20px]"/>
          <ul id="listItemsLocation" class="list hidden text-white mb-4 z-10 fixed bg-orange-400 rounded-[20px] w-[25vw] py-3 px-4"></ul>
          <div class="custom-scrollbar border flex -ml-[2px] border-white  p-3  rounded-[15px] h-[360px] w-[25vw] text-center py-3 overflow-x-scroll  custom-scrollbar mb-3 mt-3">
            <div class="carousel rounded-lg">
              <div id="slide1" class="carousel-item relative w-full h-[400px]">
                <img src="${point.photo1}" class=" rounded-[15px] w-full" />
                <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide3" class="btn btn-circle">❮</a>
                  <a href="#slide2" class="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide2" class="carousel-item relative w-full h-[400px]">
              <img src="${point.photo2}" class=" rounded-[15px] w-full"/>
              <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide1" class="btn btn-circle">❮</a>
                <a href="#slide3" class="btn btn-circle">❯</a>
              </div>
            </div>
            <div id="slide3" class="carousel-item relative w-full h-[400px]">
              <img src="${point.photo3}" class=" rounded-[15px] w-full"/>
              <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide2" class="btn btn-circle">❮</a>
                <a href="#slide1" class="btn btn-circle">❯</a>
              </div>
            </div>
          </div>
      </div>
      <a href="../../travel/travel.html">
        <button class="btn btn-outline btn-warning mt-5 w-full border border-white">
          <p class="text-white">Book Now</p>
        </button>
      </a>
    `;
}




function apiDataDemo(requiredLocation) {
    const dataFetcher = new DataFetcher((data) => {
        console.log(requiredLocation);
        // console.log(data[0].coordinates.latitude);
        let markedPoints = new MarkedPoints();
        let a;
        for (let user of data) {
            // console.log(user);
            if (user.name == requiredLocation) {
                a = user;
            }
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
        showInfo(a);
    });

    dataFetcher.fetchData("../../data/most_interesting_places.json");
}
