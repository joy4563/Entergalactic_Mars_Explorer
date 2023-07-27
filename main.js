
class Canvas {
 
    constructor(window) {
      this.window = window;
      window.addEventListener("resize", this.onWindowResize);
      //
        console.log("Connetec");
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
      this._trackBallController=new THREE.TrackballControls(this._camera, this._renderer.domElement);
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
    get trackBallController(){
    return  this._trackBallController;
    }

    updateControll(){
      this._trackBallController.update();
    }
    render(){
      this._renderer.render(this._scene, this._camera);
    }
     onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

  
     gameLoop() {
      requestAnimationFrame(this.gameLoop.bind(this))
      this.updateControll();
      this.render();
    }

     init(document) {
      document.body.appendChild( this._renderer.domElement);
     }
   
  }

 