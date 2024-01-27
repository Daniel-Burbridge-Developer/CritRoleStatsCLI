import Papa from 'papaparse';
import { Roll } from './Roll';
import './styles.css';

export const getRolls = async (filePath) => {
    const data = await readRollDataFromCSVFile(filePath)
    const rolls = await parseRollData(data);
    attachDieToRolls(rolls);
    return rolls;

}

const readRollDataFromCSVFile = async (filePath) => {
    try {
        const response = await fetch(filePath);    
        if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.statusText}`)
        } 
        return response.text();
    } catch (error) {
        console.error("Error reading data from CSV file", error);
        throw error;
    }
}

const parseRollData = async (csvRollText) => {
    try {
        const { data } = await Papa.parse(csvRollText, { header: true });
        const rolls = data.map((row) => {
            const roll = new Roll(row['RollID'], row['Campaign'], row['Episode'], row['Time'], row['Player'], row['Character'], row['Type of Roll'], row['D20?'], row['Total Roll'], row['Natural Roll'], row['Crit?'], row['Notes']);
            return roll;
        });
        return rolls;
    } catch (error) {
        console.error("Error parsing and creating rolls from CSV data", error);
        throw error;
    }
}

const attachDieToRolls = (rolls) => {

    for (let i = 0; i < rolls.length; i++) {
        rolls[i].createD20();
        rolls[i].addClassToDie();
        rolls[i].addTextToDie();
        const myDiv = rolls[i].die;
        const childElement = myDiv.getElementsByTagName('p')[0];
        myDiv.addEventListener('click', () => {
            if (childElement.innerText == rolls[i].totalRoll) {
                childElement.innerText = rolls[i].naturalRoll;
            } else {
            childElement.innerText = rolls[i].totalRoll;
            }
        });
    }

    return rolls;
}

