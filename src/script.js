import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

class Boid {
  constructor(material, geometry) {
    this.model = new THREE.Mesh(geometry, material);
    this.model.position.copy(
      new THREE.Vector3((Math.random() - 0.5) * 10, 0, 0)
    );
    // scene.add(this.model);
  }

  update() {
    const { x, y, z } = this.model.position;
    this.model.position.set(
      x + (Math.random() - 0.5),
      y + (Math.random() - 0.5),
      z + (Math.random() - 0.5)
    );
  }
}

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 10;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Cube
 */
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
// scene.add(cube);

const geometry = new THREE.ConeGeometry(1, 3, 16);
const material = new THREE.MeshBasicMaterial({
  color: 0xffff00,
  wireframe: true,
});

const cone = new THREE.Mesh(geometry, material);
scene.add(cone);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();
let lastElapsedTime = 0;

const boids = Array.from({ length: 10 }).map(
  () => new Boid(material, geometry)
);

for (const boid of boids) {
  scene.add(boid.model);
}

console.log(boids);

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - lastElapsedTime;
  lastElapsedTime = elapsedTime;

  // Update Boids
  for (const boid of boids) {
    boid.update();
  }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
