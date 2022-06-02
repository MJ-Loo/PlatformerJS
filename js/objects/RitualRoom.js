import * as THREE from 'three';
import {Box} from './Box.js'
import { Sphere } from './Sphere.js';
import { Cone } from './Cone.js';
import { Cylinder } from './Cylinder.js';
import { Models } from './ModelLoader.js';

// creates level 1
export class RitualRoom{
    constructor(scene, world, renderer,x,y,z){
      this.scene = scene;
      this.world = world;
      this.renderer = renderer;
      this.texture = new THREE.TextureLoader();
      this.x = x; // object coordinates for entire room
      this.y=y;
      this.z =z;      
      // adding the point light for the candles
      this.candleLight1 = new THREE.PointLight( 0xffd07d, 2, 10 );
      this.candleLight1.position.set(  this.x+2.5,this.y+2,this.z+7.3);
      this.scene.add(this.candleLight1);

      this.candleLight2 = new THREE.PointLight( 0xffb87d, 2, 10 );
      this.candleLight2.position.set(   this.x, this.y+2,this.z-6.3);
      this.scene.add(this.candleLight2);

      
      this.candleLight3 = new THREE.PointLight( 0xffd180, 2, 10 );
      this.candleLight3.position.set(   this.x-4.2,this.y+2,this.z+6.8);
      this.scene.add(this.candleLight3);

      this.candleLight4 = new THREE.PointLight( 0xff6726, 2, 10 );
      this.candleLight4.position.set(   this.x +7.6,this.y+2,this.z-0.7);
      this.scene.add(this.candleLight4);

      this.candleLight5 = new THREE.PointLight( 0xfff5e3, 2,this.z+ 10 );
      this.candleLight5.position.set(  this.x-5.6,this.y+2,this.z-2.7);
      this.scene.add(this.candleLight5);
    }
    
    RitualRoom(){
      // create floor and ceiling
      this.createWalls('RRfloor.jpg',[ 25, 1, 25],[  this.x,  this.y,this.z],[0, 0,0]);
      this.createWalls('ceiling.png',[ 25, 1, 25],[  this.x,this.y+15,this.z],[0,0,0]);

      // create walls 
      this.createWalls('RRWallCentre.jpg',[2,15,25],[  this.x, this.y+7,this.z -12.5],[0, Math.PI /2,0]);
      this.createWalls('RRWallLeft.jpg',[2,15,25],[  this.x-12.5, this.y+7, this.z], [ 0,0,0]);
      this.createWalls('RRWallRight.jpg',[2,15,25],[  this.x+12.5, this.y+7, this.z],[0,0,0]);
      this.createWalls('RRWallDoorRight.jpg',[2,15,10],[  this.x-8,this.y+7,this.z+12.5],[0, Math.PI /2,0]);
      this.createWalls('RRWallDoorLeft.jpg',[2,15,10],[  this.x+8,this.y+7,this.z+12.5],[0, Math.PI /2,0]);
      this.createWalls('RRWallAboveDoor.jpg',[2,8,6],[  this.x,this.y+10.7,this.z+12.5],[0, Math.PI /2,0]);

      this.createWalls('door.png',[6,1,10],[this.x,this.y,this.z+18],[0, Math.PI ,0]);

      this.AddCandle([  this.x+2.5,this.y+ 1, this.z+7.3]);
      this.AddCandle([  this.x,this.y+1,this.z-6.3]);
      this.AddCandle([  this.x-4.2,this.y+1,this.z+6.8]);
      this.AddCandle([  this.x+7.6,this.y+1,this.z-0.7]);
      this.AddCandle([  this.x-5.6,this.y+1,this.z-2.7]);
      
      const light = new THREE.AmbientLight( 0xffefd6); // soft white light
      light.intensity =0.6;
      this.scene.add(light);

      this.createStatic(this.x,this.y,this.z+32)

    }

    // create the base of candle
    AddCandle(translation){
      let params = { 
        dim: {r1: (1/4), r2: (1/4), h: 1, s:32},
        mass: 0,
        position: translation,
        material: new THREE.MeshLambertMaterial({color: 0xffefd6  , wireframe: false})
    }
      this.candle = new Cylinder(params);
      this.candle.mesh.receiveShadow = true;
      this.candle.mesh.castShadow = true;
      // enable shadows
      this.world.addBody(this.candle.body);
      this.scene.add(this.candle.mesh);
      this.addCandleLight(translation); // make the flame with a sphere and cone
    }
    // using sphere and cone to make  a candle flame
    addCandleLight(translation){
      let params ={
        radius: 0.1,
        height: 0.34,
        position : {x: translation[0], y: translation[1] +0.78, z:translation[2]},
        material: new THREE.MeshStandardMaterial({color: 0xffd942, emissive:0xffd942,wireframe: false, transparent: true,  opacity: 0.6}),
        mass:0
      }
      this.Cone = new Cone(params);
      this.world.addBody(this.Cone.body);
      this.scene.add(this.Cone.mesh);
      let params1 ={
        radius: 0.1,
        position : {x: translation[0], y: translation[1] +0.6, z:translation[2]},
        material: new THREE.MeshStandardMaterial({color: 0xff6726, emissive:0xff6200 ,wireframe: false, transparent: true,  opacity: 0.6}),
        mass:0
      }
      this.Sphere = new Sphere(params1);
      this.world.addBody(this.Sphere.body);
      this.scene.add(this.Sphere.mesh);

    }

    createWalls(wallFile,scale,translation,rotation){
      const RRWall = this.texture.load('./assets/RitualRoom/' + wallFile);
      const maxAnisotropy = this.renderer.capabilities.getMaxAnisotropy();
      RRWall.anisotropy = maxAnisotropy;

      RRWall.encoding = THREE.sRGBEncoding;
      let params = { 
          scale: {x: scale[0],y: scale[1], z:scale[2]},
          mass: 0,
          position: translation,
          rotation: {x:rotation[0], y:rotation[1], z: rotation[2]},
          material: new THREE.MeshStandardMaterial({map: RRWall, wireframe: false})
      }
      this.wall = new Box(params);
      // enable shadows
      this.wall.mesh.receiveShadow = true;
      this.wall.mesh.castShadow = true;
  
      this.world.addBody(this.wall.body);
      this.scene.add(this.wall.mesh);
    }

    // flicker for the candle point light - called in update
    flicker(){
      this.candleLight1.intensity = Math.sin(Date.now()/300)+3;
      this.candleLight1.distance = Math.sin(Date.now()/500)+14;

      this.candleLight2.intensity = Math.sin(Date.now()/300)+3;
      this.candleLight2.distance = Math.sin(Date.now()/500)+13;

      this.candleLight3.intensity = Math.sin(Date.now()/500)+6;
      this.candleLight3.distance = Math.sin(Date.now()/500)+12;

      
      this.candleLight4.intensity = Math.sin(Date.now()/420)+6;
      this.candleLight4.distance = Math.sin(Date.now()/200)+10;

      this.candleLight5.intensity = Math.sin(Date.now()/300)+4;
      this.candleLight5.distance = Math.sin(Date.now()/190)+13 ;
    }

    createStatic(x,y,z){
      this.StaticPlatforms([7,1,7],[x-5,y+1,z]);
      this.StaticPlatforms([4,1,4],[x+4,y-1,z+10]);
      this.StaticPlatforms([5,1,5],[x-6,y,z+16]);
      this.StaticPlatforms([6,1,6],[x,y-2,z+24]);
      this.StaticPlatforms([5,1,5],[x+1,y-1,z+32]);
      this.StaticPlatforms([5,1,5],[x+5,y+1,z+39]);
      this.StaticPlatforms([5,1,5],[x-4,y+2,z+46]);
      this.StaticPlatforms([5,1,5],[x+6,y-2,z+55]);
      this.StaticPlatforms([5,1,5],[x-5,y-3,z+67]);
      this.StaticPlatforms([5,1,5],[x+10,y-4,z+76]);
      this.StaticPlatforms([5,1,5],[x-6,y+1,z+90]);
      this.StaticPlatforms([5,1,5],[x+2,y+4,z+92]);
      this.StaticPlatforms([5,1,5],[x+12,y+4,z+100]);

    }

    StaticPlatforms(scale,position){ 
      const platform_texture = this.texture.load('./assets/RitualRoom/tiles.png');
      const maxAnisotropy = this.renderer.capabilities.getMaxAnisotropy();
      platform_texture.anisotropy = maxAnisotropy;
      platform_texture.wrapS = THREE.RepeatWrapping;
      platform_texture.wrapT = THREE.RepeatWrapping;
      platform_texture.encoding = THREE.sRGBEncoding;
      let params = { 
          scale: {x:scale[0], y:scale[1], z: scale[2]},
          mass: 0,
          position: position,
          rotation: {x:0, y:0,z:0},
          material: new THREE.MeshStandardMaterial({map: platform_texture, color: 0x404040, wireframe: false})
      }
      this.platform = new Box(params);
      this.platform.mesh.receiveShadow = true;
      this.platform.mesh.castShadow = true;
      this.world.addBody(this.platform.body);
      this.scene.add(this.platform.mesh);
    }


  }