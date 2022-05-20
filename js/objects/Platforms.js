import * as THREE from 'three';
import {Box} from './Box.js'


export class Platforms{
    constructor(scene, world, renderer){
      this.scene = scene;
      this.world = world;
      this.renderer = renderer;
      this.texture = new THREE.TextureLoader();

    }
    
    createStatic(){
      this.StaticPlatforms([7,1,7],[-7,2,20]);
      this.StaticPlatforms([4,1,4],[5,-1,16]);
      this.StaticPlatforms([5,1,5],[5,0,24]);
      this.StaticPlatforms([6,1,6],[-2,-3,32]);
      this.StaticPlatforms([5,1,5],[-12,0,35]);
      this.StaticPlatforms([5,1,5],[4,1,39]);
      this.StaticPlatforms([5,1,5],[-6,2,49]);
      this.StaticPlatforms([5,1,5],[2,-4,56]);
      this.StaticPlatforms([5,1,5],[5,-4,65]);
      this.StaticPlatforms([5,1,5],[10,-4,90]);
    }

    StaticPlatforms(scale,position){ 
      //const platform_texture = this.texture.load('./assets/RitualRoom/platform_texture.jpg');
     // const maxAnisotropy = this.renderer.capabilities.getMaxAnisotropy();
     // platform_texture.anisotropy = maxAnisotropy;
     // platform_texture.wrapS = THREE.RepeatWrapping;
     // platform_texture.wrapT = THREE.RepeatWrapping;
      //platform_texture.encoding = THREE.sRGBEncoding;
      let params = { 
          scale: {x:scale[0], y:scale[1], z: scale[2]},
          mass: 0,
          position: position,
          rotation: {x:0, y:0,z:0},
          material: new THREE.MeshStandardMaterial({color: 0x404040, wireframe: false})
      }
      this.platform = new Box(params);
      this.platform.mesh.receiveShadow = true;
      this.platform.mesh.castShadow = true;
      this.world.addBody(this.platform.body);
      this.scene.add(this.platform.mesh);
    }
}