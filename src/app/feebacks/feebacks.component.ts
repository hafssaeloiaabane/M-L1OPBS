import { initialUserState } from './../store/reducers';
import { Component, Input, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Observable } from 'rxjs';
import { select } from 'ng2-redux';
import { MyActions } from '../store/actions';
import { UserDetailsService } from '../services/user-details.service';
import { Talk2DBService } from '../services/talk2-db.service';

@Component({
  selector: 'app-feebacks',
  templateUrl: './feebacks.component.html',
  styleUrls: ['feebacks.component.css']
})
export class FeebacksComponent implements OnInit {

   title: string;
   clicked: boolean = false;
   key;

  tempFeedbacks:  [{
    uname: string,
    msg: string,
    reply: string,
    key: string
  }] = [{uname: 'Test1', msg: 'first feedback', reply: 'nill', key: '0'}];

  feedbacks: [{
    uname: string,
    msg: string,
    reply: string,
    key: string
  }] = [{uname: 'Test1', msg: 'first feedback', reply: 'nill', key: '0'}];

constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    public userDetails: UserDetailsService,
    public feedbackService: Talk2DBService
  ) {}

ngOnInit() {
   this.key = this.userDetails.user();
   if (this.userDetails.go2home) { // signedout
      this.router.navigate(['home']);
   }

    console.log('app state: ', this.key);
    this.title = (this.key === 'admin') ? 'All Feedbacks' : 'My Feedbacks';
    this.feedbacks = this.feedbackService.getFeedbacks(); // fetch feedbacks from db
}
  ShowKey(key) {
    this.feedbackService.ShowKey(key);
  }

  SendFeedback(formValue) {
    this.feedbackService.SendFeedback(formValue, this.key);
  }

  SendReply(val) {
    this.feedbackService.SendReply(val);
  }

}

