const {getRollDistributor} = require('./rollFactory')


const rollDistributor = getRollDistributor('data/Vox_Machina_Campaign_All_Rolls.csv');

const allRolls = rollDistributor.getRolls();
const critRolls = rollDistributor.getCritRolls();

console.log(`There are ${allRolls.length} rolls in the data set.`);
console.log(`There are ${critRolls.length} crits in the data set.`);