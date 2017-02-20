import { MyActions } from './../store/actions';
import { select } from 'ng2-redux';
import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router, ActivatedRoute } from '@angular/router';

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
    private actions: MyActions
  ) {}

  SignUp(value) {
    // 'signup' action dispatched from redux
    this.actions.signUp(value.emlid);

    this.angularFire.auth.createUser(
      {email: value.emlid, password: value.pcode}
    );

    let firstChar = value.uname.charAt(0);
    let capitalize = firstChar.toUpperCase();
    let uname = value.uname.replace(firstChar, capitalize);
    // console.log(value.uname, uname);

    alert(` Hi ${uname}, Welcome! `);
    this.router.navigate(['dashboard']);
  }

}
