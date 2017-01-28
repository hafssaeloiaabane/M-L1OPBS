import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

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
    { id: 12, isBooked: false },
  ];

  bookings: FirebaseListObservable<any> ;
  constructor(private af: AngularFire) {}

  BookParkings(formVal) {
    formVal.slotId = this.bookedSlotId; // inserts slotid to object 
    this.af.database.list('/bookings').push(formVal); // formvalue is pushed into the db
    alert('Parking Slot Booked!');
  }

  slotBooked(slotId) {
    console.log(slotId.id);
    this.bookedSlotId = slotId.id;
  }
}
