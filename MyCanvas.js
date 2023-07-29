import * as THREE from "three";
import { TrackballControls } from "three/addons/controls/TrackballControls.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader.js";
export class MyCanvas {
  constructor(window) {
    this.window = window;
    window.addEventListener("resize", this.onWindowResize);

    this._scene = new THREE.Scene();
    this._camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this._camera.position.set(0, 5, 10);
    this._renderer = new THREE.WebGLRenderer();
    this._renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this._renderer.domElement);
    this._light = new THREE.DirectionalLight(0xffffff, 1);
    this._light.position.set(1, 1, 1);
    this._scene.add(this._light);
    //
    this._trackBallController = new TrackballControls(
      this._camera,
      this._renderer.domElement
    );
    //
  }

  get scene() {
    return this._scene;
  }

  get camera() {
    return this._camera;
  }

  get renderer() {
    return this._renderer;
  }
  get trackBallController() {
    return this._trackBallController;
  }

  updateControll() {
    this._trackBallController.update();
  }
  render() {
    this._renderer.render(this._scene, this._camera);
  }
  onWindowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._renderer.setSize(window.innerWidth, window.innerHeight);
  }

  gameLoop(callback) {
    requestAnimationFrame(this.gameLoop.bind(this, callback));
    this.updateControll();
    this.render();
    callback();
  }

  init(document) {
    document.body.appendChild(this._renderer.domElement);
  }
  setBackgroundHDR(path) {
    const loader = new RGBELoader();
    loader.load(path, (texture) => {
      const pmremGenerator = new THREE.PMREMGenerator(this._renderer);
      pmremGenerator.compileEquirectangularShader();
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      texture.dispose();
      this._scene.background = envMap;
    });
  }
  setBackgroundEXR(path) {
    const loader = new EXRLoader();
    loader.load(path, (texture) => {
      const pmremGenerator = new THREE.PMREMGenerator(this._renderer);
      pmremGenerator.compileEquirectangularShader();
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      texture.dispose();
      this._scene.background = envMap;
    });
  }
}
