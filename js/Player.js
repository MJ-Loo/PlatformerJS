import * as CANNON from './cannon/cannon-es.js'
import { PointerLockControlsCannon } from './cannon/PointerLockControlsCannon.js'
import * as THREE from 'three';

export class Player{
    constructor(params){
      this.camera = params.camera;
      this.initializeSpotlight();
      this.initializeBody();
  }
  
  initializeSpotlight()
  {
    //torch initially turned off
    this.spotlight = new THREE.SpotLight(0xffffff, 5, 30, Math.PI * 0.1,0.4, 0.2);
    this.spotlight.visible = false;
    this.spotlight.castShadow = true; 
    this.camera.add(this.spotlight);
    this.camera.add(this.spotlight.target);
    this.spotlight.target.position.z = -2;
    this.spotlight.target.position.y = 2;
    this.spotlight.position.y = 1;  
  }

    initializeBody(){ // creates a sphere that acts as the body for the player (for collisions)
        this.radius = 1.3;
        this.bodyShape = new CANNON.Sphere(this.radius);
        this.physicsMaterial = new CANNON.Material('physics');
        this.body = new CANNON.Body({ mass: 5, material: this.physicsMaterial });
        this.body.addShape(this.bodyShape);
        this.body.position.set(-15, 3, 20);
        this.body.linearDamping = 0.9;
        this.initPointerLock();
    }

    initPointerLock() {
        this.controls = new PointerLockControlsCannon(this.camera, this.body);

        instructions.addEventListener('click', () => {
          this.controls.lock();
        })

        this.controls.addEventListener('lock', () => {
          this.controls.enabled = true;
          instructions.style.display = 'none';
        })

        this.controls.addEventListener('unlock', () => {
          this.controls.enabled = false;
          instructions.style.display = null;
        })
    }
    returnBody(){
      return this.body;
    }

    setPosition(position){
        this.body.position.set(position.x, position.y, position.z);
    }

    update(dt){
        //Restart level when player has fallen to y=-30
      if (this.body.position.y<-20) {
          this.setPosition({x: -15, y: 3, z: -20})
          console.log("you lose!")
      }

      //region for level 2 the player needs torch
      if (!(this.body.position.z < 135 || this.body.position.z > 210)) {
        this.spotlight.visible = true;
        // death conditions being updated for level two
        if (this.body.position.y<6.5 ) {
          this.setPosition({x: -15, y: 3, z: -20})
          console.log("you lose!")
      }
      }
      else {
        this.spotlight.visible = false;
      }
            //x: -9.882986550780156, y: 16.397082007847693, z: 131.4130829308037 }
       
      
      
      console.log(this.body.position);
        this.controls.update(dt);
    }
}