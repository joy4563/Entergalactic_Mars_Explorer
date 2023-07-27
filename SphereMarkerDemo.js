import * as THREE from "three";
import { TrackballControls } from "three/addons/controls/TrackballControls.js";
import { MarkedPoints, MySphere } from "./SphereMarker.js";

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
sphere.onMarkerClick(camera, (text) => {
  console.log(text);
});

function animate() {
  requestAnimationFrame(animate);
  controller.update();
  //   sphere.rotation.x += 0.01;
  //   sphere.rotation.y += 0.01;
  //   sphere.rotation.z += 0.01;
  renderer.render(scene, camera);
}

animate();

function markerPointDemo() {
  //marker poins

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
}
