import * as THREE from "three";
import { TrackballControls } from "three/addons/controls/TrackballControls.js";
import { MarkedPoints, Point} from "./data/LocalData";
import { DataFetcher } from "./data/APIDataFetcher.js";
import { MySphere} from "./SphereMarker.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controller = new TrackballControls(camera, renderer.domElement);

const sphere = new MySphere(2, 32, 16);
scene.add(sphere.sphere);

camera.position.z = 5;

markerPointDemo();
apiDataDemo();

function animate() {
  requestAnimationFrame(animate);
  controller.update();
  sphere.sphere.rotation.x += 0.0001;
  sphere.sphere.rotation.y += 0.0001;

  renderer.render(scene, camera);
}

animate();

function markerPointDemo() {
  let markedPoints = new MarkedPoints();
  markedPoints.add(1, "190101", "This is point A");
  markedPoints.add(2, "190145", "This is point B");
  markedPoints.add(3, "180918", "This is point C");
  markedPoints.add(4, "170101", "This is point D");
  markedPoints.add(5, "200145", "This is point E");
  markedPoints.add(6, "120918", "This is point F");
  for (let point of markedPoints.points) {
    sphere.addMarker(point.name);
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
      sphere.addMarker(user.name);
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
