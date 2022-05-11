import * as THREE from 'three';

export class Lighting{
    constructor(){
    }

    ambientLight(){
        let light = new THREE.AmbientLight(0xffffff)
        this.lights.push(light)
        return light
    }
}