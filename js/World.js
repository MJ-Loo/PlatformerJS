import * as THREE from 'three';
import { Cameras } from './Cameras.js';
import { Lighting } from './Lighting.js';
import { Models } from './Models.js';
import { Controls } from './Controls.js';
import { RitualRoom } from './ritualroom.js';
import { Floor } from './objects/Floor.js';

export class World{

    constructor(document, window){
        this.document = document;
        this.window = window;
    }

    display(){
        // initialize render
        let renderer = new THREE.WebGLRenderer();
        renderer.setSize(this.window.innerWidth, this.window.innerHeight);
        this.document.body.appendChild(renderer.domElement);

        // initialze scene
        let scene  = new THREE.Scene();

        //MAKING CAMS
        let cameras = new Cameras(this.window, scene);
        let camera = cameras.perspectiveCamera();
        this.viewPortUpdate(camera, renderer); // updates window when resized

        //MAKING LIGHTS
        let lighting = new Lighting();
        let light = lighting.ambientLight();
        
        //CONTROLS
        let controls = new Controls( camera );
        controls.initialize();

        // DRAW AXIS
        this.drawAxis(scene);

        //MAKING MODELS
        let models = new Models(scene);
        let floor = new Floor(scene,renderer);
        floor.initialize_floor();
        // ADDING RITUAL ROOM INTO SCENE
        //let ritualroom = new RitualRoom(scene, renderer)

        // MAKING SKY BOX
        this.drawSkyBox(scene);
        
        
        //ADDING OBJECTS TO SCENE
        scene.add(camera);
        scene.add(light);
       
        //ritualroom.initialize_ritualroom()

        //game logic
        let prevTime = performance.now();
        var update = function(){
            const time = performance.now();
            controls.update(time, prevTime);
            prevTime = time;
        };
        //draw scene
        var render = function(){
            renderer.render(scene,camera);

        }
    
        //run game loop
        var GameLoop = function(){
            requestAnimationFrame(GameLoop);
            update();
            render();
        };
        GameLoop();
    }

    viewPortUpdate(camera, renderer){
        this.window.addEventListener( 'resize', function() {
            let width = this.window.innerWidth;
            let height = this.window.innerHeight;
            renderer.setSize( width, height );
            camera.aspect = width/height;
            camera.updateProjectionMatrix();
        });
    }

    drawAxis(scene){
        // x
        const materialX = new THREE.LineBasicMaterial( { color: 0xff0000 } );
        const pointsX = [];
        pointsX.push( new THREE.Vector3( -100000, 0, 0 ) );
        pointsX.push( new THREE.Vector3( 100000, 0, 0 ) );
    
        const geometryX = new THREE.BufferGeometry().setFromPoints( pointsX );
        const lineX = new THREE.Line( geometryX, materialX );
    
        scene.add( lineX );
        // y
        const materialY = new THREE.LineBasicMaterial( { color: 0x00ff00 } );
        const pointsY = [];
        pointsY.push( new THREE.Vector3( 0, -100000, 0 ) );
        pointsY.push( new THREE.Vector3( 0, 100000, 0 ) );
    
        const geometryY = new THREE.BufferGeometry().setFromPoints( pointsY );
        const lineY = new THREE.Line( geometryY, materialY );
    
        scene.add( lineY );
        // z
        const materialZ = new THREE.LineBasicMaterial( { color: 0x0000ff } );
        const pointsZ = [];
        pointsZ.push( new THREE.Vector3( 0, 0, -100000 ) );
        pointsZ.push( new THREE.Vector3( 0, 0, 100000 ) );
    
        const geometryZ = new THREE.BufferGeometry().setFromPoints( pointsZ );
        const lineZ = new THREE.Line( geometryZ, materialZ );
    
        scene.add( lineZ );
    }
    drawSkyBox(scene){
        const loader = new THREE.CubeTextureLoader(); 
        const texture = loader.load([
          './assets/skybox/posx.jpg',
          './assets/skybox/negx.jpg',
          './assets/skybox/posy.jpg',
          './assets/skybox/negy.jpg',
          './assets/skybox/posz.jpg',
          './assets/skybox/negz.jpg',
          ]);
         scene.background = texture;
    }
}