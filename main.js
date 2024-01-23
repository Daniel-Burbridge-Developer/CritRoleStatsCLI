const {getRollDistributor} = require('./rollFactory')


const rollDistributor = getRollDistributor('data/Vox_Machina_Campaign_All_Rolls.csv');

const allRolls = rollDistributor.getRolls();
const critRolls = rollDistributor.getCritRolls();

console.log(`There are ${allRolls.length} rolls in the data set.`);
console.log(`There are ${critRolls.length} crits in the data set.`);


// Cannot directly console.log the slice, unsure why - Just Javascript things I guess.
// The Below code is working though as intended though, so I think it's good.
firstTenCrits = critRolls.slice(0, 10);
console.log(firstTenCrits);
console.log(firstTenCrits[0]);