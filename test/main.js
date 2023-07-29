// import OrbitControls
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";


const scene = new THREE.Scene();
// create a cube with a normal material
var geometry = new THREE.BoxGeometry(2, 2, 2);
var material = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// create a camera
var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10);

// create a renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// create orbit controls
var controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true; // enable auto rotation
controls.target.copy(cube.position); // set target to cube position


// create a cube geometry
var size = 1000; // adjust to fit your scene
var geometry = new THREE.BoxGeometry(size, size, size);

// flip the geometry faces inward
geometry.scale(-1, 1, 1);

// create a cube texture
var loader = new THREE.CubeTextureLoader();
var cubeTexture = loader.load([
  "/mars_texture.jpg",
  "/mars_texture.jpg",
  "/mars_texture.jpg",
  "/mars_texture.jpg",
  "/mars_texture.jpg",
  "/mars_texture.jpg",
]);

// create a shader material
var shader = THREE.ShaderLib["cube"];
shader.uniforms["tCube"].value = cubeTexture;

var material = new THREE.ShaderMaterial({
  fragmentShader: shader.fragmentShader,
  vertexShader: shader.vertexShader,
  uniforms: shader.uniforms,
  depthWrite: false,
  depthTest: false,
  side: THREE.BackSide,
});

// create a skybox mesh
var skybox = new THREE.Mesh(geometry, material);

 // add the skybox to the scene
 scene.add(skybox);


// animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // update controls
  renderer.render(scene, camera); // render scene
}

animate();
