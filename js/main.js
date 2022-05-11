import * as THREE from 'three';
import {World} from './World.js'

// ==== FPS counter ====
(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()
// ==== *********** ====

var camera, controls, scene, renderer;
const clock = new THREE.Clock();

init();

function init(){
    let world = new World(document,window)
    scene = world.display()
    
    
    
    // camera = world.getCamera();
    // console.log(camera)
    // //Camera
    // // scene = new THREE.Scene();
    // // camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);


    // //Renderer
    // renderer = new THREE.WebGLRenderer();
    // renderer.setSize(window.innerWidth,window.innerHeight)
    // document.body.appendChild(renderer.domElement);


    // //Controls
    // controls = new FirstPersonControls( camera, renderer.domElement );
    // controls.movementSpeed = 1000;
    // controls.lookSpeed = 0.125;
    // controls.lookVertical = true;

    // //Models
    // const loader = new GLTFLoader();
    // loader.load( 'assets/old_kitchen_cabinets/scene.gltf', function ( gltf ) { //Kitchen Cabinet

        
    //     console.log(gltf)
    //     const cabinet = gltf.scene;
    //     cabinet.scale.set(1*gltf.scene.scale.x, 1*gltf.scene.scale.y, 1 * gltf.scene.scale.z);
    //     cabinet.position.set(0,0.05,-0.2);
    //     cabinet.rotation.set(0,1,0);
    //     scene.add( cabinet );

    // }, function(xhr){
    //     console.log((xhr.loaded/xhr.total*100)+"% loaded")
    // }, function ( error ) {

    //     console.error( error );

    // } );

    // const light = new THREE.DirectionalLight(0xffffff,5)
    // light.position.set(2,2,15)
    // scene.add(light)

    // //game logic
    // var update = function(){

    // };

    // //draw scene
    // var render = function(){
    //     renderer.render(scene,camera);
    // }

    // //run game loop
    // var GameLoop = function(){
    //     requestAnimationFrame(GameLoop);
    //     update();
    //     render();
    // };
    // GameLoop();
}
        
    