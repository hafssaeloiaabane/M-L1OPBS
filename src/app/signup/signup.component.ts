import { MyActions } from './../store/actions';
import { select } from 'ng2-redux';
import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialog } from '@angular/material';
import { AlertBoxComponent } from '../alert-box/alert-box.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  index: number;
  constructor(
    private angularFire: AngularFire,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private actions: MyActions,
    public dialog: MdDialog
  ) {}

  SignUp(value) {
    // 'signup' action dispatched from redux
    this.actions.signUp(value.emlid);

    this.angularFire.auth.createUser(
      {email: value.emlid, password: value.pcode}
    );

    let firstChar = value.uname.charAt(0); // get 1st char of name
    let capitalize = firstChar.toUpperCase(); // transformed into upperCase
    let uname = value.uname.replace(firstChar, capitalize); // replaced first char of name
    let space = uname.indexOf(' '); // get first name
    let firstname = uname.slice(0, space); // extract first name with 1st letter capital
    //console.log(firstname);  

    // dialog box used as alert msg
    let data = ` Hi ${firstname}, Welcome! `;
    this.dialog.open(AlertBoxComponent, {data});

    this.router.navigate(['dashboard']);
  }

}
