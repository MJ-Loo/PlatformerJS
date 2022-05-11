import * as THREE from 'three';
export class RitualRoom{
    constructor(scene, renderer){
      this.scene = scene;
      this.renderer = renderer;
    }

    initialize_ritualroom(){
      this.initialize_floor();
 
      this.initialize_walls('RRWallCentre.jpg',[0, 45, -75],0); // 
      this.initialize_walls('RRWallLeft.jpg',[-70, 45, 0], -Math.PI / 2);
      this.initialize_walls('RRWallRight.jpg',[70, 45, 0], Math.PI / 2);
    }

    initialize_floor()  {
        const texture = new THREE.TextureLoader();
        const RRfloor = texture.load('./assets/RitualRoom/RRfloor.jpg');
        const maxAnisotropy = this.renderer.capabilities.getMaxAnisotropy();
        RRfloor.anisotropy = maxAnisotropy;

        RRfloor.wrapS = THREE.RepeatWrapping;
        RRfloor.wrapT = THREE.RepeatWrapping;
      
        RRfloor.encoding = THREE.sRGBEncoding;
    
        // plane is the ground 
        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(150, 150, 10, 10),
            new THREE.MeshBasicMaterial({map: RRfloor}));
        plane.castShadow = false;
        plane.rotation.x = -Math.PI / 2;
        plane.receiveShadow = true;
        this.scene.add(plane);
      } 

    initialize_walls(wallFile,translation =[0,0,0],rotation) {
        const texture = new THREE.TextureLoader();
        const walltexture = texture.load('./assets/RitualRoom/' + wallFile);  
        const wall = new THREE.Mesh(
          new THREE.BoxGeometry(150, 90, 4),
          new THREE.MeshBasicMaterial({map: walltexture})); 
        wall.castShadow = true;
        wall.receiveShadow = true;
        this.scene.add(wall);
        wall.rotation.y = rotation;
        wall.position.set(translation[0], translation[1], translation[2]);
        }         
}