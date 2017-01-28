import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.css']
})
export class ViewBookingsComponent {

  item: FirebaseListObservable<any> ;

  bookings: [{
    id: string,
    date: string,
    start: number,
    duration: number,
    key: string
  }] = [{id: 'booking1', date: '1Jan2017', start: 6, duration: 2, key: '0'}];

constructor(private af: AngularFire) {
  this.item = this.af.database.list('/bookings');
  this.item.subscribe(
    (x) => {
      for (let i = 0; i < x.length; i++) {
        this.bookings[i] = {
          id: x[i].id,
          date: x[i].date,
          start: x[i].start,
          duration: x[i].duration,
          key: x[i].$key,
        };
    }
  });
}

  // chk for subscription, 2 subscriptions independent hoti hn therefore remove wali is not sync with render wali :( ?
  // todoapp se check how to dlt data ?

  cancelBooking(key) { // db key is received as 'key'
    this.item.subscribe( x => this.item.remove(key) ); // node specified by the key is deleted from the db
    alert('Success! You cancelled the booking.');
  }

  printReceipt(key) {
    alert('Success! Your receipt is printed.');
  }
}
