import * as THREE from "three";

//share Geometries and Materials between Boid Instances
export class BoidFactory {
  #geometry: THREE.ConeGeometry;
  #material: THREE.MeshBasicMaterial;
  #boxRef: THREE.Mesh;

  constructor(
    boxRef: THREE.Mesh,
    { color = 0x0fd63d, wireframe = false } = {}
  ) {
    this.#geometry = new THREE.ConeGeometry(1, 3, 8);
    this.#material = new THREE.MeshBasicMaterial({
      color: color,
      wireframe: wireframe,
    });
    this.#boxRef = boxRef;
  }

  createBoid({
    position = new THREE.Vector3((Math.random() - 0.5) * 10, 0, 0),
  } = {}) {
    return new Boid(position, this.#geometry, this.#material, this.#boxRef);
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
  #raycaster: THREE.Raycaster;
  #boxRef: THREE.Mesh;

  constructor(
    position: THREE.Vector3,
    geometry: THREE.ConeGeometry,
    material: THREE.MeshBasicMaterial,
    boxRef: THREE.Mesh
  ) {
    this.#model = new THREE.Mesh(geometry, material);

    this.#model.position.copy(
      new THREE.Vector3(position.x - 0.5, position.y - 0.5, position.z - 0.5)
    );

    this.#boxRef = boxRef;

    this.#raycaster = new THREE.Raycaster(
      this.#model.position,
      this.#velocity.normalize(),
      1,
      10
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

    const intersect = this.#raycaster.intersectObject(this.#boxRef);
    if (intersect.length > 0) {
      this.#velocity.multiplyScalar(-1);
    }

    this.#model.position.add(this.#velocity);
    this.#raycaster.set(this.#model.position, this.#velocity.normalize());
  }

  get model() {
    return this.#model;
  }

  get raycaster() {
    return this.#raycaster;
  }
}
