import Papa from 'papaparse';

export const getAllRolls = async (filePath) => {
    try {
        const response = await fetch(filePath);    
        if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.statusText}`)
        }

        const fileData = await response.text();
        const { data: rollData } = Papa.parse(fileData, { header: true });

        const rd = await new RollDistributor(rollData);
        await rd.init();
        return rd;
    } catch (error) {
        console.error("Error fetching file or generating data", error);
        throw error;
    }
}

class RollDistributor {
    constructor(rollData) {
        this.dummyRolls = null
        this.rolls = []
        this.rollData = rollData;
    }

    async init() {
        try {
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
        this.die = null;
    }

    async init() {
    }

    isCrit() {
        return this.crit;
    }

    createDie() {
   }
}