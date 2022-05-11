import * as THREE from 'three';

export class Lighting{
    constructor(){
        this.lights =[]
    }

    ambientLight(){
        let light = new THREE.AmbientLight(0xffffff)
        this.lights.push(light)
        return light
    }
}