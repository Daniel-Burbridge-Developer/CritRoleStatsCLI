const fs = require('fs');
const Papa = require('papaparse');

const getRollDistributor = (filePath) => {
    const fileData = fs.readFileSync(filePath, 'utf8');

    // Not entirely sure how destructuring works to be honest, But renaming the data variable to rollData is a weird format. 
    const { data: rollData } = Papa.parse(fileData, { header: true });
    return new RollDistributor(rollData);
};

class RollDistributor {
    constructor(rollData) {
        this.rolls = this.mapRolls(rollData);
    }

    mapRolls(rollData) {
        return rollData.map((row) => { 
            return new Roll(row['RollID'], row['Campaign'], row['Episode'], row['Time'], row['Player'], row['Character'], row['Type of Roll'], row['D20?'], row['Total Roll'], row['Natural Roll'], row['Crit?'], row['Notes']);
        });
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
        this.rollID = parseInt(rollID),
        this.campaign = campaign;
        this.episode = parseInt(episode);
        this.time = time;
        this.player = player;
        this.character = character;
        this.type = typeOfRoll;
        this.d20 = d20 === 'Yes';
        this.totalRoll = parseInt(totalRoll) ? parseInt(totalRoll) : 0,
        this.naturalRoll = parseInt(naturalRoll) ? parseInt(naturalRoll) : 0,
        this.crit = crit === 'Yes';
        this.notes = notes;
    }

    isCrit() {
        return this.crit;
    }
}

module.exports = {
    getRollDistributor
};
