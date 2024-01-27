export class Roll {
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

    isCrit() {
        return this.crit;
    }

    getCharacter() {
        const characterString = this.character.split(' ').join('-');
        return characterString.toLowerCase();
    }

    addClassToDie() {
        this.die.classList.add(this.getCharacter());
        if (this.isCrit()) {
            this.die.classList.add('is-crit')
        }
    }

    addTextToDie() {
        const text = document.createElement('p');
        text.innerText = this.totalRoll;
        this.die.appendChild(text);
    
    }

    createD20 = () => {
        const d20Element = document.createElement('div');
        d20Element.classList = 'd20';
        d20Element.classList.add('normal')
        d20Element.id = this.rollID;
        this.die = d20Element;
      }
}