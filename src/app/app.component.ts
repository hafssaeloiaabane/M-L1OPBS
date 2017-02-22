import { Component } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { MdDialog } from '@angular/material';
import { AlertBoxComponent } from './alert-box/alert-box.component';
import { Observable } from 'rxjs';
import { select } from 'ng2-redux';
import { MyActions } from './store/actions';
import { AuthService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isSignedOut: boolean;

  @select(['UserReducer', 'type'])
  user$: Observable<any>; // gets User State of the app

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private actions: MyActions,
    public dialog: MdDialog,
    public auth: AuthService
  ) {
    this.user$.subscribe(x => {
        this.isSignedOut = (x === 'signedout' || x === undefined) ? true : false;
    });
  }

  signOut() {
    this.actions.signOut(); // 'signout' action dispatched from redux
    this.auth.Logout(); // AuthService Logout
    this.router.navigate(['home']); // navigate back to home page
    // dialog box used as alert msg
    let data = "Please Sign In to continue...";
    this.dialog.open(AlertBoxComponent, {data});
  }

}
