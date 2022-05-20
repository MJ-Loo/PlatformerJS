import * as CANNON from '../cannon/cannon-es.js'
import * as THREE from 'https://unpkg.com/three@0.140.0/build/three.module.js'

export class Sphere{
    constructor(params){
        // process params
        this.params = params;
        const radius = params.radius;
        const material = params.material;
        const mass = params.mass;

        // three
        this.createThreeMesh(radius, material);

        // cannon
        this.createWorldBody(radius, mass);
    }

    createThreeMesh(radius, material){
        this.geometry = new THREE.SphereGeometry(radius);
        this.material = material;
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }

    createWorldBody(radius, mass){
        this.physicalMaterial = new CANNON.Material();
        this.body = new CANNON.Body({
            mass: mass,
            shape: new CANNON.Sphere(radius),
            position: new CANNON.Vec3(0, 0, 0),
            material: this.physicalMaterial
        });
    }

    setPosition(position){
        this.body.position.set(position.x, position.y, position.z);
    }

    setRotation(rotation){
        this.body.quaternion.setFromEuler(rotation.x, rotation.y, rotation.z);
    }

    setMass(mass){
        this.body.mass = mass;
    }

    update(){
        this.mesh.position.copy(this.body.position);
        this.mesh.quaternion.copy(this.body.quaternion);
    }
}