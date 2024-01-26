import * as THREE from 'three';
import { getRollDistributor } from './rollFactory';

const main = async () => {

    const vmRollData = await fetchDataAndLoad('/data/VMROLLS.csv');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    scene.background = new THREE.Color(0x000000);
    camera.position.z = 80;


    console.log("Let the rendering begin! ... please.")
    // vmRollData[0].die.material = critMaterial;
    // console.log(vmRollData[0].die);

    let xpos = -115
    let ypos = 60

    for (let i = 0; i < vmRollData.length; i++) {
        xpos += 5
        scene.add(vmRollData[i].die);

        if (i % 47 === 0) {
            xpos = -115
            ypos -= 5
        }

        vmRollData[i].die.position.x = xpos;
        vmRollData[i].die.position.y = ypos;
    }

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




    // updateColorsIfCrit(vmRollData);
    updateColorsByCharacter(vmRollData);


    animate();

}

const updateColorsIfCrit = (rollData) => {
    const critMaterial = new THREE.MeshBasicMaterial({ color: 0xffd700 });
    
    for (let i = 0; i < rollData.length; i++) {
        if (rollData[i].crit) {
            rollData[i].die.material = critMaterial;
        }
    }
}

const updateColorsByCharacter = (rollData) => {
    const vexMaterial = new THREE.MeshBasicMaterial({ color: 0x006400 });
    const vaxMaterial = new THREE.MeshBasicMaterial({ color: 0x228b22 });
    const percyMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const grogMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const scanlanMaterial = new THREE.MeshBasicMaterial({ color: 0x800080 });
    const pikeMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });
    const taryMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff });
    const keylethMaterial = new THREE.MeshBasicMaterial({ color: 0x006455 });
    const tiberiusMaterial = new THREE.MeshBasicMaterial({ color: 0xffa500 });

    for (let i = 0; i < rollData.length; i++) {
        if (rollData[i].character === 'Vex') {
            rollData[i].die.material = vexMaterial;
        } else if (rollData[i].character === 'Vax') {
            rollData[i].die.material = vaxMaterial;
        } else if (rollData[i].character === 'Percy') {
            rollData[i].die.material = percyMaterial;
        } else if (rollData[i].character === 'Grog') {
            rollData[i].die.material = grogMaterial;
        } else if (rollData[i].character === 'Scanlan') {
            rollData[i].die.material = scanlanMaterial;
        } else if (rollData[i].character === 'Pike') {
            rollData[i].die.material = pikeMaterial;
        } else if (rollData[i].character === 'Tary') {
            rollData[i].die.material = taryMaterial;
        } else if (rollData[i].character === 'Keyleth') {
            rollData[i].die.material = keylethMaterial;
        } else if (rollData[i].character === 'Tiberius') {
            rollData[i].die.material = tiberiusMaterial;
        }
    }

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