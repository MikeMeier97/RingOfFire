import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  game: Game = new Game();
  currentCard: string = 'ace_1';
  constructor() {}
  ngOnInit(): void {}
  takeCard() {
    if (!this.pickCardAnimation) {
      this.pickCardAnimation = true;
      //this.currentCard = this.game.stack.pop();
      setTimeout(() => {
        this.pickCardAnimation = false;
        this.game.playedCards.push(this.currentCard);
      }, 1000);
    }
  }
  newGame() {
    console.log(this.game.stack.pop);
    this.game = new Game();
  }
}
