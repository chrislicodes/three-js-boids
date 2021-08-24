import * as THREE from "three";

//share Geometries and Materials between Boid Instances
export class BoidFactory {
  #geometry: THREE.ConeGeometry;
  #material: THREE.MeshBasicMaterial;

  constructor({ color = 0x0fd63d, wireframe = false } = {}) {
    this.#geometry = new THREE.ConeGeometry(1, 3, 8);
    this.#material = new THREE.MeshBasicMaterial({
      color: color,
      wireframe: wireframe,
    });
  }

  createBoid({
    position = new THREE.Vector3((Math.random() - 0.5) * 10, 0, 0),
  } = {}) {
    return new Boid(position, this.#geometry, this.#material);
  }
}

export class Boid {
  #model: THREE.Mesh;
  #velocity = new THREE.Vector3();
  #acceleration = new THREE.Vector3(
    (Math.random() - 0.5) * 0.01,
    (Math.random() - 0.5) * 0.01,
    (Math.random() - 0.5) * 0.01
  );

  constructor(
    position: THREE.Vector3,
    geometry: THREE.ConeGeometry,
    material: THREE.MeshBasicMaterial
  ) {
    this.#model = new THREE.Mesh(geometry, material);

    this.#model.position.copy(
      new THREE.Vector3(position.x - 0.5, position.y - 0.5, position.z - 0.5)
    );
  }

  update(this: Boid) {
    this.#velocity.add(this.#acceleration);
    this.#velocity.clampLength(0, 0.2);

    //Quaternion Magic - https://stackoverflow.com/questions/9038465/three-js-object3d-cylinder-rotation-to-align-to-a-vector
    this.#model.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      this.#velocity.clone().normalize()
    );

    this.#model.position.add(this.#velocity);
  }

  get model() {
    return this.#model;
  }
}
