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
    this.spotlight = new THREE.SpotLight(0xffffff, 1, 150, Math.PI * 0.1);
    this.spotlight.visible = false;
    this.camera.add(this.spotlight);
    this.camera.add(this.spotlight.target);
    this.spotlight.target.position.z = -1;
    this.spotlight.target.position.y = 1;
    this.spotlight.position.y = 1;  
  }

    initializeBody(){ // creates a sphere that acts as the body for the player (for collisions)
        this.radius = 1.3;
        this.bodyShape = new CANNON.Sphere(this.radius);
        this.physicsMaterial = new CANNON.Material('physics');
        this.body = new CANNON.Body({ mass: 5, material: this.physicsMaterial });
        this.body.addShape(this.bodyShape);
        this.body.position.set(0, 3, 0);
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

    setPosition(position){
        this.body.position.set(position.x, position.y, position.z);
    }

    update(dt){
        //Restart level when player has fallen to y=-30
        if (this.body.position.y<-20) {
          this.setPosition({x: 0, y: 2, z: 0})
          console.log("you lose!")
        }
        if (this.body.position.z > 210){
          console.log("you win!");
          this.setPosition({x: 0, y: 2, z: 0});
      }
      //region for level 2 the player needs torch
      if (!(this.body.position.z < 110 || this.body.position.z > 190)) {
        this.spotlight.visible = true;
      }
      else {
        this.spotlight.visible = false;
      }
        
        // console.log(this.body.position);
        this.controls.update(dt);
    }
}