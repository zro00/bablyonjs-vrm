import * as BABYLON from '@babylonjs/core'
import 'babylon-vrm-loader'
//import * as PHASER from 'phaser'
//import { Camera } from '@babylonjs/core';

'use strict';
const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
let charList = ["a.vrm"];//, "b.vrm", "c.vrm", "d.vrm"];
let divFps = document.getElementById("fps");


//update later if needed for multiple cameras
/*const cameraType = {
	"Universal"

}*/

function createScene() {
    // This creates a basic Babylon Scene object (non-mesh)
	let scene = new BABYLON.Scene(engine);
	//assetsManager.load();*/
	return scene;
}

function createLight(scene){
	// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
	let light = new BABYLON.DirectionalLight("light", new BABYLON.Vector3(0.3, -1, 0.3), scene);
	//let light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3.Zero(), scene);
	return light;

}

function createAssetManager(scene, charList){
	//create assetManager to load all the assets for a particular scene
	let assetsManager = new BABYLON.AssetsManager(scene);

    // Our built-in 'ground' shape.
    //var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);

	
	//console.log(charList.length);
	//load all the meshes from char list and queue them uo for the asset manager to add to the scene upon load
	let meshTaskList = [];
	//let tempTask;
	let aniManager = [];

	for (let character of charList){
	
		//tempTask = assetsManager.addMeshTask("name: " + character, "", "/character/", character);
		/*/tempTask.onSuccess = (task) => {
			//console.log(task.name);
			task.loadedMeshes.setPositionWithLocalVector(new BABYLON.Vector3(0.0,0.0,0.0));
			aniManager.push(task.metadata.vrmManagers[0]);*/
		//meshTaskList.push(tempTask);
		//assetsManager.addMeshTask("name: " + character, "", "/character/", character)
		meshTaskList.push(assetsManager.addMeshTask("name: " + character, "", "/character/", character));

		//BABYLON.SceneLoader.Append("/character/", character, scene, () => {});
	}
	//return aniManager;
	return [assetsManager, meshTaskList];
	
}

function createCamera(scene, canvas, cameraType = "uni", cameraPerspective = "ot"){
	
	let camera;
	if (cameraType === "uni") {
		// This creates and positions a free camera (non-mesh)
		//camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0.0, 0.0, 0.0), scene);
		camera = new BABYLON.ArcRotateCamera("ArcCamera", -Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0, 1.0, 0), scene);

		// This targets the camera to scene origin
		//camera.setTarget(new BABYLON.Vector3.Zero());
	}

	if (cameraPerspective === "ort"){
		camera.mode = BABYLON.ORTHOGRAPHIC_CAMERA;
		var ratio = window.innerWidth / window.innerHeight;
		var zoom = camera.orthoTop;
		var newWidth = zoom * ratio;
		camera.orthoLeft = -Math.abs(newWidth);
		camera.orthoRight = newWidth;
		camera.orthoBottom = -Math.abs(zoom);
		/*camera.orthoTop = 10;
		camera.orthoBottom = -10;
		camera.orthoRight = 10;
		camera.orthoLeft = -10;*/
	}
	// This attaches the camera to the canvas
	camera.fov = 1.0;
	camera.attachControl(canvas, true);
	
	camera.rotation = new BABYLON.Vector3(0.0,0.5,0.0);
	return camera;
}

function setPose(manager, deltaTime,num){

	let s = Math.sin( Math.PI * deltaTime ) 
	console.log(deltaTime);

	manager.morphingPreset("lookdown", 1.0*s);
	manager.morphingPreset("lookup", 1.0*s);
	console.log("doing this");
	//manager.morphing("joy",1.0);
}//

function main(){

	let scene = createScene(); //Call the createScene function
	let camera = createCamera(scene, canvas);
	let light = createLight(scene);
	let managerArr = createAssetManager(scene, charList);
	let assetsManager = managerArr[0];
	let taskList = managerArr[1];
	let aniManager, deltaTime;
	

	scene.clearColor = BABYLON.Color3.White();
	/*scene.registerBeforeRender( () => {
		aniManager[pos].update(scene.getEngine().getDeltaTime());
		});*/

	//let ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);
	for (let pos in charList){
		//console.log(taskList[pos].name);
		//console.log(pos);
		taskList[pos].onSuccess = (task) => {
			//console.log(task.name);
			task.loadedMeshes[0].setPositionWithLocalVector(new BABYLON.Vector3(pos,0.0,0.0));
			//aniManager.push(scene.metadata.vrmManagers);
			aniManager = scene.metadata.vrmManagers;
			scene.registerBeforeRender( () => {
				console.log("running");
				deltaTime = scene.getEngine().getDeltaTime();
				//aniManager[pos].update(scene.getEngine().getDeltaTime());
				aniManager[pos].update(deltaTime);
				setPose(aniManager[pos],deltaTime, 1.0);
			});
		
			//aniManager[pos].morphingPreset("a", 1.0);
			
		}; //task.loadedMeshes[num].position = BABYLON.Vector3(0.0,1.0,0.0)
		
		//setPose(aniManager[pos], 5);
	}

	
	window.addEventListener("resize", () => engine.resize());
	assetsManager.onFinish = (tasks)  => {
		//scene.debugLayer.show();
		engine.runRenderLoop(() => scene.render());
	};

	assetsManager.load();

	// Register a render loop to repeatedly render the scene
	/*engine.runRenderLoop(() => {
		scene.render();
		//divFps.innerHTML = engine.getFps().toFixed() + " fps";
	});*/	// Watch for browser/canvas resizeevents
	

}

main();