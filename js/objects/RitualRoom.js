import * as THREE from 'three';
import {Box} from './Box.js'
import { Cylinder } from './Cylinder.js';
import { Models } from './ModelLoader.js';


export class RitualRoom{
    constructor(scene, world, renderer){
      this.scene = scene;
      this.world = world;
      this.renderer = renderer;
      this.texture = new THREE.TextureLoader();
    }
    
    RitualRoom(){
      this.createFloor();
      // create walls 
      this.createWalls('RRWallCentre.jpg',[0, 7, -12.5],[0, Math.PI /2,0]);
      this.createWalls('RRWallLeft.jpg',[-12.5, 7, 0], [ 0,0,0]);
      this.createWalls('RRWallRight.jpg',[12.5, 7, 0],[0,0,0]);
      //  this.addLight();
      //this.AddCandle([0,1,0]);
    //  this.addCustomModels( './assets/RitualRoom/chairs.glb', [0,0,0],[0,0,0],[2,2,2]);
    }


    AddCandle(translation){
      let params = { 
        dim: {r1: (1/3), r2: (1/3), h: 1, s:32},
        mass: 0,
        position: translation,
        material: new THREE.MeshPhongMaterial({color: 0xfff4df, specular: 0xfffbeb  , wireframe: false})
    }
    this.candle = new Cylinder(params);
    this.candle.mesh.receiveShadow = true;
    this.candle.mesh.castShadow = true;
    // enable shadows
    this.world.addBody(this.candle.body);
    this.scene.add(this.candle.mesh);
    }


    addCandleLight(){
      const pointLight = new THREE.PointLight( 0xffffff, 1, 100 ); 
      pointLight.position.set( 2, 10, 2 ); 
      this.scene.add( pointLight ); 
      const sphereSize = 2; 
      const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize ); 
      this.scene.add( pointLightHelper );
    }

    createFloor(){

      const RRfloor = this.texture.load('./assets/RitualRoom/RRfloor.jpg');
      const maxAnisotropy = this.renderer.capabilities.getMaxAnisotropy();
      RRfloor.anisotropy = maxAnisotropy;
      RRfloor.wrapS = THREE.RepeatWrapping;
      RRfloor.wrapT = THREE.RepeatWrapping;
      RRfloor.encoding = THREE.sRGBEncoding;
      let params = { 
          scale: {x: 25, y: 1, z: 25},
          mass: 0,
          position: [0,0,0],
          rotation: {x:0, y:0,z:0},
          material: new THREE.MeshStandardMaterial({map: RRfloor, wireframe: false})
      }
      this.ground = new Box(params);
      // enable shadows
      this.ground.mesh.receiveShadow = true;
      this.ground.mesh.castShadow = true;
      // add ground to scene and world
      this.world.addBody(this.ground.body);
      this.scene.add(this.ground.mesh);
    }


    createWalls(wallFile,translation,rotation){
      const RRWall = this.texture.load('./assets/RitualRoom/' + wallFile);
      const maxAnisotropy = this.renderer.capabilities.getMaxAnisotropy();
      RRWall.anisotropy = maxAnisotropy;
      RRWall.wrapS = THREE.RepeatWrapping;
      RRWall.wrapT = THREE.RepeatWrapping;
      RRWall.encoding = THREE.sRGBEncoding;
      let params = { 
          scale: {x: 2, y: 15, z:25},
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
    addCustomModels(file, pos, rot, size, col){
      let params = {
        path :file,
        position : pos,
        rotation: rot,
        scale: size,
        collision: false
      }
      this.model = new Models(params, this.scene);
      //this.scene.add(this.model.mesh)
    }

  }