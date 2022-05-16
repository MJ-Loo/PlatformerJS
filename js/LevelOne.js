import * as THREE from 'https://unpkg.com/three@0.140.0/build/three.module.js'
import * as CANNON from './cannon/cannon-es.js'
import {Box} from './objects/Box.js'
import { Sphere } from './objects/Sphere.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.139.2/examples/jsm/loaders/GLTFLoader.js';
import { RitualRoom } from './objects/RitualRoom.js';

export class LevelOne{
    constructor(scene, world, renderer){
        this.scene = scene;
        this.world = world;
        this.renderer = renderer
        // add ambient light
        const ambientLight = new THREE.AmbientLight( 0x404040, 0.5 ); // soft white light
        scene.add( ambientLight );

        // add directional light
        const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
        directionalLight.position.set( 10, 10, 10);
        directionalLight.castShadow = true; // enable shadows
        directionalLight.shadow.mapSize.width = 2048; // sharpness of shadow
        directionalLight.shadow.mapSize.height = 2048; // sharpness of shadow
        directionalLight.shadow.camera.left = -10; // area of shadow
        directionalLight.shadow.camera.right = 10; // area of shadow
        directionalLight.shadow.camera.top = 10; // area of shadow
        directionalLight.shadow.camera.bottom = -10; // area of shadow
        this.scene.add( directionalLight );

        //Create a helper for the shadow camera (optional)
        const helper = new THREE.CameraHelper( directionalLight.shadow.camera );
        scene.add( helper );

        // create ground object
        this.startRoom = new RitualRoom(this.scene, this.world, this.renderer);
        this.startRoom.RitualRoom();
    }
    skybox(){

    }

    update(){ // update positions and rotations of all objects
    }
}