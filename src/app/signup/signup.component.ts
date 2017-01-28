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
    private af: AngularFire,
    private route: Router,
    private ar: ActivatedRoute,
    private a: MyActions
  ) {}

  SignUp(value) {
    // 'signup' action dispatched from redux
    this.a.signUp(value.uname);

    this.af.auth.createUser(
      {email: value.emlid, password: value.pcode}
    );
    alert(` Hi ${value.uname}, Welcome! `);
    this.routeTo('dashboard');
  }

  routeTo(x) {
    this.route.navigate([x]);
  }
}
