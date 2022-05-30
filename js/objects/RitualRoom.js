import * as THREE from 'three';
import {Box} from './Box.js'
import { Sphere } from './Sphere.js';
import { Cone } from './Cone.js';
import { Cylinder } from './Cylinder.js';
import { Models } from './ModelLoader.js';


export class RitualRoom{
    constructor(scene, world, renderer){
      this.scene = scene;
      this.world = world;
      this.renderer = renderer;
      this.texture = new THREE.TextureLoader();
      this.x = 0;
      this.y=0;
      this.z =0;      
      
      this.candleLight1 = new THREE.PointLight( 0xffd07d, 2, 10 );
      this.candleLight1.position.set( 2.5, 2,7.3);
      this.scene.add(this.candleLight1);

      this.candleLight2 = new THREE.PointLight( 0xffb87d, 2, 10 );
      this.candleLight2.position.set( 0, 2,-6.3);
      this.scene.add(this.candleLight2);

      
      this.candleLight3 = new THREE.PointLight( 0xffd180, 2, 10 );
      this.candleLight3.position.set( -4.2,2,6.8);
      this.scene.add(this.candleLight3);

      this.candleLight4 = new THREE.PointLight( 0xff6726, 2, 10 );
      this.candleLight4.position.set( 7.6,2,-0.7);
      this.scene.add(this.candleLight4);

      this.candleLight5 = new THREE.PointLight( 0xfff5e3, 2, 10 );
      this.candleLight5.position.set(-5.6,2,-2.7);
      this.scene.add(this.candleLight5);
    }
    
    RitualRoom(){
      this.createWalls('RRfloor.jpg',[ 25, 1, 25],[0,0,0],[0, 0,0]);
      this.createWalls('ceiling.png',[ 25, 1, 25],[0,15,0],[0,0,0]);

      // create walls 
      this.createWalls('RRWallCentre.jpg',[2,15,25],[0, 7, -12.5],[0, Math.PI /2,0]);
      this.createWalls('RRWallLeft.jpg',[2,15,25],[-12.5, 7, 0], [ 0,0,0]);
      this.createWalls('RRWallRight.jpg',[2,15,25],[12.5, 7, 0],[0,0,0]);
      this.createWalls('RRWallDoorRight.jpg',[2,15,10],[-8,7,12.5],[0, Math.PI /2,0]);
      this.createWalls('RRWallDoorLeft.jpg',[2,15,10],[8,7,12.5],[0, Math.PI /2,0]);
      this.createWalls('RRWallAboveDoor.jpg',[2,8,6],[0,10.7,12.5],[0, Math.PI /2,0]);

      this.createWalls('door.png',[6,1,10],[0,0,18],[0, Math.PI ,0]);

      this.AddCandle([2.5,1,7.3]);
      this.AddCandle([0,1,-6.3]);
      this.AddCandle([-4.2,1,6.8]);
      this.AddCandle([7.6,1,-0.7]);
      this.AddCandle([-5.6,1,-2.7]);
      
      const light = new THREE.AmbientLight( 0x7a0b1a); // soft white light
      light.intensity =0.6;
      this.scene.add(light);

    }


    AddCandle(translation){
      let params = { 
        dim: {r1: (1/4), r2: (1/4), h: 1, s:32},
        mass: 0,
        position: translation,
        material: new THREE.MeshLambertMaterial({color: 0xfff4df, reflectivity : 0.5  , wireframe: false})
    }
      this.candle = new Cylinder(params);
      this.candle.mesh.receiveShadow = true;
      this.candle.mesh.castShadow = true;
      // enable shadows
      this.world.addBody(this.candle.body);
      this.scene.add(this.candle.mesh);
      this.addCandleLight(translation);
    }

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
    addCustomModels(file, pos, rot, size){
      let params = {
        path :file,
        position : {x: pos[0], y:pos[1]+1/2, z: pos[2]-0.1},
        rotation: rot,
        scale: size,
      }
      this.model = new Models(params, this.scene, this.world);
    }

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

  }