import * as BABYLON from '@babylonjs/core'
import 'babylon-vrm-loader'


const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
let divFps = document.getElementById("fps");


/******* Add the create scene function ******/
var createScene = function () {

    // Create the scene space
    let scene = new BABYLON.Scene(engine);
    let container = new BABYLON.AssetContainer(scene);


    //Universal camera
    // Parameters : name, position, scene
    //var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 0, -10), scene);

    // Targets the camera to a particular position. In this case the scene origin
    //camera.setTarget(BABYLON.Vector3.Zero());

    // Attach the camera to the canvas
    //camera.attachControl(canvas, true);

    // Add lights to the scene
    //scene.createDefaultCameraOrLight(true, true, true);
    //let light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    //let light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);
    var charList = ["a.vrm", "b.vrm", "c.vrm"];
    console.log(charList.length);
    //let assetsManager = new BABYLON.AssetsManager(scene);
    //for (let i = 0; i < charList.length; i++){
        BABYLON.SceneLoader.Append('/character/', "a.vrm", scene, () => {});
        //BABYLON.SceneLoader.Append("/character/", charList[2], scene, function (container) {
            console.log(charList[1]);
            //var meshes = container.meshes;
            //var materials = container.materials;
            //...
        
            // Adds all elements to the scene
            //
        //});
    //}
    //container.addAllToScene();
    //BABYLON.SceneLoader.Append('/character/', charList, scene, () => {});
    //BABYLON.SceneLoader.Append('/character/', 'b.vrm', scene, () => {});


    return scene;
};
/******* End of the create scene function ******/

let scene = createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
        scene.render();
        //divFps.innerHTML = engine.getFps().toFixed() + " fps";
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
        engine.resize();
});



/*import * as BABYLON from '@babylonjs/core'

// has side-effect
// ref. https://webpack.js.org/guides/tree-shaking#mark-the-file-as-side-effect-free
import 'babylon-vrm-loader'

// vrmFile is File object retrieved by <input type="file">.
const scene = await BABYLON.SceneLoader.LoadAsync('file:', vrmFile, engine);
const vrmManager = scene.metadata.vrmManagers[0];

// Update secondary animation
scene.onBeforeRenderObservable.add(() => {
    vrmManager.update(scene.getEngine().getDeltaTime());
});

// Model Transformation
vrmManager.rootMesh.translate(new BABYLON.Vector3(1, 0, 0), 1);

// Work with HumanoidBone
vrmManager.humanoidBone.leftUpperArm.addRotation(0, 1, 0);

// Work with BlendShape(MorphTarget)
vrmManager.morphing('Joy', 1.0);*/