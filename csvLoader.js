const fs = require('fs');
const Papa = require('papaparse');

const loadCSV = () => {
    const filePath = 'data/Vox_Machina_Campaign_All_Rolls.csv';
    const fileData = fs.readFileSync(filePath, 'utf8');
    const { data } = Papa.parse(fileData, { header: true });
    
    
    const rolls = data.map((row) => {
        // Convert each row into a roll object
        // Headers: RollID, Campaign, Episode, Time, Player, Character, Type of Roll, D20?, Total Roll, Natural Roll, Crit?, Notes
        return {
            rollID: parseInt(row.RollID),
            campaign: row.Campaign,
            episode: parseInt(row.Episode),
            time: row.Time,
            player: row.Player,
            character: row.Character,
            typeOfRoll: row['Type of Roll'],
            d20: row['D20?'] === 'Yes',
            totalRoll: parseInt(row['Total Roll']) ? parseInt(row['Total Roll']) : 0,
            naturalRoll: parseInt(row['Natural Roll']) ? parseInt(row['Natural Roll']) : 0,
            crit: row['Crit?'] === 'Yes',
            notes: row.Notes
        };
    });

    return rolls;
};



module.exports = {
    loadCSV
};
