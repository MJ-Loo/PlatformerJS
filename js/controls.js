import * as THREE from 'three';
import { PointerLockControls } from 'https://unpkg.com/three@0.139.2/examples/jsm/controls/PointerLockControls.js';

export class Controls {
    constructor( camera, renderer ){
        this.camera = camera;
        this.renderer = renderer;
        this.initializeControls();
        
        // add eventlisteners
        this.eventListeners();
    }
    
    update(){
        this.controls.moveRight( this.vel[ 'x' ] );
        this.controls.moveForward( this.vel[ 'z' ] );
    }

    initializeControls(){
        this.vel = {
            'x': 0,
            'z': 0
        };
        // Pointer lock controls initialize
        this.controls = new PointerLockControls( this.camera, this.renderer.domElement );
        
        // lock and unlock controls
        this.blocker = document.getElementById( 'blocker' );
        this.menu = document.getElementById( 'menu' );
        
        this.menu.addEventListener( 'click', () => {
            this.controls.lock();
        });
        
        this.controls.addEventListener( 'lock', () => {
            this.menu.style.display = 'none';
            this.blocker.style.display = 'none';
        } );
        
        this.controls.addEventListener( 'unlock', () => {
            this.blocker.style.display = 'block';
            this.menu.style.display = '';
        } );
    }
    
    eventListeners(){
        document.addEventListener( 'keydown',  (event) => {
            if (this.controls.isLocked === false) return;
            switch (event.code) {
                case 'KeyW':
                    this.vel['z'] = 0.5;
                    break;
                case 'KeyA':
                    this.vel['x'] = -0.5;
                    break;
                case 'KeyS':
                    this.vel['z'] = -0.5;
                    break;
                case 'KeyD':
                    this.vel['x'] = 0.5;
                    break;
            }
        });
        document.addEventListener( 'keyup', (event) => {
            switch ( event.code ) {
                case 'KeyW':
                    this.vel['z'] = 0;
                    break;
                case 'KeyA':
                    this.vel['x'] = 0;
                    break;
                case 'KeyS':
                    this.vel['z'] = 0;
                    break;
                case 'KeyD':
                    this.vel['x'] = 0;
                    break;
            }
        });
        document.addEventListener( 'click', (event) => {
            if (this.controls.isLocked === false) return;
            console.log("clicked");
        });
    }
}