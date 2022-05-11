import * as THREE from 'three';
import { PointerLockControls } from 'https://unpkg.com/three@0.139.2/examples/jsm/controls/PointerLockControls.js';

export class Controls{
    constructor( camera ){
        this.camera = camera;
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.canJump = false;
        this.direction = new THREE.Vector3();
        this.velocity = new THREE.Vector3();
    }

    initialize(){
        this.controls = new PointerLockControls( this.camera, document.body );
        this.raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

        this.initializeEventListener();
    }

    initializeEventListener(){
        // Get blocker and instuctions from HTML page
        const blocker = document.getElementById( 'blocker' );
        const instructions = document.getElementById( 'instructions' );

        instructions.addEventListener( 'click', () => {

            this.controls.lock();

        } );

        this.controls.addEventListener( 'lock', () => {

            instructions.style.display = 'none';
            blocker.style.display = 'none';

        } );

        this.controls.addEventListener( 'unlock', () => {

            blocker.style.display = 'block';
            instructions.style.display = '';

        } );


        const onKeyDown = (event) => {

            switch ( event.code ) {

                case 'ArrowUp':
                case 'KeyW':
                    this.moveForward = true;
                    break;

                case 'ArrowLeft':
                case 'KeyA':
                    this.moveLeft = true;
                    break;

                case 'ArrowDown':
                case 'KeyS':
                    this.moveBackward = true;
                    break;

                case 'ArrowRight':
                case 'KeyD':
                    this.moveRight = true;
                    break;

                case 'Space':
                    if ( this.canJump === true ) this.velocity.y += 350;
                    this.canJump = false;
                    break;

            }

        };

        const onKeyUp = (event) => {

            switch ( event.code ) {

                case 'ArrowUp':
                case 'KeyW':
                    this.moveForward = false;
                    break;

                case 'ArrowLeft':
                case 'KeyA':
                    this.moveLeft = false;
                    break;

                case 'ArrowDown':
                case 'KeyS':
                    this.moveBackward = false;
                    break;

                case 'ArrowRight':
                case 'KeyD':
                    this.moveRight = false;
                    break;

            }

        };

        document.addEventListener( 'keydown', onKeyDown );
        document.addEventListener( 'keyup', onKeyUp );
    }

    update(time, prevTime){
        if ( this.controls.isLocked === true ) {

            this.raycaster.ray.origin.copy( this.controls.getObject().position );
            this.raycaster.ray.origin.y -= 10;
    
            // const intersections = this.raycaster.intersectObjects( objects, false );
    
            // const onObject = intersections.length > 0;
    
            const delta = ( time - prevTime ) / 1000;
    
            this.velocity.x -= this.velocity.x * 10.0 * delta;
            this.velocity.z -= this.velocity.z * 10.0 * delta;
    
            this.velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
    
            this.direction.z = Number( this.moveForward ) - Number( this.moveBackward );
            this.direction.x = Number( this.moveRight ) - Number( this.moveLeft );
            this.direction.normalize(); // this ensures consistent movements in all directions
    
            if ( this.moveForward || this.moveBackward ) this.velocity.z -= this.direction.z * 400.0 * delta;
            if ( this.moveLeft || this.moveRight ) this.velocity.x -= this.direction.x * 400.0 * delta;
    
            // if ( onObject === true ) {
    
            //     this.velocity.y = Math.max( 0, this.velocity.y );
            //     this.canJump = true;
    
            // }
    
            this.controls.moveRight( - this.velocity.x * delta );
            this.controls.moveForward( - this.velocity.z * delta );
    
            this.controls.getObject().position.y += ( this.velocity.y * delta ); // new behavior
    
            if ( this.controls.getObject().position.y < 10 ) {
    
                this.velocity.y = 0;
                this.controls.getObject().position.y = 10;
    
                this.canJump = true;
    
            }
        }
    }
}