import { getRolls } from "./rollParser";
import './styles.css';

const main = async () => {
    const vmRolls = await getRollsFromCSVFile('/data/VMROLLS.csv');
    console.log(vmRolls);

    for (const roll of vmRolls) {
        document.getElementById('d20-container').appendChild(roll.die);
    }

}

const getRollsFromCSVFile = async (filePath) => {
    return await getRolls(filePath)
}


main();