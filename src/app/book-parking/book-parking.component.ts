import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import { select } from 'ng2-redux';
import { MyActions } from '../store/actions';

@Component({
  selector: 'app-book-parking',
  templateUrl: './book-parking.component.html',
  styleUrls: ['./book-parking.component.css']
})
export class BookParkingComponent {

  bookedSlotId: number;
  show: boolean = false;

  slots  = [
    { id: 0, isBooked: false },
    { id: 1, isBooked: false },
    { id: 2, isBooked: false },
    { id: 3, isBooked: false },
    { id: 4, isBooked: false },
    { id: 5, isBooked: false },
    { id: 6, isBooked: false },
    { id: 7, isBooked: false },
    { id: 8, isBooked: false },
    { id: 9, isBooked: false },
    { id: 10, isBooked: false },
    { id: 11, isBooked: false },
    { id: 12, isBooked: false }
  ];

  bookings: FirebaseListObservable<any> ;

  @select(['UserReducer', 'type'])
  user$: Observable<any>; // gets User State of the app

  currentDate;

  constructor(
    private af: AngularFire,
    private a: MyActions
  ){
      this.currentDate = new Date().toISOString().slice(0, 10); // 2017-01-30
  }

  BookParkings(formVal) {
    if(formVal.date < this.currentDate) {
      alert('Error: Kindly select a future date!');
    }
    else {
      formVal.slotId = this.bookedSlotId; // inserts slotid to object

      this.user$.subscribe(x => {
        if( x !== 'signedout') {
          let slice = x.slice(0, x.indexOf('@')); // extracts username from email
          // console.log('app state: ', slice);
          this.af.database.list('/bookings/' + slice) // creates a new node for each user
          .push(formVal); // pushes formVal on new node each time
          alert('Parking Slot Booked!');
        }
      });
    }
  }

  slotBooked(slotId) {
    this.bookedSlotId = slotId.id;
  }
}
