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
    const wall_texture = this.texture.load('./assets/Corridor/Cwalllong2.jpg');
    const floor_texture = this.texture.load('./assets/End/endFloor.jpg');

    //walls on spawn. interrior should be pitch blank. Exterior up to your discretion
    this.Platforms([10, 10, 0.2], [this.x, this.y+5, this.z - 35], [0, 0, 0], wall_texture);
    this.Platforms([0.2, 10, 10], [this.x - 5, this.y+5, this.z - 30], [0, 0, 0], wall_texture);
    this.Platforms([0.2, 10, 10], [this.x + 5, this.y + 5, this.z - 30], [0, 0, 0], wall_texture);
    //floors up to your discretion
    this.Platforms([10, 0.2, 70], [this.x, this.y, this.z], [0, 0, 0], floor_texture); //floor 1
    this.Platforms([10, 0.2, 70], [this.x-15, this.y, this.z+70], [0, 0, 0], floor_texture); //floor 2.1
    this.Platforms([10, 0.2, 70], [this.x-5, this.y, this.z+70], [0, 0, 0], floor_texture); //floor 2.2
    this.Platforms([10, 0.2, 70], [this.x+5, this.y, this.z+70], [0, 0, 0], floor_texture); //floor 2.3
    this.Platforms([10, 0.2, 70], [this.x + 15, this.y, this.z + 70], [0, 0, 0], floor_texture); //floor 2.4
    
    this.Platforms([10, 0.2, 70], [this.x , this.y, this.z + 140], [0, 0, 0], floor_texture); //winning platform 
  }

  initializeDynamic() {
    const wall_texture = this.texture.load('./assets/Corridor/Cwalllong2.jpg');
    const blade_texture = this.texture.load('./assets/End/blade.jpg');
    const blade2_texture = this.texture.load('./assets/End/blade2.jpg');
    const blade3_texture = this.texture.load('./assets/End/blade3.jpg');
    const circle_texture = this.texture.load('./assets/End/RitualCircle.png');
    circle_texture.wrapS = THREE.RepeatWrapping;
    circle_texture.wrapT = THREE.RepeatWrapping;
    circle_texture.repeat.set(1,1);
    //wall in front of player. pitch blank interior. 
    this.FrontWall = this.Platforms([10, 10, 0.2], [this.x, this.y + 5, this.z - 25], [0, 0, 0], wall_texture);

    //color is pure black, unlike others, to give black image in spawn
    let params0 = {
      scale: { x: 10, y: 10, z: 0.2 },
      mass: 0,
      position: [this.x, this.y + 5, this.z - 25.1],
      rotation: { x: 0, y: 0, z: 0 },
      material: new THREE.MeshStandardMaterial({ map: "", color: 0xf000000, wireframe: false })
    }
    this.InnerFrontWall = new Box(params0);
    this.InnerFrontWall.mesh.receiveShadow = true;
    this.InnerFrontWall.mesh.castShadow = true;
    this.world.addBody(this.InnerFrontWall.body);
    this.scene.add(this.InnerFrontWall.mesh);

    //first Guilotine rusty cleaver, sharp bottom and top if possible
    this.Guilotine1 = this.Platforms([10, 5, 0.2], [this.x, this.y + 5, this.z - 10], [0, 0, 0], blade_texture);
    this.Guilotine2 = this.Platforms([10, 5, 0.2], [this.x, this.y + 5, this.z], [0, 0, 0], blade_texture);

    //swinging Guilotine similar to https://cdn.discordapp.com/attachments/972915340050825246/982961020807028776/unknown.png
    this.Guilotine3 = this.Platforms([0.2, 5, 10], [this.x, this.y + 5, this.z+20], [0, 0, 0], blade_texture);
    
    //diagonal swinging Guilotine: similar to https://cdn.discordapp.com/attachments/972915340050825246/982401581263777833/unknown.png
    //if possible, else: stainless steel cleaver
    this.Guilotine4 = this.Platforms([0.2, 5, 10], [this.x, this.y + 5, this.z + 50], [0, Math.PI/3, 0], blade3_texture);
    this.Guilotine5 = this.Platforms([0.2, 5, 10], [this.x, this.y + 5, this.z + 50], [0, -Math.PI / 3, 0], blade3_texture);

    //rotating fan/saw blades if possible, else bloodied stainless cleaver
    this.CirclePlatformLeft = this.CirclePlatform([this.x + 12, this.y + 3, this.z + 53], circle_texture);
    this.CirclePlatformRight = this.CirclePlatform([this.x - 12, this.y + 3, this.z + 53], circle_texture);
    
    //cleaver with more blood on sides
    this.Guilotine6 = this.Platforms([10, 10, 0.2], [this.x, this.y + 5, this.z + 75], [0, 0, 0], blade2_texture);
    this.Guilotine7 = this.Platforms([10, 10, 0.2], [this.x, this.y + 5, this.z + 80], [0, 0, 0], blade2_texture);
    this.Guilotine8 = this.Platforms([10, 10, 0.2], [this.x, this.y + 5, this.z + 85], [0, 0, 0], blade2_texture);

  }
  Platforms(scale, position, rotation, file) {
    let params = {
      scale: { x: scale[0], y: scale[1], z: scale[2] },
      mass: 0,
      position: position,
      rotation: { x: rotation[0], y: rotation[1], z: rotation[2] },
      material: new THREE.MeshStandardMaterial({ map: file, color: 0x404040, wireframe: false })
    }
    this.platform = new Box(params);
    this.platform.mesh.receiveShadow = true;
    this.platform.mesh.castShadow = true;
    this.world.addBody(this.platform.body);
    this.scene.add(this.platform.mesh);

    return this.platform;
  }
  CirclePlatform(position, texture) {
    let params = {
      dim: { r1: (3), r2: (3), h: 0.2, s: 32 },
      mass: 0,
      position: position,
      material: new THREE.MeshPhongMaterial({ map: texture, color: 0x404040, wireframe: false, shininess: 50 })
    }
    this.CirclePlat = new Cylinder(params);
    this.CirclePlat.mesh.receiveShadow = true;
    this.CirclePlat.mesh.castShadow = true;
    this.world.addBody(this.CirclePlat.body);
    this.scene.add(this.CirclePlat.mesh);
    return this.CirclePlat;
  }

  update() {
    let FWnewY = Math.min(this.FrontWall.body.position.y + 0.04, -50); //wall "open" up a certain distance
    this.FrontWall.setPosition({ x: this.x, y: FWnewY, z: this.z - 25 }); 
    this.InnerFrontWall.setPosition({ x: this.x, y: FWnewY+0.01, z: this.z - 25.1 }); 
    this.FrontWall.update();
    this.InnerFrontWall.update();

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
    this.Guilotine4.setRotation({ x: G4RotX, y: Math.PI / 4, z: 0});
    this.Guilotine4.update();

    let G5NewX = -8 * (Math.cos(Date.now() / 500 + 180));
    let G5NewY = -Math.abs(5 * (Math.sin(Date.now() / 500 + 180)));
    let G5NewZ = 8 * (Math.cos(Date.now() / 500+180)) + 1;
    let G5RotX = Math.cos(Date.now() / 500) * Math.PI / 16;
    this.Guilotine5.setPosition({ x: this.x + G5NewX, y: this.y + G5NewY + 9, z: this.z + 50 + G5NewZ });//guilotine blade swinging diagonally
    this.Guilotine5.setRotation({ x: G5RotX, y: -Math.PI / 4, z: 0 });
    this.Guilotine5.update();

    let CircleRightRotY = Date.now() / 1000;
    this.CirclePlatformLeft.setRotation({ x: 0, y: CircleRightRotY, z: 0 });//guilotine blade spinning in place
    this.CirclePlatformLeft.update();

    let CircleLeftRotY = -Date.now() / 1000;
    this.CirclePlatformRight.setRotation({ x: 0, y: CircleLeftRotY, z: 0 });//guilotine blade spinning in place
    this.CirclePlatformRight.update();

    let G6NewX = Math.sin(-Date.now() / 400) * 4* Math.PI;
    this.Guilotine6.setPosition({ x: this.x + G6NewX, y: this.y + 5, z: this.z + 75 });//guilotine blade moving horizontally
    this.Guilotine6.update();

    let G7NewX = Math.sin(-Date.now() / 400 + Math.PI/2) * 4 * Math.PI;
    this.Guilotine7.setPosition({ x: this.x + G7NewX, y: this.y + 5, z: this.z + 80 });//guilotine blade moving horizontally
    this.Guilotine7.update();

    let G8NewX = Math.sin(-Date.now() / 400 - Math.PI / 2) * 4 * Math.PI;
    this.Guilotine8.setPosition({ x: this.x + G8NewX, y: this.y + 5, z: this.z + 85 });//guilotine blade moving horizontally
    this.Guilotine8.update();
  }
  resetFrontWall() {
    this.FrontWall.setPosition({ x: this.x, y: this.y + 5, z: this.z - 25 }); 
    this.InnerFrontWall.setPosition({ x: this.x, y: this.y + 5, z: this.z - 25 }); 
  }
}