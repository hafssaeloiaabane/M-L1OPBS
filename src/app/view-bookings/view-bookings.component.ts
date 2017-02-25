import { Component, Input, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import { select } from 'ng2-redux';
import { MyActions } from '../store/actions';
import { MdDialog } from '@angular/material';
import { AlertBoxComponent } from '../alert-box/alert-box.component';
import { UserDetailsService } from '../services/user-details.service';
import { Talk2DBService } from '../services/talk2-db.service';

@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.css']
})
export class ViewBookingsComponent implements OnInit {

  key;
  usertype: string;
  isAdmin: boolean;

  item: FirebaseListObservable<any>;
  // userName: FirebaseListObservable<any>;

  // @select(['UserReducer', 'type'])
  // user$: Observable<any>; // gets User State of the app

  bookings: [{
    id: string,
    user: string,
    date: string,
    start: number,
    end: string,
    duration: number,
    key: string}];
  // }] = [{
  //   id: 'set',
  //   user: 'set',
  //   date: 'set',
  //   start: 0,
  //   end: '0',
  //   duration: 0,
  //   key: 'set'
  // }];

constructor(
        private angularFire: AngularFire,
        public dialog: MdDialog,
        public userDetail: UserDetailsService,
        public getBookings: Talk2DBService
      ) {}

ngOnInit() {
    this.key = this.userDetail.user();
    this.usertype = this.userDetail.userType(); // isAdmin

    if (this.usertype === 'isAdmin') {
      this.bookings = this.getBookings.viewAdminBookings();
      console.log('************************************************', this.bookings);
    }
    else if (this.usertype !== 'isAdmin') {
      this.bookings = this.getBookings.viewUserBookings(this.key);
    }
    // if (this.usertype === 'admin') {
    //   this.userName = this.angularFire.database.list('/bookings');
    //   this.userName.subscribe((x) => {
    //     let temp = [];
    //           for (let i = 0; i < x.length; i++) {
    //             console.log('users node',x[i]);
    //             for (let k in x[i]) {
    //                 if (k === '$key') {
    //                   continue;
    //                 }
    //                 // console.log('booking data:', x[i][k] );
    //                 if (typeof x[i][k] !== 'function') {
    //                   // console.log('@@@@@@@@@', k);
    //                     temp.push({
    //                       id: x[i][k].slotId,
    //                       user: x[i].$key,
    //                       date: x[i][k].date,
    //                       start: x[i][k].start,
    //                       end: parseInt(x[i][k].start) + parseInt(x[i][k].duration) + 'AM',
    //                       duration: x[i][k].duration,
    //                       key: k
    //                     });
    //                 }
    //               }
    //           }
    //           this.bookings = <any>temp;
    //           console.log('bookings', this.bookings);
    //   });
    // }

    // // if (!this.isAdmin) {
    // if (this.usertype !== 'admin') {
    //         this.item = this.angularFire.database.list('/bookings/' + this.key);
    //         this.item.subscribe((x) => {
    //             for (let i = 0; i < x.length; i++) {
    //               this.bookings[i] = {
    //                 id: x[i].slotId,
    //                 user: this.key,
    //                 date: x[i].date,
    //                 start: x[i].start,
    //                 end: parseInt(x[i].start) + parseInt(x[i].duration) + 'AM',
    //                 duration: x[i].duration,
    //                 key: x[i].$key
    //               };
    //               // console.log('bookings', this.bookings[i]);
    //           }
    //         });
    // }
 }

  cancelBooking(currentObject, index) { // db key is received as 'key'
  // console.log('currentObject.key', currentObject.key, 'currentObject.user', currentObject.user);
    this.item = this.angularFire.database.list('/bookings/' + currentObject.user); // user
    this.item.subscribe( (x) => {
      this.item.remove(currentObject.key);
    }); // node specified by the key is deleted from the db

    this.bookings.splice(index , 1); // removed from the array

    // dialog box used as alert msg
    let data = "Success! You cancelled the booking.";
    this.dialog.open(AlertBoxComponent, {data});
  }

  printReceipt() {
    // dialog box used as alert msg
    let data = "Success! Your receipt is printed.";
    this.dialog.open(AlertBoxComponent, {data});
  }
}
