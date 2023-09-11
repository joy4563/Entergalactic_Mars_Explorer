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
        infoDiv.innerHTML = "Click on a marker to see the details";
        document.body.appendChild(infoDiv);
    }

    infoDiv.innerHTML = `
      <div class="grid grid-cols-12 gap-6  mt-10 ml-10 mr-10 text-xs">
        <div class="col-start-1 col-end-4">

          <!-- Dropdown content -->
          <ul class="rounded-full shadow-md">
            <li class="px-3 py-2   ">
              <div class="flex font-mono text-xs">
                <div   class="font-mono  py-2 px-4       hover:bg-gray-500  hover:bg-opacity-30       hover:text-white cursor-pointer rounded-lg text-sm font-semibold"
                  onclick="handleClickLocation()" id="locationBtn" style="background-color : orange; color : white;">Location</div>

                <div
                  class="font-mono border-2  py-2 px-4 border-gray-300   hover:bg-gray-500  hover:bg-opacity-30       hover:text-white cursor-pointer mx-3 rounded-lg text-sm font-semibold"
                  onclick="handleClickTourisom()" id="tourismBtn">
                  Tourism</div>
                <div
                  class=" border-2 py-2 px-4 border-gray-300   hover:bg-gray-500  hover:bg-opacity-30       hover:text-white cursor-pointer rounded-lg text-sm font-semibold"
                  onclick="handleClickMaps()" id="mapBtn">
                  Topography</div>
              </div>
            </li>
            <ul id="onClickChangeContainer">
              <li
                class=" px-4 py-2 w-[340px] rounded-lg   hover:bg-gray-500  hover:bg-opacity-30       hover:text-white cursor-pointer border border-white mx-3 my-2">
                <a href="../../index.html">Original Map</a>
              </li>
              <li class="px-4 py-2 w-[340px] rounded-lg   hover:bg-gray-500  hover:bg-opacity-30       hover:text-white cursor-pointer border border-white mx-3 my-2">
                <a href="../TempMap/TempMap.html">Temp Map</a>
              </li>
              <li class="px-4 py-2 w-[340px] rounded-lg   hover:bg-gray-500  hover:bg-opacity-30       hover:text-white cursor-pointer border border-white mx-3 my-2">
                <a href="../TopographicalMap/TopographicalMap.html">Topographical Map</a>
              </li>
              <li class="px-4 py-2 w-[340px] rounded-lg   hover:bg-gray-500  hover:bg-opacity-30       hover:text-white cursor-pointer border border-white mx-3 my-2">
                <a href="../IceWaterMap/IceWater.html">Water ICE</a>
              </li>
              <li class="px-4 py-2 w-[340px] rounded-lg   hover:bg-gray-500  hover:bg-opacity-30       hover:text-white cursor-pointer border border-white mx-3 my-2  bg-gray-500  bg-opacity-50 ">
                <a href="../RovarMap/RovarMap.css">Rover Map</a>
              </li>
              </li>
              <li class="my-5 ml-3">
                <a href="../../Rover/middle.html"
                  class="py-[10px] pl-[10px] pr-[295px] rounded-lg   hover:bg-gray-500  hover:bg-opacity-30       hover:text-white cursor-pointer border border-white" > Rover</a>
              </li>
              <li
                class="px-4 py-2 rounded-lg w-[340px]   hover:bg-gray-500  hover:bg-opacity-30       hover:text-white cursor-pointer border border-white mx-3 my-2"> <a href="../../Orbiter/Orbiter.html">Orbiter</a>
                </li>
              <li class="px-4 w-[340px] rounded-lg py-2   hover:bg-gray-500  hover:bg-opacity-30       hover:text-white cursor-pointer border border-white mx-3 my-2">
                <a href="../../Ingenuity/Ingenuity.html">Ingenuity</a>
              </li>
            </ul>
          </ul>


        </div>
        <div class="ml-[18vw] w-[400px] text-3xl text-center font-mono font-bold my-5" id="pointName"> <span>${
            point.name
        }</span> <br><span> 
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

     </span>
     <br>
     <span class="text-lg">${
         point.total.CurrentStatus == "Active" ? "Sols : Hrs : Mins : Secs" : ""
     } </span>

     <br>

     
      </div>

        
        
            
      </div>
      <div class="" id="showDateTime"></div>
      <div class="col-start-8 col-end-12 max-w-[400px] mt-10 pr-10" id="showInfo">
        <div id="new" class="text-[16px] font-mono">
          
          <div class="border border-white py-3 px-4 rounded-[15px] mt-4">
            <p> <span class="font-bold" >Type: </span>${point.total.type}</p>
            <p> <span class="font-bold" >Location: </span>${
                point.total.location
            }</p>
            <p> <span class="font-bold" >Total Working Days: </span>${
                point.total.TotalWorkingDays
            }</p>
            <p> <span class="font-bold" >Current Status: </span>${
                point.total.CurrentStatus
            }</p>
            <div id="detail" class=" h-[120px] mt-2  mb-3 overflow-y-scroll  custom-scrollbar text-justify">
              <p> <span class="font-bold" >Details: </span>${
                  point.total.details
              }</p>
            </div>
          </div>
         
          <div class="custom-scrollbar border flex w-[357px] -ml-[2px] border-white p-3       rounded-[15px] m-4 h-[200px] text-center py-3 overflow-x-scroll  custom-scrollbar">
          <img src="${
              point.total.photo
          }" class="w-[380px] h-[180px] rounded-[15px]" />
              </div>

            </div>
          </div>
          <br>
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
