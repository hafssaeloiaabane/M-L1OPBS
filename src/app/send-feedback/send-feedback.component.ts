import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-send-feedback',
  templateUrl: './send-feedback.component.html',
  styleUrls: ['./send-feedback.component.css']
})
export class SendFeedbackComponent {

feedback: FirebaseListObservable<any> ;

constructor(private af: AngularFire) {}

  SendFeedback(formValue) {
    this.af.database.list('/feedbacks')
    .push(formValue)
    .then(() => console.log('success'))
    .catch(err => console.log('error: ', err)); // formvalue is pushed into the db
    // console.log(formValue);
    alert('Feedback Submitted!');
  }

}
