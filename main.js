import * as THREE from 'three';

// set up the scene, the camera and the renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
const renderer = new THREE.WebGLRenderer();
// attached the renderer to the DOM
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Test Objects setup
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material); 
scene.add(cube);

camera.position.z = 5; 

const animate = () => {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();





























// Put this back at the top once we have a better handle of 3js
const {getRollDistributor} = require('./rollFactory');
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
