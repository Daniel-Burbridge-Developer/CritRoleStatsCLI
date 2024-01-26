import * as THREE from 'three';

// Can't get this to work with the import statement, so I'm using require for now. -- ES6????????
//const { getRollDistributor } = require('./rollFactory');
import { getRollDistributor } from './rollFactory';

const main = async () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    const vmRollData = await fetchDataAndLoad('/data/VMROLLS.csv');
    camera.position.z = 5;
    renderer.setSize(window.innerWidthh, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    console.log(vmRollData);

    loadLights(scene);

    const animate = () => {
        requestAnimationFrame(animate);
        spinAllDice();
        renderer.render(scene, camera);
    }

    const spinAllDice = () => {
        scene.traverse(function (child) {
            if (child.isMesh) {
                child.rotation.x += 0.01;
                child.rotation.y += 0.01;
            }
        });
    }

    animate();

}

const fetchDataAndLoad = async (filePath) => {
    try {
        const rollData = await getRollData(filePath);
        return rollData;
    } catch(error) {
        console.error("Error fetching file or loading data", error);
        throw error;
    }
}

const loadLights = (scene) => {
    const directionalLightTop = new THREE.DirectionalLight(0xffffff, 2);
    const directionalLightBottom = new THREE.DirectionalLight(0xffffff, 2);
    const directionalLightLeft = new THREE.DirectionalLight(0xffffff, 2);
    const directionalLightRight = new THREE.DirectionalLight(0xffffff, 2);
    const directionalLightFront = new THREE.DirectionalLight(0xffffff, 2);
    const directionalLightBack = new THREE.DirectionalLight(0xffffff, 2);

    directionalLightTop.position.set(0, 10, 0);   
    directionalLightLeft.position.set(10, 0, 0);
    directionalLightRight.position.set(-10, 0, 0);
    directionalLightBottom.position.set(0, -10, 0);
    directionalLightFront.position.set(0, 0, 10);
    directionalLightBack.position.set(0, 0, -10);

    scene.add(directionalLightTop);
    scene.add(directionalLightLeft);
    scene.add(directionalLightRight); 
    scene.add(directionalLightBottom);
    scene.add(directionalLightFront);
    scene.add(directionalLightBack);
}

// Placed in a function to keep it seperate from 3js code for now while I work it out.

const getRollData = async (filePath) => {
    const RollDistributor = await getRollDistributor(filePath);
    return RollDistributor.getRolls();
}


main();