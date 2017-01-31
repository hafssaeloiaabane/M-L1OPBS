import { Component,Input } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import { select } from 'ng2-redux';
import { MyActions } from '../store/actions';

@Component({
  selector: 'app-feebacks',
  templateUrl: './feebacks.component.html',
  styleUrls: ['./feebacks.component.css']
})
export class FeebacksComponent {
 
   title: string;
   clicked: boolean = false;
   
   item: FirebaseListObservable<any> ;
   feedback: FirebaseListObservable<any> ;

  @select(['UserReducer', 'type'])
  user$: Observable<any>; // gets User State of the app
  
  key;
  replyKey: string;
  temp;

  feedbacks: [{
    uname: string,
    msg: string,
    reply: string,
    key: string
  }] = [{uname: 'Test1', msg: 'first feedback', reply: 'nill', key: '0'}];

constructor(private af: AngularFire) {
 this.user$.subscribe(x => {
        this.key = x.slice(0, x.indexOf('@')); // extracts username from email
        console.log('app state: ', this.key);
  });

    this.title = (this.key === 'admin') ? 'All Feedbacks' : 'My Feedbacks';

            this.item = this.af.database.list('/feedbacks');
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
    this.item = this.af.database.list('/feedbacks/' + this.replyKey);
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
    console.log(key);
  }

  SendFeedback(formValue) {
    formValue.uname = this.key;
    formValue.reply = 'no reply yet';
    this.af.database.list('/feedbacks')
    .push(formValue)
    .then(() => console.log('success'))
    .catch(err => console.log('error: ', err)); // formvalue is pushed into the db
    alert('Feedback Submitted!');
  }

  SendReply(val) {
    this.temp.reply = val.reply;
    this.af.database.list('/feedbacks') // select node 'feedbacks
      .update(this.replyKey, {'reply': val.reply}); //update its reply key
    alert('Success, Reply Sent');
  }
}

