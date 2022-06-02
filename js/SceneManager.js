import * as THREE from 'https://unpkg.com/three@0.140.0/build/three.module.js'
import Stats from 'https://unpkg.com/three@0.140.0/examples/jsm/libs/stats.module.js'
import { GLTFLoader } from 'https://unpkg.com/three@0.139.2/examples/jsm/loaders/GLTFLoader.js';

import * as CANNON from './cannon/cannon-es.js'
import {Player} from './Player.js'
import { LevelOne } from './LevelOne.js'

export class SceneManager{
    constructor(){ // initialize all resources
        this.initializeRenderer();
        this.initializeScene();
        //this.initializeFog();
        this.initializeWorld();
        this.initializeStats();
        this.initializeCamera();
        this.initializePlayer();
        this.lastCallTime = performance.now() / 1000; // needed to get delta for time based movement
    }

    initializeFog() {
        
        const near = 80;
        const far = 10;
        const color = 'black';
        //this.scene.fog = new THREE.Fog(color, near, far);
        this.scene.fog = new THREE.FogExp2(0xFFFFFF,0.3);
    }
    
    initializeRenderer(){
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true; // enable shadows
        document.body.appendChild(this.renderer.domElement);
    }
    
    initializeScene(){ // top level container for scene
        this.scene = new THREE.Scene();
    }
    
    initializeWorld(){ // world (cannonjs) gravity set to -9.81 down
        this.world = new CANNON.World({gravity: new CANNON.Vec3(0, -25, 0)});
    }
    
    initializeStats(){ // stats for FPS counter
        this.stats = new Stats();
        document.body.appendChild(this.stats.dom);
    }

    initializeCamera(){ // initialize camera
        this.camera = new THREE.PerspectiveCamera(
            90,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0,2,0)
    }

    initializePlayer(){ // player object
        const params = {
            camera: this.camera,
            mass: 20
        }
        this.player = new Player(params);
        this.player.setPosition({x: -10, y: 18, z: 327});
        this.world.addBody(this.player.body);
        this.scene.add(this.player.controls.getObject());
    }

    loadScene(){ // select level (work in progress, will take in parameter and select correct level)
        this.level = new LevelOne(this.scene, this.world, this.renderer, this.player);
    }

    update() { // game update
        const timeStep = 1 / 60;
        const time = performance.now() / 1000;
        const dt = time - this.lastCallTime;
        this.lastCallTime = time;
        
        // update objects position and rotation
        if(this.player.controls.enabled){
            this.world.step(timeStep);
            this.level.update();
            this.player.update(dt);
        }
        this.renderer.render(this.scene, this.camera);
        this.stats.update();
    }
    
    onWindowResize(){ // dynamic window size upon resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
}