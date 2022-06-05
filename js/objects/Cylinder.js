import * as CANNON from '../cannon/cannon-es.js'
import * as THREE from 'https://unpkg.com/three@0.140.0/build/three.module.js'

export class Cylinder{
    constructor(params){
        // process params
        this.params = params;
        const radius1 = params.dim.r1;
        const height = params.dim.h;
        const segments = params.dim.s;
        const material = params.material;
        const mass = params.mass;
        const position = params.position;
        // three
        this.createThreeMesh(radius1, material, height, segments, position);

        // cannon
        this.createWorldBody(radius1, mass, height, segments, position);
    }

    createThreeMesh(radius1, material,height,segments, position){
        this.geometry = new THREE.CylinderGeometry(radius1, radius1, height, segments );
        this.material = material;
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(position[0], position[1],position[2]);
    }

    createWorldBody(radius1, mass, height,segments, position){
        this.physicalMaterial = new CANNON.Material( );
        this.body = new CANNON.Body({
            mass: mass,
            shape: new CANNON.Cylinder(radius1, radius1, height, segments),
            position: new CANNON.Vec3(0, 0, 0),
            material: this.physicalMaterial
        });
        this.body.position.set(position[0], position[1],position[2]);

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