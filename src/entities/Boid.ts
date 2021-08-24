import * as THREE from "three";

export class Boid {
  #model: THREE.Mesh;
  #velocity = new THREE.Vector3();

  #acceleration = new THREE.Vector3(
    (Math.random() - 0.5) * 0.01,
    (Math.random() - 0.5) * 0.01,
    (Math.random() - 0.5) * 0.01
  );

  constructor({
    position = new THREE.Vector3((Math.random() - 0.5) * 10, 0, 0),
    color = 0x0fd63d,
    wireframe = false,
  } = {}) {
    this.#model = new THREE.Mesh(
      new THREE.ConeGeometry(1, 3, 8),
      new THREE.MeshBasicMaterial({
        color: color,
        wireframe: wireframe,
      })
    );

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
