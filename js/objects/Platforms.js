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
      
      
      //Level 2 start
      //this.StaticPlatforms([16, 1, 500], [30, -1, 100]); //debug platform too lazy to do level 1
      //this.StaticPlatforms([1, 1, 50], [10, -4, 50]); //debug platform

      this.StaticPlatforms([9, 1, 5], [12, -1, 100]);
      this.StaticPlatforms([11, 8, 9.5], [12, 2, 110.25]); //front wall
      this.StaticPlatforms([1, 14, 20], [7, 0, 105]);//right side wall
      this.StaticPlatforms([1, 14, 20], [17, 0, 105]);//left side wall
      this.StaticPlatforms([11, 21, 1], [12, -12, 98]); //back wall
      this.StaticPlatforms([11, 1, 20], [12, -7, 108]); //level floor
      this.StaticPlatforms([11, 1, 100], [12, -2, 156]); //ceiling
      this.StaticPlatforms([1, 20, 111], [17, -12, 154]); //corridor (left)
      this.StaticPlatforms([1, 20, 111], [7, -12, 154]); //corridor (right)
      this.StaticPlatforms([11, 1, 111], [12, -22, 154]); //floor (void)
      this.StaticPlatforms([11, 20.5, 1], [12, -12.25, 210]); //end wall

      this.StaticPlatforms([0.3, 0.5, 10], [13, -7, 120]); //first platform
      this.StaticPlatforms([2, 0.5, 0.3], [12, -7, 125]);
      this.StaticPlatforms([0.3, 0.5, 3], [11, -7, 127]);
      this.StaticPlatforms([1, 0.5, 0.1], [11, -7, 130]);
      this.StaticPlatforms([0.2, 0.4, 17], [14, -7, 137]);
      this.StaticPlatforms([5, 0.4, 0.2], [12, -6, 135]);
      this.StaticPlatforms([5, 0.4, 0.2], [12, -6, 145]);
      this.StaticPlatforms([3, 0.2, 0.1], [14, -7, 150]);
      this.StaticPlatforms([0.1, 0.2, 20], [11, -6, 155]);
      this.StaticPlatforms([0.1, 0.2, 14], [15, -7, 158]);
      this.StaticPlatforms([8, 0.2, 0.1], [12, -6, 165]);
      this.StaticPlatforms([0.01, 0.01, 20], [12, -6, 175]);
      this.StaticPlatforms([5, 1, 25], [12, -6, 196]);
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