import { Component, Input, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import { select } from 'ng2-redux';
import { MyActions } from '../store/actions';

@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.css']
})
export class ViewBookingsComponent implements OnInit {

  key;
  isAdmin: boolean;

  item: FirebaseListObservable<any>;
  userName: FirebaseListObservable<any>;

  @select(['UserReducer', 'type'])
  user$: Observable<any>; // gets User State of the app

  bookings: [{
    id: string,
    user: string,
    date: string,
    start: number,
    end: string,
    duration: number,
    key: string
  }] = [{
    id: 'set',
    user: 'set',
    date: 'set',
    start: 0,
    end: '0',
    duration: 0,
    key: 'set'
  }];

constructor(private angularFire: AngularFire) {}

ngOnInit() {
    this.user$.subscribe((x) => {
      if (x !== 'signedout' && x !== undefined) {
         this.key = x.slice(0, x.indexOf('@')); // extracts username from email
        //  console.log('this.key: ', this.key);
         this.isAdmin = (this.key === 'admin') ? true : false;
      }
    });

  // console.log('isAdmin', this.isAdmin);

    if (this.isAdmin) {
      this.userName = this.angularFire.database.list('/bookings');
      this.userName.subscribe((x) => {
        let temp = [];
              for (let i = 0; i < x.length; i++) {
                console.log('users node',x[i]);
                for (let k in x[i]) {
                    if (k === '$key') {
                      continue;
                    }
                    // console.log('booking data:', x[i][k] );
                    if (typeof x[i][k] !== 'function') {
                      // console.log('@@@@@@@@@', k);
                        temp.push({
                          id: x[i][k].slotId,
                          user: x[i].$key,
                          date: x[i][k].date,
                          start: x[i][k].start,
                          end: parseInt(x[i][k].start) + parseInt(x[i][k].duration) + 'AM',
                          duration: x[i][k].duration,
                          key: k
                        });
                    }
                  }
              }
              this.bookings = <any>temp;
              console.log('bookings', this.bookings);
      });
    }

    if (!this.isAdmin) {
            this.item = this.angularFire.database.list('/bookings/' + this.key);
            this.item.subscribe((x) => {
                for (let i = 0; i < x.length; i++) {
                  this.bookings[i] = {
                    id: x[i].slotId,
                    user: this.key,
                    date: x[i].date,
                    start: x[i].start,
                    end: parseInt(x[i].start) + parseInt(x[i].duration) + 'AM',
                    duration: x[i].duration,
                    key: x[i].$key
                  };
                  // console.log('bookings', this.bookings[i]);
              }
            });
    }
 }

  cancelBooking(currentObject, index) { // db key is received as 'key'
  // console.log('currentObject.key', currentObject.key, 'currentObject.user', currentObject.user);
    this.item = this.angularFire.database.list('/bookings/' + currentObject.user); // user
    this.item.subscribe( (x) => {
      this.item.remove(currentObject.key);
    }); // node specified by the key is deleted from the db

    this.bookings.splice(index , 1); // removed from the array
    alert('Success! You cancelled the booking.');
  }

  printReceipt() {
    alert('Success! Your receipt is printed.');
  }
}
