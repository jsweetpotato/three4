import * as THREE from "three";
import texture from "./images/texture01.jpg"
import vertex from "./shader/vertex.glsl";
import fragment from "./shader/fragment.glsl";

const OrbitControls = require("three-orbit-controls")(THREE);
// Consider marking event handler as 'passive' to make the page more responsive
// https://stackoverflow.com/questions/39152877/consider-marking-event-handler-as-passive-to-make-the-page-more-responsive


// ↓ vertex and fragment shader use THREE.ShaderMaterial();
// const vertex = `
//   varying vec2 vUv;
//   void main(){
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//     vUv = uv;
//   }
// `;

// const fragment = `
//   uniform sampler2D colorMap;
//   varying vec2 vUv;
//   void main(){
//     gl_FragColor = texture2D(colorMap, vUv);
//   }
// `;


class App {
  constructor() {
    this._container = document.querySelector("#container");

    // renderer
    this._renderer = new THREE.WebGL1Renderer({ antialias: true });
    this._renderer.setPixelRatio(window.devicePixelRatio);
    this._renderer.setSize(window.innerWidth, window.innerHeight);
    this._container.appendChild(this._renderer.domElement);

    // texture
    const layer01 = new THREE.TextureLoader().load(texture);
    layer01.wrapS = layer01.wrapT = THREE.RepeatWrapping;
    this.layer01 = layer01;

    // time
    this.time = 0.0;

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
    this._camera.position.z = 40;
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
    const box = new THREE.BoxBufferGeometry(10, 10, 10, 256);
    const shaderMaterial = new THREE.RawShaderMaterial({
      uniforms: {
        colorMap: {
          value: this.layer01,
        },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    });

    const cube = new THREE.Mesh(box, shaderMaterial);
    this.cube = cube;
    this._scene.add(cube);
  }

  onWindowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._renderer.setSize(window.innerWidth, window.innerHeight);
  }

  render() {
    this._renderer.render(this._scene, this._camera);
    this.update();
    window.requestAnimationFrame(this.render.bind(this));
  }

  update() {
    // this.time += 0.01;

    // const v = Math.sin(this.time);
    // const c1 = new THREE.Vector3(0, 0, 1);
    // const c2 = new THREE.Vector3(0, 1, 0);
    // const sphereColour = c1.lerp(c2, v);
    // this.cube.material.uniforms.sphereColour.value = sphereColour;

    this.controls.update();
    // this.cube.rotation.x = this.time / 2;
    // this.cube.rotation.y = this.time / 2;
  }
}

new App();
