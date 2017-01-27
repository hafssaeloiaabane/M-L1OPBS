import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
// import { select } from 'ng2-redux';
// import { MyActions } from './store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // @select(['UserReducer', 'status'])
  // user$: Observable<any>; // gets User State of the app

  constructor(
    private r: Router,
    private ar: ActivatedRoute,
    private af: AngularFire,
    // private a: MyActions
  ){
    // this.user$.subscribe(x => {
    //     console.log('subscribed app state: ', x);
    // });
  }

  signOut() {
    // 'signout' action dispatched from redux
    // this.a.signOut();

    // this.af.auth.logout();
    this.r.navigate(['home']); // navigate back to home page
    alert('Please Sign In to continue...');
  }
  
}
