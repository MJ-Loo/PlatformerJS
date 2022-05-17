import * as THREE from 'https://unpkg.com/three@0.140.0/build/three.module.js'
import * as CANNON from './cannon/cannon-es.js'
import {Box} from './objects/Box.js'
import { Sphere } from './objects/Sphere.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.139.2/examples/jsm/loaders/GLTFLoader.js';
import { RitualRoom } from './objects/RitualRoom.js';
import { Platforms } from './objects/Platforms.js';

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
        directionalLight.position.set( 0, 10, 10);
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
        this.drawSkyBox(this.scene);
        // create ground object
        this.startRoom = new RitualRoom(this.scene, this.world, this.renderer);
        this.startRoom.RitualRoom();
        this.firstPlatforms = new Platforms(this.scene, this.world, this.renderer);
        this.firstPlatforms.createStatic();
        
        let params = { 
            scale: {x: 5, y:1, z: 5},
            mass: 0,
            position: [5,2,74],
            rotation: {x:0, y:0,z:0},
            material: new THREE.MeshStandardMaterial({color: 0x404040, wireframe: false})
        }
        this.Mp1 = new Box(params);
        this.Mp1.mesh.receiveShadow = true;
        this.Mp1.mesh.castShadow = true;
        this.world.addBody(this.Mp1.body);
        this.scene.add(this.Mp1.mesh);

        let params1 = { 
            scale: {x: 6, y:1, z: 6},
            mass: 0,
            position: [-2,-2,85],
            rotation: {x:0, y:0,z:0},
            material: new THREE.MeshStandardMaterial({color: 0x404040, wireframe: false})
        }
        this.Mp2 = new Box(params1);
        this.Mp2.mesh.receiveShadow = true;
        this.Mp2.mesh.castShadow = true;
        this.world.addBody(this.Mp2.body);
        this.scene.add(this.Mp2.mesh);

        let params2 = { 
            scale: {x: 3, y:1, z: 3},
            mass: 0,
            position: [5,4,90],
            rotation: {x:0, y:0,z:0},
            material: new THREE.MeshStandardMaterial({color: 0x404040, wireframe: false})
        }
        this.Mp3 = new Box(params2);
        this.Mp3.mesh.receiveShadow = true;
        this.Mp3.mesh.castShadow = true;
        this.world.addBody(this.Mp3.body);
        this.scene.add(this.Mp3.mesh);


    }
    drawSkyBox(scene){
        const loader = new THREE.CubeTextureLoader(); 
        const texture = loader.load([
          './assets/skybox/posx.jpg',
          './assets/skybox/negx.jpg',
          './assets/skybox/posy.jpg',
          './assets/skybox/negy.jpg',
          './assets/skybox/posz.jpg',
          './assets/skybox/negz.jpg',
          ]);
         scene.background = texture;
    }
    update(){ 
        // update positions and rotations of all objects
        this.Mp1.setPosition({x: Math.sin(Date.now()/1000)*5, y:2, z:74});
        this.Mp1.update();

        this.Mp2.setPosition({x:-2 , y:-2, z: 85 + Math.sin(Date.now()/950)*6});
        this.Mp2.update();

        this.Mp3.setPosition({x: Math.sin(Date.now()/1000)*5, y:2, z:90});
        this.Mp3.update();


    }
}