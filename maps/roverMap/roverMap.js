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

const sphere = new MySphere(2, 320, 160, "../../mars8k.jpg");
scene.add(sphere.sphere);
camera.position.z = 3;

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
    // sphere.sphere.rotation.x += 0.0;
    // sphere.sphere.rotation.y += 0.0002;
});

// function markerPointDemo() {
//     let markedPoints = new MarkedPoints();
//     fetch("./data/most_intersting_place.json")
//         .then((res) => res.json())
//         .then((details) => {
//             details.map(
//                 (detail) =>
//                     markedPoints.add`(${detail.id},${detail.name},${detail.description})`
//             );
//         });

//     // markedPoints.add(1, "joyyyyyy", "This is point A");
//     // markedPoints.add(2, "190145", "This is point B");
//     // markedPoints.add(3, "180918", "This is point C");
//     // markedPoints.add(4, "170101", "This is point D");
//     // markedPoints.add(5, "200145", "This is point E");
//     // markedPoints.add(6, "120918", "This is point F");
//     //lol
//     for (let point of markedPoints.points) {
//         sphere.addMarker(point.name, null, null, (matrix) => {
//             var geometry = new THREE.BoxGeometry(0.05, 0.05, 0.05);
//             var material = new THREE.MeshBasicMaterial({
//                 color: Colors.ORANGE,
//             });
//             var box = new THREE.Mesh(geometry, material);
//             box.applyMatrix4(matrix);
//             return box;
//         });
//     }

//     sphere.onMarkerClick(camera, (text) => {
//         const point = markedPoints.find(text);
//         if (point != null) {
//             showInfo(point);
//         }
//     });
// }

// function clickLocation() {
//     // document.getElementById("locationBtn").style.color = "red";

//     console.log("Click on location");
// }

function showInfo(point) {
    console.log("clicked");
    console.log(point);
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
    // infoDiv.innerHTML = `IDdf: ${point.id}<br>Name: ${point.name}<br>Details: ${point.details}`;

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
                  Tourisom</div>
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
        }</span> <br><span>  <span>${
        point.name == "Curiosity" ? "3928 : " : ""
    }</span>
         <span>${point.name == "Ingenuity" ? "892 : " : ""}</span>
         <span>${point.name == "Perseverance" ? "892 : " : ""}</span>
     <span>${
         point.total.CurrentStatus == "active"
             ? (currentTime.getHours() < 10 ? "0" : "") +
               ((currentTime.getMinutes() + 35) % 60 == 0
                   ? currentTime.getHours() + 1
                   : currentTime.getHours()) +
               " :"
             : "Dead"
     }</span> 
    <span>${
        point.total.CurrentStatus == "active"
            ? (currentTime.getMinutes() < 10 ? "0" : "") +
              ((currentTime.getMinutes() + 35) % 60) +
              " : "
            : ""
    }</span>
     <span>${
         point.total.CurrentStatus == "active"
             ? (currentTime.getSeconds() < 10 ? "0" : "") +
               currentTime.getSeconds()
             : ""
     }</span> </span>
     <br>
     <span class="text-lg">${
         point.total.CurrentStatus == "active" ? "Sols : Hrs : Mins : Secs" : ""
     } </span>
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

    const messages = {
        option1: "This is message 1",
        option2: "This is message 2",
        option3: "This is message 3",
    };
    document.querySelectorAll("input[type=checkbox]").forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                document.getElementById("new").innerHTML += `<p> ${
                    messages[checkbox.value]
                }</p>`;
                document.getElementById("detail").style.display = "none";
                document.getElementById("img").style.width = "500px";
            } else {
                const text = document.getElementById("new").innerHTML;
                const value = messages[checkbox.value];
                if (text.includes(value)) {
                    document.getElementById("new").innerHTML = text.replace(
                        ` ${value}`,
                        ""
                    );
                }
                document.getElementById("detail").style.display = "block";
            }
        });
    });
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
