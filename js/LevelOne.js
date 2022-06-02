import * as THREE from 'https://unpkg.com/three@0.140.0/build/three.module.js'
import * as CANNON from './cannon/cannon-es.js'
import {Box} from './objects/Box.js'
import { Sphere } from './objects/Sphere.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.139.2/examples/jsm/loaders/GLTFLoader.js';
import { RitualRoom } from './objects/RitualRoom.js';
import { Corridor } from './objects/Corridor.js';
import {EndRoom} from './objects/End.js'

export class LevelOne{
    constructor(scene, world, renderer, player){
        this.scene = scene;
        this.world = world;
        this.renderer = renderer;
        this.player = player;
        // add ambient light
        this.ambientLight = new THREE.AmbientLight( 0x404040, 2 ); // soft white light
        scene.add( this.ambientLight );

        // add directional light
        const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
        directionalLight.position.set( -10, 100, 0);
        directionalLight.castShadow = true; // enable shadows
        directionalLight.shadow.mapSize.width = 1024; // sharpness of shadow
        directionalLight.shadow.mapSize.height = 1024; // sharpness of shadow
        directionalLight.shadow.camera.left = -300; // area of shadow
        directionalLight.shadow.camera.right = 300; // area of shadow
        directionalLight.shadow.camera.top = 300; // area of shadow
        directionalLight.shadow.camera.bottom = -300; // area of shadow
        this.scene.add( directionalLight );

        this.drawSkyBox();
        this.drawSkyBox2();
        scene.background = this.sky1;

        // Create Ritual room - level 1
        this.startRoom = new RitualRoom(this.scene, this.world, this.renderer, -20,0,-20);
        this.startRoom.RitualRoom();
        // create moving platforms for level 1
        this.texture = new THREE.TextureLoader();
        
        const platform_texture = this.texture.load('./assets/RitualRoom/tiles.png');
        const maxAnisotropy = this.renderer.capabilities.getMaxAnisotropy();
        platform_texture.anisotropy = maxAnisotropy;
        platform_texture.wrapS = THREE.RepeatWrapping;
        platform_texture.wrapT = THREE.RepeatWrapping;
        platform_texture.encoding = THREE.sRGBEncoding;
        let params = { 
            scale: {x: 5, y:1, z: 5},
            mass: 0,
            position: [-20,2,72],
            rotation: {x:0, y:0,z:0},
            material: new THREE.MeshStandardMaterial({map: platform_texture,color: 0x404040, wireframe: false})
        }
        this.Mp1 = new Box(params);
        this.Mp1.mesh.receiveShadow = true;
        this.Mp1.mesh.castShadow = true;
        this.world.addBody(this.Mp1.body);
        this.scene.add(this.Mp1.mesh);
        let params1 = { 
            scale: {x: 6, y:1, z: 6},
            mass: 0,
            position: [-23,-2,85],
            rotation: {x:0, y:0,z:0},
            material: new THREE.MeshStandardMaterial({map: platform_texture,color: 0x404040, wireframe: false})
        }
        this.Mp2 = new Box(params1);
        this.Mp2.mesh.receiveShadow = true;
        this.Mp2.mesh.castShadow = true;
        this.world.addBody(this.Mp2.body);
        this.scene.add(this.Mp2.mesh);

        let params2 = { 
            scale: {x: 4, y:1, z: 4},
            mass: 0,
            position: [0,4,90],
            rotation: {x:0, y:0,z:0},
            material: new THREE.MeshStandardMaterial({map: platform_texture,color: 0x404040, wireframe: false})
        }
        this.Mp3 = new Box(params2);
        this.Mp3.mesh.receiveShadow = true;
        this.Mp3.mesh.castShadow = true;
        this.world.addBody(this.Mp3.body);
        this.scene.add(this.Mp3.mesh);
        
        let params3 = { 
            scale: {x: 6, y:1, z: 6},
            mass: 0,
            position: [0,4,90],
            rotation: {x:0, y:0,z:0},
            material: new THREE.MeshStandardMaterial({map: platform_texture,color: 0x404040, wireframe: false})
        }
        this.Mp4 = new Box(params3);
        this.Mp4.mesh.receiveShadow = true;
        this.Mp4.mesh.castShadow = true;
        this.world.addBody(this.Mp4.body);
        this.scene.add(this.Mp4.mesh);
        // make the corridor section - level 2
        this.Corridor = new Corridor(this.scene, this.world, this.renderer, -13, 15,120);

        // Create End room - level 3
        this.End = new EndRoom(this.scene, this.world, this.renderer, 0,-60, 600);
        this.End.intialize();
    }
    drawSkyBox(scene){
        const loader = new THREE.CubeTextureLoader(); 
        this.sky1 = loader.load([
          './assets/skybox/posx.jpg',
          './assets/skybox/negx.jpg',
          './assets/skybox/posy.jpg',
          './assets/skybox/negy.jpg',
          './assets/skybox/posz.jpg',
          './assets/skybox/negz.jpg',
          ]);
    }
    drawSkyBox2(scene){
        const loader = new THREE.CubeTextureLoader(); 
        this.sky2 = loader.load([
          './assets/skybox/rightposx.jpg',
          './assets/skybox/leftnegx.jpg',
          './assets/skybox/topposy.jpg',
          './assets/skybox/botnegy.jpg',
          './assets/skybox/frontposz.jpg',
          './assets/skybox/backnegz.jpg',
          ]);
         
    }
    fakeTop(){
    
        const texture = this.texture.load('./assets/skybox/topposy.jpg');
    
        const geometry = new THREE.PlaneGeometry( 1000, 1000 );
        const material = new THREE.MeshBasicMaterial( {map: texture,color: 0xffffff, side: THREE.FrontSide} );
        
        this.plane = new THREE.Mesh( geometry, material );
        this.plane.rotation.x= Math.PI/2;
        this.scene.add( this.plane );
    }
    
    update(){ 
        // update positions and rotations of all objects
        

        this.Mp1.setPosition({x: -6+ Math.sin(Date.now()/1000)*5, y:-4, z:76});
        this.Mp1.update();

        this.Mp2.setPosition({x:-20 , y:-2, z: 90 + Math.sin(Date.now()/950)*6});
        this.Mp2.update();

        this.Mp3.setPosition({x:-10+ Math.sin(Date.now()/1000)*6, y:2, z:95});
        this.Mp3.update();
        this.startRoom.flicker();
        this.Corridor.flash();
        console.log(this.player.body.position)
        this.status =1;
        if (this.player.body.position.y<-20 && this.player.body.position.z < 244 ) {
            this.status = 0
        }    
        if (!(this.player.body.position.z < 135 || this.player.body.position.z > 220)) {
            this.player.spotlight.visible = true;
            if (this.player.body.position.y<6.5 ) {
                this.status =0
            }
        }
        else {
            this.player.spotlight.visible = false;
        } 
        
        if (this.player.body.position.z >244 &&this.player.body.position.y >15 ) {
            this.scene.background= this.sky2;       
            this.player.setPosition({x:0, y: -30,z:568});
        }

        if (this.status == 0){
            this.player.setPosition({x: -15, y: 3, z: -20})
            console.log("you lose!");
            this.scene.background= this.sky1;        
        }
    }
}