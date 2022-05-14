import * as CANNON from '../cannon/cannon-es.js'
import * as THREE from 'https://unpkg.com/three@0.140.0/build/three.module.js'

export class Box{
    constructor(params){
        // process params
        this.params = params;
        const scale = params.scale;
        const material = params.material;
        const mass = params.mass;

        // three
        this.createThreeMesh(scale, material);

        // cannon
        this.createWorldBody(scale, mass);
    }

    createThreeMesh(scale, material){
        this.geometry = new THREE.BoxGeometry(scale.x, scale.y, scale.z);
        this.material = material;
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }

    createWorldBody(scale, mass){
        this.physicalMaterial = new CANNON.Material();
        this.body = new CANNON.Body({
            mass: mass,
            shape: new CANNON.Box(new CANNON.Vec3(scale.x/2, scale.y/2, scale.z/2)),
            position: new CANNON.Vec3(0, 0, 0),
            material: this.physicalMaterial
        });
    }

    setPosition(position){
        this.body.position.set(position.x, position.y, position.z);
    }

    setRotation(rotation){
        this.body.quaternion.setFromEuler(rotation.x, rotation.y, rotation.z, 0);
    }

    setMass(mass){
        this.body.mass = mass;
    }

    update(){
        this.mesh.position.copy(this.body.position);
        this.mesh.quaternion.copy(this.body.quaternion);
    }
}
