import * as CANNON from '../cannon/cannon-es.js'
import * as THREE from 'https://unpkg.com/three@0.140.0/build/three.module.js'

export class Sphere{
    constructor(param){
        // process params
        const scale = param.scale;
        
        // three
        this.geometry = new THREE.BoxGeometry(scale.x, scale.y, scale.z);
        this.material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            wireframe: true
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        // cannon
        this.physicalMaterial = new CANNON.Material();
        this.body = new CANNON.Body({
            mass: 1,
            shape: new CANNON.Box(new CANNON.Vec3(scale.x/2, scale.y/2, scale.z/2)),
            position: new CANNON.Vec3(0, 0, 0),
            material: this.physicalMaterial
        });
    }

    setPosition(position){
        this.body.position.x = position.x;
        this.body.position.y = position.y;
        this.body.position.z = position.z;
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