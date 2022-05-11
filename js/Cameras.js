import * as THREE from 'three';
export class Cameras{
    constructor(window,scene){
        this.window = window
        this.scene = scene
        this.cameras = []
        this.camCount=0
    }
    perspectiveCam(fov = 90 , aspect= window.innerWidth/window.innerHeight, near =0.1, far =1000){
        let currCam = new THREE.PerspectiveCamera(fov,aspect,near,far)
        currCam.position.set( 50, 15, 50 );
        currCam.lookAt( 0, 0, 0 );
        this.cameras.push(currCam)
        this.camCount++
        return currCam
    }
    getCam(){
        return this.cameras[this.camCount-1]
    }
}