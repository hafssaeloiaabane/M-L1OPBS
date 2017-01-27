import { Component, OnInit } from '@angular/core';
import { AngularFire, AngularFireModule, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';
// import { select } from 'ng2-redux';
// import { MyActions } from './../store/actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  index: number;
  constructor(
      private af: AngularFire
      private route: Router,
      // private a: MyActions
    ) { }

  onSignIn(value) {
    // 'signin' action dispatched from redux
    // this.a.signIn(value.eml);

        this.af.auth.login(); // Google login
        this.af.auth.login(
          {email: value.eml , password: value.pass},
          {provider: AuthProviders.Password, method: AuthMethods.Password}
        ).then((res) => {
            alert('Sign In Successful!');
            if(value.userType === 'admin') {
                this.route.navigate(['admin']); // navigate to admin panel
            }
            else {
                this.route.navigate(['user']); // navigate to user panel
            }
        }, (err) => {
            alert(err);
        });
  }

}
