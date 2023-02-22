import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from '../models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit{
  constructor(private router: Router, private firestore: Firestore){}
  ngOnInit(): void {
    
  }
  async newGame() {
    let game = new Game();
    const coll = collection(this.firestore, 'games');
    let gameInfo = await addDoc(coll, {game: game.toJson()})
    .then((gameInfo: any) => {
      this.router.navigateByUrl('/game/' + gameInfo.id);
    });
  }
}
