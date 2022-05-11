import * as THREE from 'three';
import {World} from './World.js'

// ==== FPS counter ====
(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()
// ==== *********** ====

let scene;

init();

function init(){
    let world = new World(document,window)
    scene = world.display()
}