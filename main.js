import { getRolls } from "./rollParser";
import './styles.css';

const main = async () => {
    const vmRolls = await getRollsFromCSVFile('/data/VMROLLS.csv');
    const mnRolls = await getRollsFromCSVFile('/data/MNROLLS.csv');
    const rolls = [...vmRolls, ...mnRolls]
    for (const roll of rolls) {
        document.getElementById('d20-container').appendChild(roll.die);
    }

}

const getRollsFromCSVFile = async (filePath) => {
    return await getRolls(filePath)
}


main();