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

const sphere = new MySphere(2, 32, 16);
scene.add(sphere.sphere);
camera.position.z = 5;

sphere.addMarker("LAT_LONG", 30, -90, (object) => {
  var geometry = new THREE.SphereGeometry(0.05, 10, 5);
  var material = new THREE.MeshBasicMaterial({ color: Colors.BLUE });
  var box = new THREE.Mesh(geometry, material);
  box.applyMatrix4(object);
  return box;
});

markerPointDemo();
apiDataDemo();
canvas.gameLoop(() => {
  sphere.sphere.rotation.x += 0.0001;
  sphere.sphere.rotation.y += 0.0001;
});

function markerPointDemo() {
  let markedPoints = new MarkedPoints();
  markedPoints.add(1, "190101", "This is point A");
  markedPoints.add(2, "190145", "This is point B");
  markedPoints.add(3, "180918", "This is point C");
  markedPoints.add(4, "170101", "This is point D");
  markedPoints.add(5, "200145", "This is point E");
  markedPoints.add(6, "120918", "This is point F");

  for (let point of markedPoints.points) {
    sphere.addMarker(point.name, null, null, (matrix) => {
      var geometry = new THREE.BoxGeometry(0.05, 0.05, 0.05);
      var material = new THREE.MeshBasicMaterial({ color: Colors.ORANGE });
      var box = new THREE.Mesh(geometry, material);
      box.applyMatrix4(matrix);
      return box;
    });
  }

  sphere.onMarkerClick(camera, (text) => {
    const point = markedPoints.find(text);
    if (point != null) {
      showInfo(point);
    }
  });
}

function showInfo(point) {
  let infoDiv = document.getElementById("info");
  if (!infoDiv) {
    infoDiv = document.createElement("div");
    infoDiv.id = "info";
    infoDiv.style.position = "absolute";
    infoDiv.style.top = "10px";
    infoDiv.style.left = "10px";
    infoDiv.style.color = "white";
    infoDiv.style.fontSize = "20px";
    infoDiv.innerHTML = "Click on a marker to see the details";
    document.body.appendChild(infoDiv);
  }
  infoDiv.innerHTML = `ID: ${point.id}<br>Name: ${point.name}<br>Details: ${point.details}`;
}

function apiDataDemo() {
  const dataFetcher = new DataFetcher((data) => {
    let markedPoints = new MarkedPoints();
    for (let user of data) {
      markedPoints.add(user.id, user.name, user.email);
      sphere.addMarker(user.name, null, null, (matrix) => {
        var geometry = new THREE.BoxGeometry(0.05, 0.05, 0.05);
        var material = new THREE.MeshBasicMaterial({ color: Colors.RED });
        var box = new THREE.Mesh(geometry, material);
        box.applyMatrix4(matrix);
        return box;
      });
    }

    sphere.onMarkerClick(camera, (text) => {
      const point = markedPoints.find(text);
      if (point != null) {
        showInfo(point);
      }
    });
  });

  dataFetcher.fetchData("https://jsonplaceholder.typicode.com/users");
}
