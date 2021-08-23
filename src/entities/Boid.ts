import * as THREE from "three";

export class Boid {
  private _model: THREE.Mesh;

  constructor(
    position = new THREE.Vector3((Math.random() - 0.5) * 10, 0, 0),
    color = 0xffff00,
    wireframe = false
  ) {
    this._model = new THREE.Mesh(
      new THREE.ConeGeometry(1, 3, 16),
      new THREE.MeshBasicMaterial({
        color: color,
        wireframe: wireframe,
      })
    );

    this._model.position.copy(
      new THREE.Vector3(position.x, position.y, position.z)
    );
  }

  update(this: Boid) {
    const { x, y, z } = this._model.position;
    this.model.position.set(
      x + (Math.random() - 0.5),
      y + (Math.random() - 0.5),
      z + (Math.random() - 0.5)
    );
  }

  get model() {
    return this._model;
  }
}
