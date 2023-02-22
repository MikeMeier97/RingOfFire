import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  game$: Observable<any>;
  game: Game  = new Game();
  gameId = "";
  constructor(private firestore: AngularFirestore, public dialog: MatDialog, private router: ActivatedRoute) {}
  ngOnInit(): void { 
    this.newGame();
    this.router.params.subscribe((params) => {
      this.gameId = params['id'];
      this.firestore
        .collection('games')
        .doc(this.gameId)
        .valueChanges()
        .subscribe((game: any) => {
        console.log('Update game',game);
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards; 
        this.game.players = game.players; 
        this.game.stack = game.stack; 
        this.game.currentCard = game.currentCard;
        this.game.pickCardAnimation = game.pickCardAnimation;
      });
      });
    }
  takeCard() {
    if (!this.game.pickCardAnimation) {
      this.game.pickCardAnimation = true;
      this.game.currentCard = this.game.stack.pop();
      this.updateGame();
      setTimeout(() => {
        this.game.pickCardAnimation = false;
        this.game.playedCards.push(this.game.currentCard);
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
        this.updateGame();
      }, 1000);
    }
  }
  async newGame() {
    this.game = new Game();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      if(name && name.length > 0) {
        this.game.players.push(name);
        this.updateGame();
      }
    });
  }
async updateGame() {
  this.firestore
  .collection('games')
  .doc(this.gameId)
  .update(this.game.toJson());
}
}
