import * as THREE from "three";

export class Boid {
  model: THREE.Mesh;

  constructor(material: THREE.MeshBasicMaterial, geometry: THREE.ConeGeometry) {
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
