// import OrbitControls
import * as THREE from "three";
import { MyCanvas } from "/MyCanvas";

let scene, camera, renderer;
const canvas = new MyCanvas(window);
scene = canvas.scene;
camera = canvas.camera;
renderer = canvas.renderer;
canvas.init(document);
canvas.setBackgroundEXR("/BackgroundDemo/starmap_2020_4k.exr");
//canvas.setBackgroundColor(0xffffff);
var geometry = new THREE.BoxGeometry(2, 2, 2);
var material = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);
canvas.gameLoop(() => {});
