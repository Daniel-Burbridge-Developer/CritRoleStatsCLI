import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Can't get this to work with the import statement, so I'm using require for now. -- ES6????????
//const { getRollDistributor } = require('./rollFactory');
import { getRollDistributor } from './rollFactory';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
camera.position.z = 5;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load the model
const loader = new GLTFLoader();
loader.load('/dice/d20.glb', function (gltf) {
    scene.add(gltf.scene);
}, undefined, function (error) {
    console.error(error);
});

// The model I'm using needs a directional light - probably requires a fix
const directionalLightTop = new THREE.DirectionalLight(0xffffff, 5);
directionalLightTop.position.set(0, 10, 0);

const directionalLightLeft = new THREE.DirectionalLight(0xffffff, 5);
directionalLightLeft.position.set(10, 0, 0);

const directionalLightRight = new THREE.DirectionalLight(0xffffff, 5);
directionalLightRight.position.set(-10, 0, 0);

const directionalLightBottom = new THREE.DirectionalLight(0xffffff, 5);
directionalLightBottom.position.set(0, -10, 0);

const directionalLightFront = new THREE.DirectionalLight(0xffffff, 5);
directionalLightFront.position.set(0, 0, 10);

const directionalLightBack = new THREE.DirectionalLight(0xffffff, 5);
directionalLightBack.position.set(0, 0, -10);

scene.add(directionalLightTop);
scene.add(directionalLightLeft);
scene.add(directionalLightRight);

// Render the scene
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

// Placed in a function to keep it seperate from 3js code for now while I work it out.
const rollData = () => {
const vmRollDistributor = getRollDistributor('data/Vox_Machina_Campaign_All_Rolls.csv');
const mnRollDistributor = getRollDistributor('data/Mighty_Nein_Campaign_All_Rolls.csv');

const vmAllRolls = vmRollDistributor.getRolls();
const vmCritRolls = vmRollDistributor.getCritRolls();

const mnAllRolls = mnRollDistributor.getRolls();
const mnCritRolls = mnRollDistributor.getCritRolls();

console.log(`There are ${vmAllRolls.length} rolls in the VM data set.`);
console.log(`There are ${vmCritRolls.length} crits in the VM data set.`);

console.log(`There are ${mnAllRolls.length} rolls in the MN data set.`);
console.log(`There are ${mnCritRolls.length} crits in the MN data set.`);
}
