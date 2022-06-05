import * as THREE from 'three';
import {Box} from './Box.js'
import { Sphere } from './Sphere.js';
import { Cone } from './Cone.js';
import { Cylinder } from './Cylinder.js';
import { Models } from './ModelLoader.js';

// creates level 3
export class EndRoom{
    constructor(scene, world, renderer,x,y,z){
      this.scene = scene;
      this.world = world;
      this.renderer = renderer;
      this.texture = new THREE.TextureLoader();
      this.x = x; // object coordinates for entire room
      this.y=y;
      this.z =z;      
    }
  intialize() {
    this.initializeStatic();
    this.initializeDynamic();
        
  }
  initializeStatic() {
    //walls on spawn. interrior should be pitch blank. Exterior up to your discretion
    this.StaticPlatforms([10, 30, 0.2], [this.x, this.y+15, this.z - 35], [0, 0, 0], '');
    this.StaticPlatforms([0.2, 30, 10], [this.x - 5, this.y+15, this.z - 30], [0, 0, 0], '');
    this.StaticPlatforms([0.2, 30, 10], [this.x + 5, this.y + 15, this.z - 30], [0, 0, 0], '');
    //floors up to your discretion
    this.StaticPlatforms([10, 0.2, 70], [this.x, this.y, this.z], [0, 0, 0], ''); //floor 1
    this.StaticPlatforms([40, 0.2, 70], [this.x, this.y, this.z + 70], [0, 0, 0], ''); //floor 2
  }

  initializeDynamic() {
    //wall in front of player. pitch blank interior. Exterior p to your discretion
    let params = {
      scale: { x: 10, y: 30, z: 0.2 },
      mass: 0,
      position: [this.x, this.y + 15, this.z - 25],
      rotation: { x: 0, y: 0, z: 0 },
      material: new THREE.MeshStandardMaterial({ map: "", color: 0x000000, wireframe: false })
    }
    this.FrontWall = new Box(params);
    this.FrontWall.mesh.receiveShadow = true;
    this.FrontWall.mesh.castShadow = true;
    this.world.addBody(this.FrontWall.body);
    this.scene.add(this.FrontWall.mesh);

    //first Guilotine rusty cleaver
    let params1 = {
      scale: { x: 10, y: 5, z: 0.2 },
      mass: 0,
      position: [this.x, this.y + 5 , this.z - 10],
      rotation: { x: 0, y: 0, z: 0 },
      material: new THREE.MeshStandardMaterial({ map: "", color: 0x404040, wireframe: false })
    }
    this.Guilotine1 = new Box(params1);
    this.Guilotine1.mesh.receiveShadow = true;
    this.Guilotine1.mesh.castShadow = true;
    this.world.addBody(this.Guilotine1.body);
    this.scene.add(this.Guilotine1.mesh);

    //2nd Guilotine bloody rusted cleaver
    let params2 = {
      scale: { x: 10, y: 5, z: 0.2 },
      mass: 0,
      position: [this.x, this.y + 5, this.z],
      rotation: { x: 0, y: 0, z: 0 },
      material: new THREE.MeshStandardMaterial({ map: "", color: 0x404040, wireframe: false })
    }
    this.Guilotine2 = new Box(params2);
    this.Guilotine2.mesh.receiveShadow = true;
    this.Guilotine2.mesh.castShadow = true;
    this.world.addBody(this.Guilotine2.body);
    this.scene.add(this.Guilotine2.mesh);

    //swinging Guilotine similar to https://cdn.discordapp.com/attachments/972915340050825246/982961020807028776/unknown.png
    let params3 = {
      scale: { x: 0.2, y: 5, z: 10 },
      mass: 0,
      position: [this.x, this.y + 5, this.z + 20],
      rotation: { x: 0, y: 0, z: 0 },
      material: new THREE.MeshStandardMaterial({ map: "", color: 0x404040, wireframe: false })
    }
    this.Guilotine3 = new Box(params3);
    this.Guilotine3.mesh.receiveShadow = true;
    this.Guilotine3.mesh.castShadow = true;
    this.world.addBody(this.Guilotine3.body);
    this.scene.add(this.Guilotine3.mesh);

    //diagonal swinging Guilotine: similar to https://cdn.discordapp.com/attachments/972915340050825246/982401581263777833/unknown.png
    //if possible else: stainless steel cleaver
    let params4 = {
      scale: { x: 0.2, y: 5, z: 10 },
      mass: 0,
      position: [this.x, this.y + 5, this.z + 50],
      rotation: { x: 0, y:Math.PI/3, z: Math.PI },
      material: new THREE.MeshStandardMaterial({ map: "", color: 0x404040, wireframe: false })
    }
    this.Guilotine4 = new Box(params4);
    this.Guilotine4.mesh.receiveShadow = true;
    this.Guilotine4.mesh.castShadow = true;
    this.world.addBody(this.Guilotine4.body);
    this.scene.add(this.Guilotine4.mesh);

    //diagonal swinging Guilotine: similar to https://cdn.discordapp.com/attachments/972915340050825246/982401581263777833/unknown.png 
    //if possible else: stainless steel cleaver
    let params5 = {
      scale: { x: 0.2, y: 5, z: 10 },
      mass: 0,
      position: [this.x, this.y + 5, this.z + 50],
      rotation: { x: 0, y: -Math.PI / 3, z: Math.PI },
      material: new THREE.MeshStandardMaterial({ map: "", color: 0x404040, wireframe: false })
    }
    this.Guilotine5 = new Box(params5);
    this.Guilotine5.mesh.receiveShadow = true;
    this.Guilotine5.mesh.castShadow = true;
    this.world.addBody(this.Guilotine5.body);
    this.scene.add(this.Guilotine5.mesh);

    //rotating fan/saw blades if possible, else bloodied stainless cleaver 
    let params6 = {
      scale: { x: 10, y: 0.2, z: 10 },
      mass: 0,
      position: [this.x + 12, this.y + 3, this.z + 53],
      rotation: { x: 0, y: 0, z: 0 },
      material: new THREE.MeshStandardMaterial({ map: "", color: 0x404040, wireframe: false })
    }
    this.Guilotine6 = new Box(params6);
    this.Guilotine6.mesh.receiveShadow = true;
    this.Guilotine6.mesh.castShadow = true;
    this.world.addBody(this.Guilotine6.body);
    this.scene.add(this.Guilotine6.mesh);

    //rotating fan/saw blades if possible, else bloodied stainless cleaver 
    let params7 = {
      scale: { x: 10, y: 0.2, z: 10 },
      mass: 0,
      position: [this.x - 12, this.y + 3, this.z + 53],
      rotation: { x: 0, y: 0, z: 0 },
      material: new THREE.MeshStandardMaterial({ map: "", color: 0x404040, wireframe: false })
    }
    this.Guilotine7 = new Box(params7);
    this.Guilotine7.mesh.receiveShadow = true;
    this.Guilotine7.mesh.castShadow = true;
    this.world.addBody(this.Guilotine7.body);
    this.scene.add(this.Guilotine7.mesh);

    //cleaver with more blood on sides
    let params8 = {
      scale: { x: 10, y: 10, z: 0.2 },
      mass: 0,
      position: [this.x, this.y + 1, this.z + 75],
      rotation: { x: 0, y: 0, z: 0 },
      material: new THREE.MeshStandardMaterial({ map: "", color: 0x404040, wireframe: false })
    }
    this.Guilotine8= new Box(params8);
    this.Guilotine8.mesh.receiveShadow = true;
    this.Guilotine8.mesh.castShadow = true;
    this.world.addBody(this.Guilotine8.body);
    this.scene.add(this.Guilotine8.mesh);

    //cleaver with more blood on sides
    let params9 = {
      scale: { x: 10, y: 10, z: 0.2 },
      mass: 0,
      position: [this.x, this.y + 1, this.z + 80],
      rotation: { x: 0, y: 0, z: 0 },
      material: new THREE.MeshStandardMaterial({ map: "", color: 0x404040, wireframe: false })
    }
    this.Guilotine9 = new Box(params9);
    this.Guilotine9.mesh.receiveShadow = true;
    this.Guilotine9.mesh.castShadow = true;
    this.world.addBody(this.Guilotine9.body);
    this.scene.add(this.Guilotine9.mesh);

    //cleaver with more bloods on sides
    let params10 = {
      scale: { x: 10, y: 10, z: 0.2 },
      mass: 0,
      position: [this.x, this.y + 1, this.z + 85],
      rotation: { x: 0, y: 0, z: 0 },
      material: new THREE.MeshStandardMaterial({ map: "", color: 0x404040, wireframe: false })
    }
    this.Guilotine10 = new Box(params10);
    this.Guilotine10.mesh.receiveShadow = true;
    this.Guilotine10.mesh.castShadow = true;
    this.world.addBody(this.Guilotine10.body);
    this.scene.add(this.Guilotine10.mesh);
  }
    StaticPlatforms(scale,position,rotation, file){ 
        //const texture = this.texture.load('./assets/Corridor/' + file);
        //const maxAnisotropy = this.renderer.capabilities.getMaxAnisotropy();
        //texture.anisotropy = maxAnisotropy;
       // texture.wrapS = THREE.RepeatWrapping;
      //  texture.wrapT = THREE.RepeatWrapping;
     //   texture.encoding = THREE.sRGBEncoding;
        let params = { 
            scale: {x:scale[0], y:scale[1], z: scale[2]},
            mass: 0,
            position: position,
            rotation: {x:rotation[0], y:rotation[1],z:rotation[2]},
            material: new THREE.MeshStandardMaterial({color: 0x404040, wireframe: false})
        }
        this.platform = new Box(params);
        this.platform.mesh.receiveShadow = true;
        this.platform.mesh.castShadow = true;
        this.world.addBody(this.platform.body);
        this.scene.add(this.platform.mesh);
  }
  update() {
    let FWnewY = Math.min(this.FrontWall.body.position.y + 0.01, -39); //wall "open" up a certain distance
    this.FrontWall.setPosition({x:this.x, y: FWnewY, z: this.z-25}); 
    this.FrontWall.update();

    let G1NewY = Math.max(5*Math.sin(Date.now() /500),-2.5);
    this.Guilotine1.setPosition({ x: this.x, y: this.y + 5 + G1NewY, z: this.z - 10 });//guilotine blade falling and rising
    this.Guilotine1.update();

    let G2NewY = Math.max(6 * Math.sin(Date.now() / 400) + 1 , -2.5);
    this.Guilotine2.setPosition({ x: this.x, y: this.y + 5 + G2NewY, z: this.z });//guilotine blade falling and rising
    this.Guilotine2.update();

    let G3NewY = -Math.abs(5*(Math.sin(Date.now() / 500)));
    let G3NewZ = 8 * (Math.cos(Date.now() / 500)) + 1;
    let G3RotX = -Math.cos(Date.now()/500) * Math.PI/16;
    this.Guilotine3.setPosition({ x: this.x, y: this.y + G3NewY + 9, z: this.z + 20 + G3NewZ });//guilotine blade swinging along y
    this.Guilotine3.setRotation({ x: G3RotX, y: 0, z: 0});
    this.Guilotine3.update();

    let G4NewX = 8 * (Math.cos(Date.now() / 500));
    let G4NewY = -Math.abs(5 * (Math.sin(Date.now() / 500)));
    let G4NewZ = 8 * (Math.cos(Date.now() / 500)) + 1;
    let G4RotX = -Math.cos(Date.now() / 500 ) * Math.PI / 16;
    this.Guilotine4.setPosition({ x: this.x + G4NewX, y: this.y + G4NewY + 9, z: this.z + 50 + G4NewZ });//guilotine blade swinging diagonally
    this.Guilotine4.setRotation({ x: G4RotX, y: Math.PI / 4, z: Math.PI });
    this.Guilotine4.update();

    let G5NewX = -8 * (Math.cos(Date.now() / 500 + 180));
    let G5NewY = -Math.abs(5 * (Math.sin(Date.now() / 500 + 180)));
    let G5NewZ = 8 * (Math.cos(Date.now() / 500+180)) + 1;
    let G5RotX = Math.cos(Date.now() / 500) * Math.PI / 16;
    this.Guilotine5.setPosition({ x: this.x + G5NewX, y: this.y + G5NewY + 9, z: this.z + 50 + G5NewZ });//guilotine blade swinging diagonally
    this.Guilotine5.setRotation({ x: G5RotX, y: -Math.PI / 4, z: Math.PI });
    this.Guilotine5.update();

    let G6RotY = Date.now() / 1000;
    //this.Guilotine6.setPosition({ x: this.x + 12, y: this.y + 3, z: this.z + 53 });
    this.Guilotine6.setRotation({ x: 0, y: G6RotY, z: 0 });//guilotine blade spinning in place
    this.Guilotine6.update();

    let G7RotY = -Date.now() / 1000;
    //this.Guilotine7.setPosition({ x: this.x - 12, y: this.y + 3, z: this.z + 53 });
    this.Guilotine7.setRotation({ x: 0, y: G7RotY, z: 0 });//guilotine blade spinning in place
    this.Guilotine7.update();

    let G8NewX = Math.sin(-Date.now() / 400) * 4* Math.PI;
    this.Guilotine8.setPosition({ x: this.x + G8NewX, y: this.y + 1, z: this.z + 75 });//guilotine blade moving horizontally
    this.Guilotine8.update();

    let G9NewX = Math.sin(-Date.now() / 400 + Math.PI/2) * 4 * Math.PI;
    this.Guilotine9.setPosition({ x: this.x + G9NewX, y: this.y + 1, z: this.z + 80 });//guilotine blade moving horizontally
    this.Guilotine9.update();

    let G10NewX = Math.sin(-Date.now() / 400 - Math.PI / 2) * 4 * Math.PI;
    this.Guilotine10.setPosition({ x: this.x + G10NewX, y: this.y + 1, z: this.z + 85 });//guilotine blade moving horizontally
    this.Guilotine10.update();
  }
}