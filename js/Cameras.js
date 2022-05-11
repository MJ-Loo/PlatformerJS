import * as THREE from 'three';
export class Cameras{
    constructor(window, scene){
        this.window = window;
        this.scene = scene;
    }
    perspectiveCamera(fov = 90 , aspect = window.innerWidth/window.innerHeight, near = 0.1, far = 1000){
        let perspectiveCamera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        perspectiveCamera.position.set( 50, 15, 50 );
        perspectiveCamera.lookAt( 0, 0, 0 );
        return perspectiveCamera;
    }
}