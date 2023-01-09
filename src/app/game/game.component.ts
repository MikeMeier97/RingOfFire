import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collectionData, collection, setDoc, doc, addDoc, docData  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  game$: Observable<any>;
  pickCardAnimation = false;
  game: Game  = new Game();
  currentCard: string = '';
  constructor(private firestore: Firestore, public dialog: MatDialog, private router: ActivatedRoute) {}
  ngOnInit(): void { 
    //this.newGame();
    this.router.params.subscribe((params) => {
      const coll = collection(this.firestore, 'games').doc(params); 
      this.game$ = collectionData(coll); 
      this.game$.subscribe((game) => { 
      });
      });
    }
  takeCard() {
    if (!this.pickCardAnimation) {
      this.pickCardAnimation = true;
      this.currentCard = this.game.stack.pop();
      setTimeout(() => {
        this.pickCardAnimation = false;
        this.game.playedCards.push(this.currentCard);
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      }, 1000);
    }
  }
  async newGame() {
    const coll = collection(this.firestore, 'games');
    let gameInfo = await addDoc(coll, {game: this.game.toJson()})
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      if(name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}
