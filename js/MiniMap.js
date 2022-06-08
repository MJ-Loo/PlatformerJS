import * as THREE from 'https://unpkg.com/three@0.140.0/build/three.module.js'

export class MiniMap{
    constructor(renderer, scene, player){
        this.renderer = renderer;
        this.scene = scene;
        this.player = player;
        this.width = 200;
        this.height = 200;
        this.initCamera();
    }

    initCamera(){
        this.camera = new THREE.PerspectiveCamera(
            10,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.y = 200;
        this.camera.lookAt( 0,0,0 );
    }

    updatePosition(){
        this.camera.position.x = this.player.body.position.x;
        this.camera.position.z = this.player.body.position.z;
    }

    update(){
        if(this.player.controls.enabled){ // update minimap only when playing
            this.updatePosition();
            this.renderer.clearDepth(); // important! clear the depth buffer
            this.renderer.setViewport( window.innerWidth - this.width, window.innerHeight - this.height, this.width , this.height  );
            this.renderer.render( this.scene, this.camera );
        }
    }
}