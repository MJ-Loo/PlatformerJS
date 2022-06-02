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
    intialize(){
        this.StaticPlatforms([10, 25, 0.2], [this.x, this.y+10, this.z-35] ,[0,0,0],'');
        this.StaticPlatforms([0.2, 25, 10], [this.x-5, this.y+10, this.z-30] ,[0,0,0],'');
        this.StaticPlatforms([0.2, 25, 10], [this.x+5, this.y+10, this.z-30] ,[0,0,0],'');
        this.StaticPlatforms([10, 25, 0.2], [this.x, this.y+20, this.z-25] ,[0,0,0], '');
        this.StaticPlatforms([10, 0.2, 70 ], [this.x, this.y, this.z],[0, 0,0] ,'');
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
}