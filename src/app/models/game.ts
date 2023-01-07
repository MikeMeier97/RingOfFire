export class Game {
    public players: string[] = ['Hans', 'Peter', 'Freddy']; 
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0; 

    constructor() {
        for(let i = 0; i < 14; i++) {
            this.stack.push('spade_'+ i);
            this.stack.push('hearts_'+ i);
            this.stack.push('clubs_'+ i);
            this.stack.push('diamonds_'+ i);
        }
        shuffle(this.stack);
        shuffle(this.stack);
    }
}

function shuffle(array: string[]) {
    var currentIndex = array.length, temporaryValue, randomIndex; 
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1; 
        temporaryValue = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array; 
}