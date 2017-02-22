import { initialUserState } from './../store/reducers';
import { Component, Input, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Observable } from 'rxjs';
import { select } from 'ng2-redux';
import { MyActions } from '../store/actions';
import { MdDialog } from '@angular/material';
import { AlertBoxComponent } from '../alert-box/alert-box.component';
import { UserDetailsService } from '../services/user-details.service';

@Component({
  selector: 'app-feebacks',
  templateUrl: './feebacks.component.html',
  styleUrls: ['feebacks.component.css']
})
export class FeebacksComponent implements OnInit {

   title: string;
   clicked: boolean = false;

   item: FirebaseListObservable<any> ;
   feedback: FirebaseListObservable<any> ;

  @select(['UserReducer', 'type']) // initialUserState.type
  user$: Observable<any>; // gets User State of the app

  key;
  replyKey: string;
  temp;

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
    private angularFire: AngularFire,
    private router: Router,
    private activeRoute: ActivatedRoute,
    public dialog: MdDialog,
    public userDetails: UserDetailsService
  ) {}

ngOnInit() {
 this.user$.subscribe(x => {

   this.key = this.userDetails.user();

   if (x === 'signedout' || x === undefined) {
     this.router.navigate(['home']);
   }
   console.log('app state: ', this.key);
 });

    this.title = (this.key === 'admin') ? 'All Feedbacks' : 'My Feedbacks';

            this.item = this.angularFire.database.list('/feedbacks');
            this.item.subscribe((x) => {
                for (let i = 0; i < x.length; i++) {
                  this.feedbacks[i] = {
                      uname: x[i].uname,
                      msg: x[i].msg,
                      reply: x[i].reply || 'No Responce Yet',
                      key: x[i].$key
                  };
              }
            });
}

  ShowKey(key) {
    this.replyKey = key;
    this.item = this.angularFire.database.list('/feedbacks/' + this.replyKey);
            this.item.subscribe((x) => {
                for (let i = 0; i < x.length; i++) {
                  this.temp = {
                      uname: x[i].uname,
                      msg: x[i].msg,
                      reply: x[i].reply || 'No Responce Yet',
                      key: x[i].$key
                  };
              }
            });
    // console.log(key);
  }

  SendFeedback(formValue) {
    // console.log('inside send form', formValue.msg);
    if (formValue.msg) {
      formValue.uname = this.key;
      formValue.reply = 'no reply yet';
      this.angularFire.database.list('/feedbacks')
      .push(formValue)
      // .then(() => console.log('success'))
      // .catch(err => console.log('error: ', err)); // formvalue is pushed into the db

        // dialog box used as alert msg
        let data = "Feedback Submitted!";
        this.dialog.open(AlertBoxComponent, {data});
    }
    else {
        // dialog box used as alert msg
        let data = "Please Enter Feedback!";
        this.dialog.open(AlertBoxComponent, {data});
    }
  }

  SendReply(val) {
    this.temp.reply = val.reply;
    this.angularFire.database.list('/feedbacks') // select node 'feedbacks
      .update(this.replyKey, {'reply': val.reply}); //update its reply key
        // dialog box used as alert msg
        let data = "Success, Reply Sent!";
        this.dialog.open(AlertBoxComponent, {data});
  }
}

