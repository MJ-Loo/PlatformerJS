import * as THREE from 'three';
export class Cameras{
    constructor(window, scene){
        this.window = window;
        this.scene = scene;
    }
    perspectiveCamera(fov = 90 , aspect = window.innerWidth/window.innerHeight, near = 0.1, far = 1000){
        let perspectiveCam = new THREE.PerspectiveCamera(fov, aspect, near, far);
        perspectiveCam.position.set( 50, 15, 50 );
        perspectiveCam.lookAt( 0, 0, 0 );
    }
}