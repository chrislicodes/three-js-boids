import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { BoidFactory } from "./entities/Boid";
import { Box } from "./entities/Box";
import { Wall } from "./entities/Wall";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl") as HTMLElement;

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
  1000
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 200;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;

// Adding Box
const box = new Box();
scene.add(box.model);

// Adding Wall
// const wall = new Wall(5, 5, 5, 0, 0);
// scene.add(wall.model);

// Raycaster
const raycaster = new THREE.Raycaster();
const rayOrigin = new THREE.Vector3(0, 0, 0);
const rayDirection = new THREE.Vector3(10, 0, 0);
rayDirection.normalize();
raycaster.far = 2;

raycaster.set(rayOrigin, rayDirection);
scene.add(
  new THREE.ArrowHelper(
    raycaster.ray.direction,
    raycaster.ray.origin,
    300,
    0xff0000
  )
);

//Adding the Boids

const boidFactory = new BoidFactory({ wireframe: true });

const boids = Array.from({ length: 1 }).map(() => boidFactory.createBoid());

for (const boid of boids) {
  scene.add(boid.model);
}

const intersect = raycaster.intersectObjects([
  box.model,
  ...boids.map((boid) => boid.model),
]);
console.log(intersect);

const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

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
