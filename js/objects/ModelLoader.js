import { GLTFLoader } from 'https://unpkg.com/three@0.139.2/examples/jsm/loaders/GLTFLoader.js';
import * as CANNON from '../cannon/cannon-es.js'
import * as THREE from 'https://unpkg.com/three@0.140.0/build/three.module.js'

export class Models{
    constructor(params, _scene){
        this.params = params;
        const path = params.path;
        const position = params.position;
        const rotation = params.position;
        const scale = params.scale;
        const collision = params.collision;
        const scene = _scene
        this.gltfload(path,position,scale, rotation, scene);

    }
    gltfload(path,position,scale, rotation,scene){ //load a gltf model
        let loader = new GLTFLoader();
        loader.load( path, function (gltf) {
            console.log(gltf)
            const mesh = gltf.scene;
            mesh.scale.set(scale[0], scale[1], scale[2]); //scale vector as proportional to scene x y z vector
            mesh.position.set( position[0],position[1],position[2]);  //vector of x y z translation
            mesh.rotation.set(rotation[0],rotation[1],rotation[2]); //vector of x y z rotation
            scene.add(mesh);
        }, function(xhr){
            console.log((xhr.loaded/xhr.total*100)+"% loaded")
        }, function ( error ) {
        
            console.error( error );
        
        } );
    }

}
