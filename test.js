
// Import the TextGeometry
import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';


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


const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;


// Load the font
const loader = new FontLoader();
loader.load("/helvetiker_regular.typeface.json", function ( font ) {

  // Create the text geometry
  const textGeometry = new TextGeometry( 'Hello', {
    font: font,
    size: 0.2,
    height: 0.05,
    curveSegments: 12,
    bevelEnabled: false
  } );

  // Create the text material
  const textMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});

  // Create the text mesh
  const text = new THREE.Mesh(textGeometry, textMaterial);

  // Position the text on top of the cube
  text.position.set(0, 0.5, 0);


  // Add the text to the cube
  cube.add(text);
  

} );


function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
