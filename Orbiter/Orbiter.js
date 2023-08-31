import * as THREE from "three";
import { MyCanvas } from "../MyCanvas.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MySphere } from "../SphereMarker.js";
let scene, camera, renderer;
const canvas = new MyCanvas(window);

scene = canvas.scene;
camera = canvas.camera;
renderer = canvas.renderer;
canvas.init(document);
canvas.setBackgroundEXR("/BackgroundDemo/starmap_2020_4k.exr");

const sphere = new MySphere(5, 320, 160,"../mars_4k_color.jpg");
scene.add(sphere.sphere);


const distance = 20;
let planetAngle = 0;

camera.position.z = 20;

let planet; // Declare a variable to store the loaded model

const loader = new GLTFLoader();

loader.load('../model.glb', function (gltf) {
    planet = gltf.scene; // Store the loaded model in the variable

    // You can set the initial position, rotation, and scale of the loaded model here
    planet.position.set(0, 0, 0);
    planet.rotation.set(0, 0, 0);
    planet.scale.set(1, 1, 1);

    scene.add(planet);
}, undefined, function (error) {
    console.error(error);
});

canvas.gameLoop(() => {
    if (planet) {
        const planetX = Math.cos(planetAngle) * distance;
        const planetZ = Math.sin(planetAngle) * distance;
        planet.position.set(planetX, 0, planetZ);
        planetAngle += 0.005;
    }
    sphere.sphere.rotation.x += 0.0001;
    sphere.sphere.rotation.y += 0.0001;
});

