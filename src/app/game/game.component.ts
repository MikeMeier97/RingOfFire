import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit{
  pickCardAnimation = false; 
  game: Game = new Game; 
  constructor(){
    console.log(this.game);
  }
  ngOnInit(): void {
    
  }
  takeCard() {
    this.pickCardAnimation = true; 
  }
  newGame() {
    this.game = new Game();
  }
}
