import { GLTFLoader } from 'https://unpkg.com/three@0.139.2/examples/jsm/loaders/GLTFLoader.js';
import * as CANNON from '../cannon/cannon-es.js'
import * as THREE from 'https://unpkg.com/three@0.140.0/build/three.module.js'

export class Models{
    constructor(){
        // this.scene = _scene
    }
    gltfload(scene,path,translation =[0,0,0],rotation = [0,0,0],scale=[1,1,1]){ //load a gltf model
        let loader = new GLTFLoader();
        loader.load( path, function (gltf) { //Kitchen Cabinet
            console.log(gltf)
            const model = gltf.scene;
            model.scale.set(scale[0], scale[1], scale[2]); //scale vector as proportional to scene x y z vector
            model.position.set( translation[0],translation[1],translation[2]);  //vector of x y z translation
            model.rotation.set(rotation[0],rotation[1],rotation[2]); //vector of x y z rotation
            scene.add(model)
        
        }, function(xhr){
            console.log((xhr.loaded/xhr.total*100)+"% loaded")
        }, function ( error ) {
        
            console.error( error );
        
        } );
    }

}
