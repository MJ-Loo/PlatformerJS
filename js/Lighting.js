import * as THREE from 'three';

export class Lighting{
    constructor(){
    }

    ambientLight(){
        let light = new THREE.AmbientLight(0xffffff, 0.5);
        return light
    }
}