import { Component, Input } from '@angular/core';
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
  // @Input() type: string;

  key;
  isAdmin: boolean;

  item: FirebaseListObservable<any>;
  userName: FirebaseListObservable<any>;
  
  @select(['UserReducer', 'type'])
  user$: Observable<any>; // gets User State of the app

  bookings: [{
    id: string,
    date: string,
    start: number,
    end: string,
    duration: number,
    key: string
  }] = [{
    id: 'set',
    date: 'set',
    start: 0,
    end: '0',
    duration: 0,
    key: 'set'
  }];

  users: string[] = [];
  adminView = {
    concatenateArray : [this.bookings , this.users]
  }
  // adminView: [{
  //   id: string,
  //   date: string,
  //   start: number,
  //   end: string,
  //   duration: number,
  //   key: string,
  //   user: string
  // }] = [{
  //     id : this.bookings[i].id;
  //     date : this.bookings[i].date;
  //     start : this.bookings[i].start;
  //     end : this.bookings[i].end;
  //     duration : this.bookings[i].duration;
  //     key : this.bookings[i].key;
  //     user : this.users[i];
  // }]

constructor(private af: AngularFire) {
    this.user$.subscribe((x) => {
         this.key = x.slice(0, x.indexOf('@')); // extracts username from email
         console.log('this.key: ', this.key);
         this.isAdmin = (this.key === 'admin') ? true : false;
    });

  console.log('isAdmin', this.isAdmin);
  console.log('adminview obj', this.adminView.concatenateArray[0]);

    if (this.isAdmin) {
      this.userName = this.af.database.list('/bookings');
      this.userName.subscribe((x) => {
        let temp = [];
              for (let i = 0; i < x.length; i++) {
                  this.users[i] = x[i];
                  console.log('x: ' , this.users[i]); // assigned
                  for(var k in x[i]) {
                    if(k === '$key') {
                      continue;
                    }
                    temp.push({
                      id: x[i][k].slotId,
                      date: x[i][k].date,
                      start: x[i][k].start,
                      end: parseInt(x[i][k].start) + parseInt(x[i][k].duration) + 'AM',
                      duration: x[i][k].duration,
                      key: x[i][k].$key
                    });
                  }
              }
              this.bookings = <any>temp;
      });
    }
console.log('users is array', this.users[0]); // ni milra

            this.item = this.af.database.list('/bookings/' + this.key);
            this.item.subscribe((x) => {
                for (let i = 0; i < x.length; i++) {
                  this.bookings[i] = {
                    id: x[i].slotId,
                    date: x[i].date,
                    start: x[i].start,
                    end: parseInt(x[i].start) + parseInt(x[i].duration) + 'AM',
                    duration: x[i].duration,
                    key: x[i].$key
                  };
                  console.log('bookings', this.bookings[i]);
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
