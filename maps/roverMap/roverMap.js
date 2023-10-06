import * as THREE from "three";

import { MarkedPoints, Point } from "../../data/LocalData.js";
import { DataFetcher } from "../../data/APIDataFetcher.js";
import { MySphere } from "../../SphereMarker.js";
import { MyCanvas } from "../../MyCanvas.js";
import { Colors } from "../../Color.js";

let currentTime = new Date();

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

const sphere = new MySphere(2, 320, 160, "../../images/mars8k.jpg");
scene.add(sphere.sphere);
camera.position.z = 3;

// markerPointDemo();
apiDataDemo();
canvas.gameLoop(() => {
    // sphere.sphere.rotation.x += 0.0;
    // sphere.sphere.rotation.y += 0.0002;
});

function showInfo(point) {
    // console.log("clicked");
    // console.log(point);
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
          <p > <span class="font-bold" >Type: </span> ${point.total.type}</p>
          <p class="mb-3"> <span class="font-bold" >Location: </span> ${point.total.location}</p>
          <p> <span class="font-bold" > Lat: </span>${point.total.coordinatesForShow.latitude}</p>
          <p> <span class="font-bold" >Lon:</span>  ${point.total.coordinatesForShow.longitude}</p>
          <div id="detail" class=" h-[222px] mt-2  mb-3 overflow-y-scroll  custom-scrollbar text-justify">
            <p> <span class="font-bold" >Details: </span> ${point.total.details}</p>
          </div>
        </div>
        </div>
        <div class="ml-28 text-white">
          <div class="start w-[400px] text-3xl font-mono font-bold my-5" id="pointName">        
            <span class="text-center ml-14">${
              point.name
              }
            </span> 
            <br>
            <span> 
              <span>${point.total.CurrentStatus == "Dead" ? "Dead" : ""}
            </span>
            <span> 
            ${
                point.name == "Curiosity" && point.total.CurrentStatus == "Active"
                    ? `<span id="CuriosityTimer"> ${setCuriosityTimer(
                          "05 Aug 2012 13:49:59"
                      )}</span>`
                    : ""
            }
            </span>
            <span> 
            ${
                point.name == "Perseverance" && point.total.CurrentStatus == "Active"
                    ? `<span id="PerseverenceTimer"> ${setPerseverenceTimer(
                          "18 Feb 2021 11:50:59"
                      )}</span>`
                    : ""
            }
            </span>
            <span> 
            ${
                point.name == "Ingenuity" && point.total.CurrentStatus == "Active"
                    ? `<span id="IngenuityTimer"> ${setIngenuityTimer(
                          "19 April 2021 07:34:59"
                      )}</span>`
                    : ""
            }
            </span>
            <br>
            <span class="text-lg ml-5">
            ${
                point.total.CurrentStatus == "Active" ? "Sols : Hrs : Mins : Secs" : ""
            } 
            </span>
            <br>
        </div>
      </div>
      <div class="ml-16">
          <div class="custom-scrollbar border flex -ml-[2px] border-white  p-3  rounded-[15px] h-[420px] w-[25vw] text-center py-3 overflow-x-scroll  custom-scrollbar mb-3 mt-3">
              <img src="${
                point.total.photo
                }" class="w-full rounded-[15px]" />
          </div>
      </div>
    `;
}

function setIngenuityTimer(ini) {
    setInterval(() => {
        let launch_time = new Date(ini);
        let current_time = new Date();
        let diff = (current_time - launch_time) / 1000;
        const timeObject = convertTime(diff);

        document.getElementById("IngenuityTimer").innerText = `${String(
            timeObject.days
        ).padStart(2, "0")} :${String(timeObject.hours).padStart(
            2,
            "0"
        )} :${String(timeObject.minutes).padStart(2, "0")} :${String(
            parseInt(timeObject.seconds)
        ).padStart(2, "0")}`;
    }, 1000);
}
function setCuriosityTimer(ini) {
    setInterval(() => {
        let launch_time = new Date(ini);
        let current_time = new Date();
        let diff = (current_time - launch_time) / 1000;
        const timeObject = convertTime(diff);

        document.getElementById("CuriosityTimer").innerText = `${String(
            timeObject.days
        ).padStart(2, "0")} :${String(timeObject.hours).padStart(
            2,
            "0"
        )} :${String(timeObject.minutes).padStart(2, "0")} :${String(
            parseInt(timeObject.seconds)
        ).padStart(2, "0")}`;
    }, 1000);
}
function setPerseverenceTimer(ini) {
    setInterval(() => {
        let launch_time = new Date(ini);
        let current_time = new Date();
        let diff = (current_time - launch_time) / 1000;
        const timeObject = convertTime(diff);

        document.getElementById("PerseverenceTimer").innerText = `${String(
            timeObject.days
        ).padStart(2, "0")} :${String(timeObject.hours).padStart(
            2,
            "0"
        )} :${String(timeObject.minutes).padStart(2, "0")} :${String(
            parseInt(timeObject.seconds)
        ).padStart(2, "0")}`;
    }, 1000);
}

function convertTime(x) {
    let seconds = x + 30 + 9 * 61.25;
    const secondsInMinute = 61.25;
    const secondsInHour = 3699;
    const secondsInDay = 88775.244;
    const secToMillisec = 1.021;

    const days = Math.floor(seconds / secondsInDay);
    const remainingSeconds = seconds % secondsInDay;
    let hours = Math.floor(remainingSeconds / secondsInHour) - 6;
    if (hours < 0) {
        hours = hours + 24;
    }
    const remainingSecondsAfterHours = remainingSeconds % secondsInHour;

    const minutes = Math.floor(remainingSecondsAfterHours / secondsInMinute);
    const secondsWithoutMinutes = remainingSecondsAfterHours % secondsInMinute;
    const milliseconds = secondsWithoutMinutes * secToMillisec;

    return {
        days,
        hours,
        minutes,
        seconds: secondsWithoutMinutes,
        milliseconds,
    };
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

    dataFetcher.fetchData("../../data/roverPosition.json");
    
}