import { Injectable } from '@angular/core';
import { AngularFire, AngularFireModule, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { AlertBoxComponent } from '../alert-box/alert-box.component';

@Injectable()
export class AuthService {

  constructor(
      private angularFire: AngularFire,
      private router: Router,
      public dialog: MdDialog
  ) {}

  Login(value) {
    this.angularFire.auth.login(
                {email: value.eml, password: value.pass},
                {provider: AuthProviders.Password, method: AuthMethods.Password}
        ).then((res) => {
                // dialog box used as alert msg
                let data = 'Sign In Successful!';
                this.dialog.open(AlertBoxComponent, {data});
                // this.router.navigate(['dashboard']);
        }
        , (err) => {
                alert(err);
        });
  }

  Logout() {
        this.angularFire.auth.logout(); // angularFire authentication log out
  }

  SignUp(value) {
        this.angularFire.auth.createUser(
           {email: value.emlid, password: value.pcode}
        );
  }
}
