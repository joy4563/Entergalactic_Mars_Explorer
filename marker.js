// Import the TextGeometry
import * as THREE from "three";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TrackballControls } from "three/addons/controls/TrackballControls.js";

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

const geometry = new THREE.SphereGeometry(2, 32, 16);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

camera.position.z = 5;

// Load the font
const loader = new FontLoader();
loader.load("/helvetiker_regular.typeface.json", function (font) {
  // Create the text geometry
  const textGeometry = new TextGeometry("Hello", {
    font: font,
    size: 0.2,
    height: 0.05,
    curveSegments: 12,
    bevelEnabled: false,
  });

  // Create the text material
  const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

  // Create the text mesh
  const text = new THREE.Mesh(textGeometry, textMaterial);

  // Position the text on top of the cube
  text.position.set(2, 0.5, 0);
  text.lookAt(2, 0.5, 0);

  // create a temporary object
  const tempObject = new THREE.Object3D();
  const tempPosition = new THREE.Vector3();
  const tempNormal = new THREE.Vector3();
  //

  tempPosition.copy(randomPointOnSurface(2));
  tempNormal.copy(tempPosition).normalize();
  tempObject.position.copy(tempPosition);
  tempObject.lookAt(tempNormal.add(tempPosition));
  tempObject.updateMatrix();
  const box = new THREE.Mesh(
    new THREE.BoxGeometry(0.05, 0.05, 0.05),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
  );
  box.applyMatrix4(tempObject.matrix);
  sphere.add(box);
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

function randomPointOnSurface(radius) {
  let x = Math.random() * 2 - 1;
  let y = Math.random() * 2 - 1;
  while (x * x + y * y > 1) {
    x = Math.random() * 2 - 1;
    y = Math.random() * 2 - 1;
  }
  let z = Math.sqrt(1 - x * x - y * y);
  let point = new THREE.Vector3(x, y, z);
  point.multiplyScalar(radius);
  return point;
}


