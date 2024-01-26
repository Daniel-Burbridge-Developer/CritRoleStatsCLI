// ES6 breaks this ??????????
// const fs = require('fs');
// const Papa = require('papaparse');

// ES6 Breaks FS too..... I hate ES6 :)
// import fs from 'fs';
import Papa from 'papaparse';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export const getRollDistributor = async (filePath) => {
    try {
        const response = await fetch(filePath, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'mode': 'no-cors'
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch file: ${response.statusText}')
        }
        const fileData = await response.text();

        // Not entirely sure how destructuring works to be honest, But renaming the data variable to rollData is a weird format. 
        const { data: rollData } = Papa.parse(fileData, { header: true });

        return new RollDistributor(rollData);
    } catch (error) {
        console.error("Error fetching file or generating data", error);
        throw error;
    }
}

class RollDistributor {
    constructor(rollData) {
        this.rolls = null
        this.init();
    }

    async init() {
        try {
            // Wait for the createDie promise to resolve
            this.rolls = await this.mapRolls(rollData);
        } catch (error) {
            console.error('Error creating die:', error);
        }
    }

    async mapRolls(rollData) {
        const rollPromises = rollData.map((row) => {
            return new Roll(row['RollID'], row['Campaign'], row['Episode'], row['Time'], row['Player'], row['Character'], row['Type of Roll'], row['D20?'], row['Total Roll'], row['Natural Roll'], row['Crit?'], row['Notes']);
        });
    
        return Promise.all(rollPromises);
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

        // Going Async
        this.init();
    }

    async init() {
        try {
            // Wait for the createDie promise to resolve
            this.die = await this.createDie();
        } catch (error) {
            console.error('Error creating die:', error);
        }
    }

    isCrit() {
        return this.crit;
    }

    createDie() {
        return new Promise((resolve, reject) => {
            const loader = new GLTFLoader();
            loader.load('/dice/d20.glb', function (gltf) {
                resolve(gltf.scene);
            }, undefined, function (error) {
                reject(error);
            });
        });
    }
}

// Apparently using ES6 breaks this????
// module.exports = {
//     getRollDistributor
// };
