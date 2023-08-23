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
           
        </div>
          <div class="col-start-8 col-end-12 max-w-[400px] mt-10 pr-10">
                <img src=${point.total.photo1} alt="Marsss" style="width:170px; height:140px" >


            <div id="new" class="text-sm">
                <p class="border border-white p-2 rounded-full">Name: ${point.name}</p>
                <div class="border border-white p-[10px] rounded-[25px] mt-4">
                <p> Type: ${point.total.type}</p>
                <p> Location: ${point.total.location}</p>
                <p> Lat: ${point.total.coordinates.latitude}</p>
                <p> Lon: ${point.total.coordinates.longitude}</p>
                <div class=" border border-white p-[10px] rounded-[25px] m-4 h-[140px] overflow-y-scroll">
                <p> Details: ${point.total.details}</p>
                </div>
             
                </div>
                <div class=" border border-white p-[10px] rounded-[25px] m-4 h-[200px] text-center px-[70px]  py-[20px]">
                
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
            } else {
                const text = document.getElementById("new").innerHTML;
                const value = messages[checkbox.value];
                if (text.includes(value)) {
                    document.getElementById("new").innerHTML = text.replace(
                        ` ${value}`,
                        ""
                    );
                }
            }
        });
    });
}

function apiDataDemo() {
    const dataFetcher = new DataFetcher((data) => {
        console.log(data);
        const result = data.filter(
            (single) => (single.topographicalgroup == "TerrestrialPeaks")
        );
        console.log(result);
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
