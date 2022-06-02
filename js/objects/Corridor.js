import * as THREE from 'three';
import {Box} from './Box.js';
import { Models } from './ModelLoader.js';
import { Sphere } from './Sphere.js';


export class Corridor{
    constructor(scene, world, renderer, x, y,z){
      this.scene = scene;
      this.world = world;
      this.renderer = renderer;
      this.texture = new THREE.TextureLoader();
      this.x = x;
      this.y = y;
      this.z = z;
      this.createCorridor();
    }
    
  createCorridor() {
      
      this.StaticPlatforms([5, 1, 10], [this.x, this.y, this.z+6.5],[0,Math.PI/2,0],'fullFloor.jpg'); // entrance platform to corridor
      // creating rectangle for the corridor - first section. 
      this.StaticPlatforms([0.2, 12, 15], [this.x-5, this.y+5, this.z+16.5] ,[0,0,0],'WhiteWall.jpg');
      this.StaticPlatforms([0.2, 12, 15], [this.x+5, this.y+5, this.z+16.5] ,[0,0,0],'WhiteWall.jpg');
      this.StaticPlatforms([15, 0.2, 10], [this.x, this.y, this.z+16.5] ,[0,Math.PI/2,0],'fullFloor.jpg');
      this.StaticPlatforms([10, 0.2, 15], [this.x, this.y+10, this.z+16.5] ,[0,0,0],'WhiteWall.jpg');

      // corridor second section
      this.StaticPlatforms([12, 36, 0.2], [this.x-11, this.y+2, this.z+24] ,[0,0,0],'Cwalllong.jpg');
      this.StaticPlatforms([12, 36, 0.2], [this.x+11, this.y+2, this.z+24] ,[0,0,0],'Cwalllong2.jpg');    
      this.StaticPlatforms([10, 17, 0.2], [this.x, this.y-8.5, this.z+24] ,[0,0,0],'Cwalllong.jpg');
      this.StaticPlatforms([0.2, 30, 68], [this.x-17, this.y-1, this.z+58] ,[0,0,0],'Cwalllong.jpg');
      this.StaticPlatforms([0.2, 30, 68], [this.x+17, this.y-1, this.z+58],[0,0,0] ,'Cwalllong2.jpg');
      this.StaticPlatforms([34, 0.2, 68], [this.x, this.y-16, this.z+58],[0,0,0], 'corridorfloor.jpg' );
      this.StaticPlatforms([34, 0.2, 68], [this.x, this.y+10, this.z+58],[0,0,0], 'corridorceling.jpg' );

      
      this.StaticPlatforms([12, 36, 0.2], [this.x-11, this.y+2, this.z+92] ,[0,0,0],'Cwalllong.jpg');
      this.StaticPlatforms([12, 36, 0.2], [this.x+11, this.y+2, this.z+92] ,[0,0,0],'Cwalllong2.jpg');    
      this.StaticPlatforms([10, 17, 0.2], [this.x, this.y-8.5, this.z+92] ,[0,0,0],'Cwalllong.jpg');



      this.platforms();
    

      this.light2 = new THREE.PointLight( 0xffffff, 4, 15 );
      this.light2.position.set(  this.x,this.y+10,this.z+24);
      this.scene.add(this.light2);
      this.addLightbulb([ this.x,this.y+10,this.z+20]);

      this.light3 = new THREE.PointLight( 0xffffff, 6, 17 );
      this.light3.position.set(  this.x,this.y+10,this.z+36);
      this.scene.add(this.light3);
      this.addLightbulb([ this.x,this.y+10,this.z+36]);

      const light = new THREE.AmbientLight( 0xffffff); // soft white light
      light.intensity =0.2;
      this.scene.add(light);

      this.addCustomModels('./assets/Corridor/Board.glb',[this.x+8, this.y, this.z+30],[0,(Math.PI/2)+20,(Math.PI/10)],[1,1,1]);

  }
  // platforms
  platforms(){
    
      this.StaticPlatforms([0.5, 0.2, 7 ], [this.x, this.y, this.z+28],[0, 0,0],'singleboard.jpg' );
      this.StaticPlatforms([9, 0.2, 0.8 ], [this.x-2, this.y, this.z+34] ,[0, Math.PI /2.3,0],'doubleboard.jpg');

      this.StaticPlatforms([13, 0.2, 0.7 ], [this.x+1, this.y, this.z+36] ,[-Math.PI/50, Math.PI /2.1,0],'doubleboard.jpg');
      this.StaticPlatforms([15, 0.2, 0.6 ], [this.x, this.y-0.8, this.z+50] ,[0, Math.PI/2,0],'doubleboard.jpg');
      this.StaticPlatforms([12, 0.2, 0.4 ], [this.x+5, this.y-0.8, this.z+45] ,[0, Math.PI /2.1,0],'singleboard.jpg');
      this.StaticPlatforms([11, 0.2, 0.7 ], [this.x-7, this.y-0.1, this.z+48] ,[0, Math.PI /2.4,0],'doubleboard.jpg');

      this.StaticPlatforms([10, 0.2, 0.9 ], [this.x+1, this.y, this.z+55] ,[Math.PI/12, Math.PI /2.3,0],'doubleboard.jpg');
      this.StaticPlatforms([13, 0.2, 0.3 ], [this.x-2, this.y-0.6, this.z+60] ,[-Math.PI/50, Math.PI /2.,0],'singleboard.jpg');
      this.StaticPlatforms([8, 0.2, 0.4 ], [this.x+8, this.y-0.5, this.z+62] ,[0, Math.PI /2.2,0],'singleboard.jpg');
      this.StaticPlatforms([1, 0.2, 0.7 ], [this.x-7, this.y-0.9, this.z+67] ,[-Math.PI /7, 0,0],'doubleboard.jpg');

      this.StaticPlatforms([13, 0.2, 0.6 ], [this.x+8, this.y, this.z+70] ,[0, -Math.PI/2.3,0],'doubleboard.jpg');
      this.StaticPlatforms([13, 0.2, 0.5 ], [this.x-2, this.y, this.z+73] ,[0, Math.PI /2.2,0],'singleboard.jpg');
      this.StaticPlatforms([14, 0.2, 0.7 ], [this.x-7, this.y-0.5, this.z+77] ,[0, Math.PI /2.6,0],'doubleboard.jpg');
      this.StaticPlatforms([14, 0.2, 0.5 ], [this.x+8, this.y-0.3, this.z+80] ,[-Math.PI/70, Math.PI/2,0],'singleboard.jpg');
      this.StaticPlatforms([9, 0.2, 0.6 ], [this.x-4, this.y, this.z+83] ,[0, Math.PI/2,0],'doubleboard.jpg');
      this.StaticPlatforms([11.5, 0.2, 0.5 ], [this.x-2, this.y, this.z+85] ,[0, Math.PI /3,0],'singleboard.jpg');

  }
      
    StaticPlatforms(scale,position,rotation, file){ 
      const texture = this.texture.load('./assets/Corridor/' + file);
      const maxAnisotropy = this.renderer.capabilities.getMaxAnisotropy();
      texture.anisotropy = maxAnisotropy;
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.encoding = THREE.sRGBEncoding;
      let params = { 
          scale: {x:scale[0], y:scale[1], z: scale[2]},
          mass: 0,
          position: position,
          rotation: {x:rotation[0], y:rotation[1],z:rotation[2]},
          material: new THREE.MeshStandardMaterial({map: texture, color: 0x404040, wireframe: false})
      }
      this.platform = new Box(params);
      this.platform.mesh.receiveShadow = true;
      this.platform.mesh.castShadow = true;
      this.world.addBody(this.platform.body);
      this.scene.add(this.platform.mesh);
    }
    addLightbulb(translation){
      let params ={
        radius: 0.6,
        position : {x: translation[0], y: translation[1], z:translation[2]},
        material: new THREE.MeshStandardMaterial({color: 0xff4d6, emissive:0xfff4d6 ,wireframe: false}),
        mass:0
      }
      this.Sphere = new Sphere(params);
      this.world.addBody(this.Sphere.body);
      this.scene.add(this.Sphere.mesh);
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
  //    this.light2.intensity = Math.sin(Date.now()/200);
      this.light2.distance = 17- Math.sin(Date.now()/300)*13;

    //  this.light3.intensity = Math.sin(Date.now()/300);
      this.light3.distance = 17 - Math.sin(Date.now()/200)*13;
    }

}