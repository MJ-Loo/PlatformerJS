import * as CANNON from '../cannon/cannon-es.js'
import * as THREE from 'https://unpkg.com/three@0.140.0/build/three.module.js'

export class Cone{
    constructor(params){
        // process params
        this.params = params;
        const radius = params.radius;
        const height = params.height;
        const position = params.position;
        const material = params.material;
        const mass = params.mass;

        // three
        this.createThreeMesh(radius,height, material,position);

        // cannon
        this.createWorldBody(radius,height, mass,position);
    }

    createThreeMesh(radius, height, material,position){
        this.geometry = new THREE.ConeGeometry( radius, height, 32 );
        this.material = material;
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(position.x, position.y ,position.z);

    }

    createWorldBody(radius, height,mass,position){
        this.physicalMaterial = new CANNON.Material();
        this.body = new CANNON.Body({
            mass: mass,
            shape: new CANNON.Cylinder(0.1, radius,height,32),
            position: new CANNON.Vec3(0, 0, 0),
            material: this.physicalMaterial
        })
        this.body.position.set(position.x, position.y,position.z);
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