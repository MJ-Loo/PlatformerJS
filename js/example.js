import * as CANNON from './cannon/cannon-es.js'
import * as THREE from 'https://unpkg.com/three@0.140.0/build/three.module.js'
import Stats from 'https://unpkg.com/three@0.140.0/examples/jsm/libs/stats.module.js'
import {Box} from './objects/Box.js'
import { Player } from './Player.js';


// stats
let stats = new Stats();
document.body.appendChild(stats.dom);

// renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// camera
const camera = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
    
// scene (threejs)
const scene = new THREE.Scene();

// world (cannonjs) gravity set to -9.81 down
const world = new CANNON.World({gravity: new CANNON.Vec3(0, -9.81, 0)});

// create ground object
let params = { scale: {x: 100, y: 1, z: 100},
                mass: 0,
                material: new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: false})
            }
const ground = new Box(params);
world.addBody(ground.body);
scene.add(ground.mesh);

// create cube object
params = { scale: {x: 5, y: 5, z: 5},
        mass: 1,
        material: new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: false})
    }

const box = new Box(params);
box.setPosition({x: 0, y: 25, z: 0});
world.addBody(box.body);
scene.add(box.mesh);

// create player
params = {
        camera: camera,
        mass: 1
}
const player = new Player(params);
player.setPosition({x: 0, y: 10, z: 20});
world.addBody(player.body);
scene.add(player.controls.getObject());

// update loop
const timeStep = 1 / 60;
let lastCallTime = performance.now() / 1000

function animate() {
    const time = performance.now() / 1000;
    const dt = time - lastCallTime;
    lastCallTime = time;
    
    // update objects position and rotation
    if(player.controls.enabled){
        world.step(timeStep);
        ground.update();
        box.update();
        player.update(dt);
    }

    renderer.render(scene, camera);
    stats.update();
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});