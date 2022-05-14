import * as CANNON from '../cannon/cannon-es.js'
import * as THREE from 'https://unpkg.com/three@0.140.0/build/three.module.js'

//global variables for moving box
let distX = 1, distY = 1, distZ = 1; 
let speedX = 0.1, speedY = 1, speedZ = 1;

export class Box{
    constructor(params){
        // process params
        this.params = params;
        const scale = params.scale;
        const material = params.material;
        const mass = params.mass;

        //for moving box
        this.movable = false;
        this.timestep = 0; 

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
    //speed of moving box
    setSpeed(x, y, z)
    {
        speedX = x;
        speedY = y;
        speedZ = z;
    }
    //how far the box moves
    setDistance(x, y, z)
    {
        distX = x;
        distY = y;
        distZ = z;
    }
    setPosition(position) {
        this.body.position.set(position.x, position.y, position.z);
    }

    setMovedPosition() //now position box moves to
    {
        let newXPos = distX * Math.sin(this.timestep * speedX)
        let newYPos = distY * Math.sin(this.timestep * speedY)
        let newZPos = distZ * Math.sin(this.timestep * speedZ)
        this.body.position.set(newXPos, newYPos, newZPos);
    }

    setRotation(rotation){
        this.body.quaternion.setFromEuler(rotation.x, rotation.y, rotation.z, 0);
    }

    setMass(mass){
        this.body.mass = mass;
    }
    setMovable(condition) //start/stop command for moving box
    {
        if (condition) this.movable = true;
        else this.movable = false;
    }

    update() {
        if (this.movable) //only move if the box is movable
        {
            this.timestep++;
            this.setMovedPosition();
        }
        
        this.mesh.position.copy(this.body.position);
        this.mesh.quaternion.copy(this.body.quaternion);
    }
}
