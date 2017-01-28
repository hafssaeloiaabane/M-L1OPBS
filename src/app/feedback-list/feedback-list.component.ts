import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent {

   clicked: boolean = false;
   item: FirebaseListObservable<any> ;

  feedbacks: [{
    uname: string,
    msg: string,
    key: string
  }] = [{uname: 'Test1', msg: 'first feedback', key: '0'}];

constructor(private af: AngularFire) {
  this.item = this.af.database.list('/feedbacks');
  this.item.subscribe(
    (x) => {
      for (let i = 0; i < x.length; i++) {
        this.feedbacks[i] = {
          uname: x[i].name,
          msg: x[i].message,
          key: x[i].$key
        };
      }
    });
  }

  reply() {
    alert('Success, Admin replied!');
  }
}
