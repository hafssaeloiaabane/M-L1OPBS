import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import { select } from 'ng2-redux';
import { MyActions } from '../store/actions';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent {

   clicked: boolean = false;
   item: FirebaseListObservable<any> ;

  @select(['UserReducer', 'type'])
  user$: Observable<any>; // gets User State of the app
  key;

  feedbacks: [{
    uname: string,
    msg: string,
    key: string
  }] = [{uname: 'Test1', msg: 'first feedback', key: '0'}];

constructor(private af: AngularFire) {
 this.user$.subscribe(x => {
        this.key = x.slice(0, x.indexOf('@')); // extracts username from email
        console.log('app state: ', this.key);
  });
            this.item = this.af.database.list('/feedbacks');
            this.item.subscribe((x) => {
                for (let i = 0; i < x.length; i++) {
                  this.feedbacks[i] = {
                      uname: x[i].uname,
                      msg: x[i].msg,
                      key: x[i].$key
                  };
              }
            });
}

  reply(val) {
    alert('Success, Admin replied: ' + val);
  }
}
