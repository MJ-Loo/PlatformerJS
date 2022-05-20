import * as CANNON from './cannon/cannon-es.js'
import { PointerLockControlsCannon } from './cannon/PointerLockControlsCannon.js'

export class Player{
    constructor(params){
        this.camera = params.camera;
        this.initializeBody();
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
      
      //console.log(this.body.position);
      this.controls.update(dt);
    }
}