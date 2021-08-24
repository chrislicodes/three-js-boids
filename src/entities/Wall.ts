import * as THREE from "three";

export class Wall {
  #model: THREE.Mesh;

  constructor(width: number, height: number, x: number, y: number, z: number) {
    this.#model = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height),
      new THREE.MeshBasicMaterial()
    );

    this.#model.position.set(x, y, z);
  }

  get model() {
    return this.#model;
  }
}
