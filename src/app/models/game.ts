export class Game {
    public players: string[] = []; 
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0; 

    constructor() {
        for(let i = 1; i < 14; i++) {
            this.stack.push('ace_'+ i);
            this.stack.push('hearts_'+ i);
            this.stack.push('clubs_'+ i);
            this.stack.push('diamonds_'+ i);
        }
        /**
         * mix the cards
         */
        for(let j = 0; j < 10; j++){
            shuffleArray(this.stack);
        }
    }
}
 
function shuffleArray(inputArray){
    inputArray.sort(()=> Math.random() - 0.5);
}