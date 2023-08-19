import * as THREE from "three";

import { MarkedPoints, Point } from "./data/LocalData";
import { DataFetcher } from "./data/APIDataFetcher.js";
import { MySphere } from "./SphereMarker.js";
import { MyCanvas } from "./MyCanvas";
import { Colors } from "/Color";

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

const sphere = new MySphere(2, 320, 160);
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
    sphere.sphere.rotation.x += 0.0000;
    sphere.sphere.rotation.y += 0.0002;
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


function showInfo(point) {
    console.log(point);
    let infoDiv = document.getElementById("info");
    if (!infoDiv) {
        infoDiv = document.createElement("div");
        infoDiv.id = "info";
        infoDiv.style.position = "absolute";
        infoDiv.style.top = "10px";
        infoDiv.style.display = "flex";
        // infoDiv.style.alignItems = "center";
        infoDiv.style.justifyContent = "space-between";
        infoDiv.style.left = "10px";
        infoDiv.style.color = "white";
        infoDiv.style.fontSize = "20px";
        infoDiv.innerHTML = "Click on a marker to see the details";
        document.body.appendChild(infoDiv);
    }
    // infoDiv.innerHTML = `IDdf: ${point.id}<br>Name: ${point.name}<br>Details: ${point.details}`;

    infoDiv.innerHTML = `    <div class="flex justify-between">

         <div>
            
            <div class="container mx-auto p-4">
              
                    <!-- Dropdown content -->
                    <ul
                        class="absolute mt-2   border border-gray-300 rounded-lg shadow-md">
                        <li class="px-3 py-2   ">
                            <div class="flex">
                                <div
                                    class=" border-2 py-2 px-4 border-gray-300 hover:bg-blue-500 hover:text-white cursor-pointer">
                                    Location</div>
                                <div
                                    class=" border-2 py-2 px-4 border-gray-300 hover:bg-blue-500 hover:text-white cursor-pointer mx-3">
                                    Tourisom</div>
                                <div
                                    class=" border-2 py-2 px-4 border-gray-300 hover:bg-blue-500 hover:text-white cursor-pointer">
                                    Maps</div>
                            </div>
                        </li>
                        <li
                            class="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer border border-white mx-3 my-2">
                            <input type="checkbox" name="checkbox" id="checkbox" value="option1">
                            <label for="checkbox">Option 1</label>
                        </li>
                        <li
                            class="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer border border-white mx-3 my-2">
                            <input type="checkbox" name="checkbox" id="checkbox2" value="option2">
                            <label for="checkbox2">Option 2</label>
                        </li>
                        <li
                            class="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer border border-white mx-3 my-2">
                            <input type="checkbox" name="checkbox" id="checkbox3" value="option3">
                            <label for="checkbox3">Option 3</label>
                        </li>
                        <li
                            class="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer border border-white mx-3 my-2">
                            Temp Map</li>
                        <li
                            class="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer border border-white mx-3 my-2">
                            Weather Forecast</li>
                        <li
                            class="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer border border-white mx-3 my-2">
                            Rover</li>
                        <li
                            class="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer border border-white mx-3 my-2">
                            Orbiter</li>
                    </ul>
                
    
            </div>
        </div>

        <div class=" ml-[1300px]">


            <div class="border border-white rounded-2xl p-4" id="new">
                <p class="border border-white p-2 rounded-sm">Name: ${point.name}</p>
                <p> Type: ${point._coordinates.type}</p>
                <p> Location: ${point._coordinates.location}</p>
                <p> Lat: ${point._coordinates.coordinates.latitude}</p>
                <p> Lon: ${point._coordinates.coordinates.longitude}</p>
                <p> Details: ${point.details}</p>
                
                
                <br>
            </div>
        </div>
    </div>`;

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
        // console.log(data[0].coordinates.latitude);
        let markedPoints = new MarkedPoints();
        for (let user of data) {
            // console.log(user.description);
            markedPoints.add(
                user.id,
                user.name,
                user.details,
                user.location,
                user
            );
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

    dataFetcher.fetchData(
        "./data/most_interesting_places.json"
    );
}

function apiDataDemo2() {
    const dataFetcher = new DataFetcher((data) => {
        // console.log(data);
    });

    dataFetcher.fetchData(
        "./data/most_interesting_places.json"
    );
}
apiDataDemo2();

// function apiDataDemo23() {
//     const dataFetcher = new DataFetcher((data) => {
//         console.log(data);
//     });

//     dataFetcher.fetchData(
//         "https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0"
//     );
// }
