import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import { select } from 'ng2-redux';
import { MyActions } from '../store/actions';

@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.css']
})
export class ViewBookingsComponent {

  item: FirebaseListObservable<any> ;

  @select(['UserReducer', 'type'])
  user$: Observable<any>; // gets User State of the app

  key;

  bookings: [{
    id: string,
    date: string,
    start: number,
    end: string,
    duration: number,
    key: string
  }] = [{id: 'booking1', date: '1Jan2017', start: 6, end: '9AM', duration: 2, key: '0'}];

constructor(private af: AngularFire) {
  this.user$.subscribe(x => {
         this.key = x.slice(0, x.indexOf('@')); // extracts username from email
        // console.log('app state: ', this.key);
  });
            this.item = this.af.database.list('/bookings/' + this.key);
            this.item.subscribe((x) => {
                for (let i = 0; i < x.length; i++) {
                  this.bookings[i] = {
                    id: x[i].slotId,
                    date: x[i].date,
                    start: x[i].start,
                    end: parseInt(x[i].start) + parseInt(x[i].duration) + 'AM',
                    duration: x[i].duration,
                    key: x[i].$key,
                  };
              }
            });
}

  cancelBooking(key, index) { // db key is received as 'key'
    this.item.subscribe( x => this.item.remove(key) ); // node specified by the key is deleted from the db
    this.bookings.splice(index, 1); // removed from the array
    alert('Success! You cancelled the booking.');
  }

  printReceipt(key) {
    alert('Success! Your receipt is printed.');
  }
}
