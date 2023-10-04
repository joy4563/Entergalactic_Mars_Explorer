import * as THREE from "three";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";

export class MySphere {
  constructor(radius, theta, phi,pic) {
    this.radius = radius;
    this.theta = theta;
    this.phi = phi;
    const geometry = new THREE.SphereGeometry(radius, theta, phi);
    const material = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(pic), // Load your texture here
    });
    const sphere = new THREE.Mesh(geometry, material);
    this.sphere = sphere;
  }

  randomPointOnSurface() {
    let x = Math.random() * 2 - 1;
    let y = Math.random() * 2 - 1;
    while (x * x + y * y > 1) {
      x = Math.random() * 2 - 1;
      y = Math.random() * 2 - 1;
    }
    let z = Math.sqrt(1 - x * x - y * y);

    let point = new THREE.Vector3(x, y, z);
    point.multiplyScalar(this.radius);
    return point;
  }

  addMarker(text, lat , long , callback) {
    let position;
    // console.log(lat,long);
    if (lat != null && long != null)
      position = this.sphericalToCartesian(this.radius, lat, long);
    else position = this.randomPointOnSurface();
    const box = callback(this.getPositionMatrixOnSurface(position));
    box.text = text;
    this.createText("    " + text, new THREE.Vector3(0, 0, 0))
      .then((textShape) => {
        box.add(textShape);
        this.sphere.add(box);
      })
      .catch((error) => {
        console.error(error);
      });
    this.sphere.add(box);
  }

  getPositionMatrixOnSurface(position) {
    const tempObject = new THREE.Object3D();
    const tempPosition = new THREE.Vector3();
    const tempNormal = new THREE.Vector3();
    tempPosition.copy(position);
    tempNormal.copy(tempPosition).normalize();
    tempObject.position.copy(tempPosition);
    tempObject.lookAt(tempNormal.add(tempPosition));
    tempObject.updateMatrix();
    return tempObject.matrix;
  }
//lol
  createText(text, position) {
    const loader = new FontLoader();
    return new Promise((resolve, reject) => {
      loader.load(
        "/fonts/gentilis_regular.typeface.json",
        function (font) {
          const textGeometry = new TextGeometry(text, {
            font: font,
            size: 0.05,
            height: 0.01,
            curveSegments: 12,
            bevelEnabled: false,
            
          });

          const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
          const textMesh = new THREE.Mesh(textGeometry, textMaterial);

          textMesh.position.copy(position);
          textMesh.lookAt(0, 0, 0);
          resolve(textMesh);
        },

        function (xhr) {
          // console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },

        function (error) {
          // console.log("An error happened");
          reject(error);
        }
      );
    });
  }

  onMarkerClick(camera, callback) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    window.addEventListener("mousemove", (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    window.addEventListener("click", () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(this.sphere.children);
      if (intersects.length > 0) {
        callback(intersects[0].object.text);
      } else {
        // callback("No intersection found");
      }
    });
  }

  sphericalToCartesian(r, theta, phi) {
    theta = (theta * Math.PI) / 180;
    phi = (phi * Math.PI) / 180;
    var x = r * Math.sin(theta) * Math.cos(phi);
    var y = r * Math.sin(theta) * Math.sin(phi);
    var z = r * Math.cos(theta);
    return new THREE.Vector3(x, y, z);  
  }
}
