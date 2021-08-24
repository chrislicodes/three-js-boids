import * as THREE from "three";

export class Box {
  #model: THREE.Mesh;

  constructor() {
    this.#model = new THREE.Mesh(
      new THREE.BoxGeometry(80, 80, 80),
      new THREE.MeshBasicMaterial({ side: THREE.BackSide, wireframe: true })
    );
  }

  get model() {
    return this.#model;
  }
}
