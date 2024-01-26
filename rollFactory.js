// ES6 breaks this ??????????
// const fs = require('fs');
// const Papa = require('papaparse');

// ES6 Breaks FS too..... I hate ES6 :)
// import fs from 'fs';
import * as THREE from 'three';
import Papa from 'papaparse';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export const getRollDistributor = async (filePath) => {
    try {
        const response = await fetch(filePath);    
        if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.statusText}`)
        }

        const fileData = await response.text();

        // Not entirely sure how destructuring works to be honest, But renaming the data variable to rollData is a weird format. 
        const { data: rollData } = Papa.parse(fileData, { header: true });

        const rd = await new RollDistributor(rollData);
        await rd.init();
        return rd;
    } catch (error) {
        console.error("Error fetching file or generating data", error);
        throw error;
    }
}

// Okay something very very wrong is happening here - but hey, it ends up with a dummyRolls array that is broken, that's fine, and a rolls array that is exactly what I want. Debugged for like 5 hours.
class RollDistributor {
    constructor(rollData) {
        this.dummyRolls = null
        this.rolls = []
        this.rollData = rollData;
    }

    async init() {
        try {
            // Wait for the createDie promise to resolve
            this.rolls = []
            this.dummyRolls = await this.mapRolls(this.rollData);
        } catch (error) {
            console.error('Error creating die:', error);
        }
    }

    async mapRolls(rollData) {
        const promisedRolls = await rollData.map(async (row) => {
            const roll = new Roll(row['RollID'], row['Campaign'], row['Episode'], row['Time'], row['Player'], row['Character'], row['Type of Roll'], row['D20?'], row['Total Roll'], row['Natural Roll'], row['Crit?'], row['Notes']);
            await roll.init()
            this.rolls.push(roll)
        });

        return Promise.all(promisedRolls)
    }

    getRolls() {
        return this.rolls
    }

    getCritRolls() {
        return this.rolls.filter(roll => roll.isCrit());
    }
}

class Roll {
    constructor(rollID, campaign, episode, time, player, character, typeOfRoll, d20, totalRoll, naturalRoll, crit, notes) {
        this.rollID = parseInt(rollID);
        this.campaign = campaign;
        this.episode = parseInt(episode);
        this.time = time;
        this.player = player;
        this.character = character;
        this.type = typeOfRoll;
        this.d20 = d20 === 'Yes';
        this.totalRoll = parseInt(totalRoll) ? parseInt(totalRoll) : 0;
        this.naturalRoll = parseInt(naturalRoll) ? parseInt(naturalRoll) : 0;
        this.crit = crit === 'Yes';
        this.notes = notes;
        this.die = null; // Initialize to null
    }

    async init() {
        try {
            // Wait for the createDie promise to resolve
            this.die = await this.createDie();
            // console.log('Created die for roll: ', this.rollID)
        } catch (error) {
            console.error('Error creating die:', error);
        }
    }

    isCrit() {
        return this.crit;
    }

    // Using a custom mesh is causing all sorts of issues. Revist once the rest of the functionality is working
    // createDie() {
    //     return new Promise((resolve, reject) => {
    //         const loader = new GLTFLoader();
    //         loader.load('/dice/d20.glb', function (gltf) {
    //             resolve(gltf.scene);
    //         }, undefined, function (error) {
    //             reject(error);
    //         });
    //     });
    // }

    createDie() {
        return new Promise((resolve, reject) => {
            const sphereGeometry = new THREE.SphereGeometry(1, 5, 5);
            const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            resolve(sphere);
        });
    }
}

// Apparently using ES6 breaks this????
// module.exports = {
//     getRollDistributor
// };
