import { Component, OnInit } from '@angular/core';
import { AngularFire, AngularFireModule, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';
import { select } from 'ng2-redux';
import { MyActions } from './../store/actions';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { AlertBoxComponent } from '../alert-box/alert-box.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  index: number;

  constructor(
      private angularFire: AngularFire,
      private router: Router,
      private actions: MyActions,
      public dialog: MdDialog
    ) { }

  onSignIn(value) {
    // 'signin' action dispatched from redux
    this.actions.signIn(value.eml);

    this.angularFire.auth.login(
                {email: value.eml, password: value.pass},
                {provider: AuthProviders.Password, method: AuthMethods.Password}
        ).then((res) => {
                // dialog box used as alert msg
                let data = "Sign In Successful!";
                this.dialog.open(AlertBoxComponent, {data});
                this.router.navigate(['dashboard']);
        }
        , (err) => {
                alert(err);
        });
  }
}
