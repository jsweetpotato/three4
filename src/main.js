import * as THREE from "three";
const OrbitControls = require("three-orbit-controls")(THREE);

// Consider marking event handler as 'passive' to make the page more responsive
// https://stackoverflow.com/questions/39152877/consider-marking-event-handler-as-passive-to-make-the-page-more-responsive
class App {
  constructor() {
    this._container = document.querySelector("#container");

    // renderer
    this._renderer = new THREE.WebGL1Renderer({ antialias: true });
    this._renderer.setPixelRatio(window.devicePixelRatio);
    this._renderer.setSize(window.innerWidth, window.innerHeight);
    this._container.appendChild(this._renderer.domElement);

    // scene
    this._scene = new THREE.Scene();

    // set basic-utils
    this._setCamera();
    this._setLight();
    this._createMesh();
    this._setControls();

    window.addEventListener("resize", this.onWindowResize.bind(this));

    this.render();
  }

  _setCamera() {
    this._camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
    this._camera.position.z = 300;
  }

  _setLight() {
    const color = [0xfadf69, 0x0aafff];
    const intensity = 2;
    const light = new THREE.DirectionalLight(color[0], intensity);
    const light2 = new THREE.DirectionalLight(color[1], intensity);
    light.position.set(-1, 2, 4);
    light2.position.set(1, -2, -4);
    this._scene.add(light, light2);
  }

  _setControls() {
    this.controls = new OrbitControls(this._camera, this._container);
  
    this.controls.target = this.cube.position;
    this.controls.rotateSpeed = 0.5;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.1;
    this.controls.autoRotateSpeed = 0.5;
    this.controls.autoRotate = true;
  }

  _createMesh() {
    const box = new THREE.BoxGeometry(100, 100, 100);
    const meterial = new THREE.MeshNormalMaterial();

    const cube = new THREE.Mesh(box, meterial);
    this.cube = cube;
    this._scene.add(cube);
  }

  onWindowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._renderer.setSize(window.innerWidth, window.innerHeight);
  }

  render(time) {
    this._renderer.render(this._scene, this._camera);
    this.update(time);
    window.requestAnimationFrame(this.render.bind(this));
  }

  update(time) {
    time *= 0.001;
    this.controls.update();
    // this.cube.rotation.x = time / 2;
    // this.cube.rotation.y = time / 2;
  }
}

new App();
