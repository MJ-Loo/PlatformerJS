import * as THREE from 'https://unpkg.com/three@0.140.0/build/three.module.js'
import * as CANNON from './cannon/cannon-es.js'
import {Box} from './objects/Box.js'
import { Sphere } from './objects/Sphere.js';

export class LevelOne{
    constructor(scene, world){
        this.scene = scene;
        this.world = world;

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
        let params = { 
            scale: {x: 100, y: 1, z: 100},
            mass: 0,
            material: new THREE.MeshStandardMaterial({color: 0xffffff, wireframe: false})
        }
        this.ground = new Box(params);
        // enable shadows
        this.ground.mesh.receiveShadow = true;
        this.ground.mesh.castShadow = true;
        // add ground to scene and world
        this.world.addBody(this.ground.body);
        this.scene.add(this.ground.mesh);

        // create cube object
        params = { 
            scale: {x: 5, y: 5, z: 5},
            mass: 1,
            material: new THREE.MeshStandardMaterial({color: 0x00ff00, wireframe: false})
        }
        this.box = new Box(params);
        this.box.setPosition({x: 0, y: 25, z: 0});
        // enable shadows
        this.box.mesh.receiveShadow = true;
        this.box.mesh.castShadow = true;
        // add cube to scene and world
        this.world.addBody(this.box.body);
        this.scene.add(this.box.mesh);

        // create sphere object
        params = {
            radius: 2,
            mass: 0,
            material: new THREE.MeshStandardMaterial({color: 0x0000ff, wireframe: true})
        }
        this.sphere = new Sphere(params);
        this.sphere.setPosition({x: -10, y: 5, z:0});
        // enable shadows
        this.sphere.mesh.receiveShadow = true;
        this.sphere.mesh.castShadow = true;
        // add sphere to scene and world
        this.world.addBody(this.sphere.body);
        this.scene.add(this.sphere.mesh);

    }

    update(){ // update positions and rotations of all objects
        this.ground.update();
        this.box.update();
        this.sphere.update();
    }
}