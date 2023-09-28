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

const sphere = new MySphere(2, 320, 160, "../../images/watericmap.jpg");
scene.add(sphere.sphere);
camera.position.z = 3;


// markerPointDemo();
apiDataDemo();
canvas.gameLoop(() => {
    // sphere.sphere.rotation.x += 0.0;
    // sphere.sphere.rotation.y += 0.0002;
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

    infoDiv.innerHTML = `    <div class="grid grid-cols-12 gap-6  mt-10 ml-10 mr-10 text-xs" i>
            <div class="col-start-1 col-end-4">
              
                    <!-- Dropdown content -->
                    <ul class="rounded-full shadow-md text-sm">
                        <li class="px-3 py-2   ">
                            <div class="flex">
                               <div class="     py-2 px-4   hover:bg-gray-500  hover:bg-opacity-30       hover:text-white cursor-pointer rounded-lg text-sm font-mono font-semibold"
                               style="background-color : orange; color : white" onclick="handleClickLocation()" id="locationBtn">Location</div>

                                <div
                                    class=" border-2 py-2 px-4 border-gray-300   hover:bg-gray-500  hover:bg-opacity-30       hover:text-white cursor-pointer mx-3 rounded-lg text-sm font-mono font-semibold"
                                     onclick="handleClickTourisom()" id="tourismBtn">
                                    Tourism</div>
                                <div
                                    class=" border-2 py-2 px-4 border-gray-300   hover:bg-gray-500  hover:bg-opacity-30       hover:text-white cursor-pointer rounded-lg text-sm font-mono font-semibold"
                                     onclick="handleClickMaps()" id="mapBtn">
                                    Topography</div>
                            </div>
                        </li>
                        <ul id="onClickChangeContainer">
                     
                            <li
                            class=" px-4 py-2 w-[340px] rounded-lg   hover:bg-gray-500  hover:bg-opacity-30       hover:text-white cursor-pointer border border-white mx-3 my-2">
                            <a href="../../index.html">Original Map</a>
                          </li>
                          <li class=" px-4 py-2   hover:bg-gray-500  hover:bg-opacity-30       w-[340px] rounded-lg hover:text-white cursor-pointer border border-white mx-3 my-2">
                            <a href="../../maps/TempMap/TempMap.html">Temp Map</a>
                          </li>
                          <li class="py-2 pl-4 w-[340px] rounded-lg   hover:bg-gray-500  hover:bg-opacity-30       hover:text-white cursor-pointer border border-white mx-3 my-2">
                            <a href="../../maps/TopographicalMap/TopographicalMap.html">Topographical Map</a>
                          </li>
                          <li class=" bg-gray-500  bg-opacity-50  px-4 py-2 w-[340px] rounded-lg   hover:bg-gray-500  hover:bg-opacity-30       hover:text-white cursor-pointer border border-white mx-3 my-2">
                            <a href="../../maps/IceWaterMap/IceWater.html">Water ICE</a>
                          </li>
                          <li class="px-4 py-2 w-[340px]   hover:bg-gray-500  hover:bg-opacity-30   rounded-lg    hover:text-white cursor-pointer border border-white mx-3 my-2">
                            <a href="../../maps/roverMap/roverMap.html">Rover Map</a>
                          </li>
                          </li>
                          <li class="px-4 py-2 w-[340px]   hover:bg-gray-500  hover:bg-opacity-30   rounded-lg    hover:text-white cursor-pointer border border-white mx-3 my-2">
                            <a href="../../Rover/middle.html"
                              >Rover</a>
                          </li>
                          <li
                            class="px-4 py-2 rounded-lg w-[340px]   hover:bg-gray-500  hover:bg-opacity-30       hover:text-white cursor-pointer border border-white mx-3 my-2">
                            <a href="../../Orbiter/Orbiter.html">Orbiter</a></li>
                          <li class="px-4 py-2   hover:bg-gray-500  hover:bg-opacity-30       w-[340px] rounded-lg hover:text-white cursor-pointer border border-white mx-3 my-2">
                            <a href="../../Ingenuity/Ingenuity.html">Ingenuity</a>
                          </li>
                          <li class="px-4 w-[340px] rounded-lg py-2   hover:bg-gray-500  hover:bg-opacity-30       hover:text-white cursor-pointer border border-white mx-3 my-2">
                <a href="../../Experimental/API/Weather/perseveranceWeather.html">Weather Forecast</a>
              </li>
                        </ul>
                    </ul>
                
    
            </div>
            <div class="ml-[18vw] w-[400px] text-3xl text-center font-mono font-bold mt-5" id="pointName"> ${point.name}</div>
        </div>
        <div id="showDateTime"></div>
          <div class="col-start-8 col-end-12 max-w-[400px] mt-10 pr-10" id="showInfo">
            <div id="new" class="text-[16px] font-mono">
                <div class="border border-white py-3 px-4 rounded-[15px] mt-4">
                <p><span class="font-bold" >Type: </span> ${point.total.type}</p>
                <p><span class="font-bold" >Location: </span> ${point.total.location}</p>
                <p><span class="font-bold" >Lat: </span> ${point.total.coordinatesForShow.latitude}</p>
                <p><span class="font-bold" >Lon: </span> ${point.total.coordinatesForShow.longitude}</p>
                <div id="detail" class=" h-[120px] mt-2  mb-3 overflow-y-scroll  custom-scrollbar" >
                    <p><span class="font-bold" >Details: </span> ${point.total.details}</p>
                </div>
                </div>
                <div class="custom-scrollbar border flex w-[357px] -ml-[2px] border-white p-3 rounded-[15px] m-4 h-[200px] text-center py-3 overflow-x-scroll  custom-scrollbar">
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
                <br>
            </div>
        </div>
    </div>`;

    
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
