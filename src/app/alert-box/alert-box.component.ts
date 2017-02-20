import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.css']
})
export class AlertBoxComponent {
  constructor( public dialogRef: MdDialogRef<AlertBoxComponent>) {
    console.log(dialogRef.config.data); // the value passed as input
  }

}
