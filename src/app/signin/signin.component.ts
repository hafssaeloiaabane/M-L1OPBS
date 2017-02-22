import { Component, OnInit } from '@angular/core';
import { select } from 'ng2-redux';
import { MyActions } from './../store/actions';
import { Router } from '@angular/router';
import { AlertBoxComponent } from '../alert-box/alert-box.component';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  index: number;

  constructor(
      private router: Router,
      private actions: MyActions,
      public auth: AuthService
    ) { }

  onSignIn(value) {
    // 'signin' action dispatched from redux
    this.actions.signIn(value.eml);
    this.auth.Login(value);
    this.router.navigate(['dashboard']);
  }
}
