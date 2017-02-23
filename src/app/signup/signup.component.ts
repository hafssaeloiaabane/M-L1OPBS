import { MyActions } from './../store/actions';
import { select } from 'ng2-redux';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialog } from '@angular/material';
import { AlertBoxComponent } from '../alert-box/alert-box.component';
import { AuthService } from '../services/auth-service.service';
import { UserDetailsService } from '../services/user-details.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  index: number;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private actions: MyActions,
    public dialog: MdDialog,
    public auth: AuthService,
    public userDetails: UserDetailsService
  ) {}

  SignUp(value) {
    this.actions.signUp(value.emlid); // 'signup' action dispatched from redux
    this.auth.SignUp(value); // angularfire authService
    const firstname = this.userDetails.firstname(value); // gets username by service

    // dialog box used as alert msg
    let data = ` Hi ${firstname}, Welcome! `;
    this.dialog.open(AlertBoxComponent, {data});

    this.router.navigate(['dashboard']); // navigate to dashboard component
  }

}
