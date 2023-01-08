import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent implements OnInit{
  name: string = '';

  ngOnInit(): void {
  }
  constructor(public dialogRef: MatDialogRef<DialogAddPlayerComponent>){}
  onNoClick() {
    this.dialogRef.close();
  }
}
