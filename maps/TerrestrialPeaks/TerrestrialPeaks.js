import * as THREE from "three";

import { MarkedPoints, Point } from "../../data/LocalData.js";
import { DataFetcher } from "../../data/APIDataFetcher.js";
import { MySphere } from "../../SphereMarker.js";
import { MyCanvas } from "../../MyCanvas.js";
import { Colors } from "../../Color.js";

let scene, camera, renderer;
const canvas = new MyCanvas(window);

scene = canvas.scene;
// canvas.setBackgroundEXR("/BackgroundDemo/starmap_2020_4k.exr");
camera = canvas.camera;
renderer = canvas.renderer;
canvas.init(document);

const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

canvas.init(document);

const sphere = new MySphere(2, 320, 160, "../../mars_1k_color.jpg");
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

    infoDiv.innerHTML = `   
           
        
      
      <div class="col-start-8 col-end-12 max-w-[400px] mt-10 pr-10" id="showInfo">
        <div id="new" class="text-[16px] font-mono">
           <div class="custom-scrollbar border flex w-[357px] -ml-[2px] border-white p-3 rounded-[15px] m-4 h-[200px] text-center py-3 overflow-x-scroll  custom-scrollbar">
              <img src=" ${point.total.photo1}" alt="" class="w-[350px] h-[185] mr-2"/>
              <img src=" ${point.total.photo2}"  alt=""  class="w-[350px] h-[185] mr-2"/>
              <img src=" ${point.total.photo3}"  alt=""  class="w-[350px] h-[185] mr-2"/>
            </div>
            
          <div class="border border-white py-3 px-4 rounded-[15px] mt-4">
            <p> Type: ${point.total.type}</p>
            <p> Location: ${point.total.location}</p>
            <p> Lat: ${point.total.coordinates.latitude}</p>
            <p> Lon: ${point.total.coordinates.longitude}</p>
            <div id="detail" class="  mt-2  mb-3 text-justify">
              <p> Details: ${point.total.details}</p>
            </div>
          </div>
         
         

            </div>
          </div>
          <br>
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
