import { SceneManager } from "./js/SceneManager.js";

const platformerGame = new SceneManager(); // create new game and allocate required resources
platformerGame.onWindowResize(); // dynamic window size
platformerGame.loadScene(); // load level (currently one loads first level)

render(); // render to screen
function render(){
    requestAnimationFrame(render);
    platformerGame.update();
}