import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import { select } from 'ng2-redux';
import { MdDialog } from '@angular/material';
import { AlertBoxComponent } from '../alert-box/alert-box.component';
import { Talk2DBService } from '../services/talk2-db.service';

@Component({
  selector: 'app-book-parking',
  templateUrl: './book-parking.component.html',
  styleUrls: ['./book-parking.component.css']
})
export class BookParkingComponent {

  bookedSlots: number[] = [-1];
  default: number[] = [-1];
  bookedSlotId: number;
  show: boolean = false;
  errorFlag: boolean = false;
  // username: string;
  // currentDate;

  pickDate;
  startTime;
  timeDuration;

  slots  = [
    { id: 0, isBooked: false, color: 'primary' },
    { id: 1, isBooked: false, color: 'primary' },
    { id: 2, isBooked: false, color: 'primary' },
    { id: 3, isBooked: false, color: 'primary' }
  ];

  // bookings: FirebaseListObservable<any> ;

  // @select(['UserReducer', 'type'])
  // user$: Observable<any>; // gets User State of the app

  // bookedParkings: [{
  //   id: string,
  //   user: string,
  //   date: string,
  //   start: string,
  //   end: string,
  //   duration: number
  // }] = [{
  //   id: 'set',
  //   user: 'set',
  //   date: 'set',
  //   start: '0',
  //   end: '0',
  //   duration: 0
  // }];

startTimeArr: string[] = ['1 AM', '2 AM', '3 AM', '4 AM', '5 AM'];
bookingDuration: string[] = ['1 hour', '2 hours', '3 hours', '4 hours', '5 hours'];

  constructor(
    private angularFire: AngularFire,
    public dialog: MdDialog,
    public getBookings: Talk2DBService
    ) {

    //   this.currentDate = new Date().toISOString().slice(0, 10); // 2017-01-30

    //   this.user$.subscribe(x => {
    //       if ( x !== 'signedout' &&  x !== undefined) {
    //         this.username = x.slice(0, x.indexOf('@')); // extracts username from email
    //       }
    //   });

    //   this.angularFire.database.list('/bookings')
    //   .subscribe( (x) => {
    //     // console.log('subscribe');
    //     let temp = [];
    //           for (let i = 0; i < x.length; i++) {
    //             // console.log('outerloop: ', x[i])
    //             for (let k in x[i]) {
    //                 // console.log('innerloop: ', k);
    //                 if (k === '$key') {
    //                   continue;
    //                 }
    //                 if (k === '$exists') {
    //                   continue;
    //                 }
    //                 if (typeof x[i][k] !== 'function') {
    //                   // console.log("pushed in temp? ", x[i][k]);
    //                     temp.push({
    //                       id: x[i][k].slotId,
    //                       user: x[i].$key,
    //                       date: x[i][k].date,
    //                       start: x[i][k].start,
    //                       end: parseInt(x[i][k].start) + parseInt(x[i][k].duration) + 'AM',
    //                       duration: x[i][k].duration,
    //                     });
    //                 }
    //               }
    //           }
    //     this.bookedParkings = <any>temp;
    //     console.log('bookedParkings: ', this.bookedParkings);
    // });
  }

  isPastDate(selectedDate) {
      if (selectedDate < this.getBookings.currentDate) {
        // dialog box used as alert msg
        let data = "Error: Kindly select a future date!";
        this.dialog.open(AlertBoxComponent, {data});
      }
  }

  validateSlots(formVal) {
    if ( // form is empty
        (this.pickDate === undefined || this.pickDate === null)
        &&
        (this.startTime === undefined || this.startTime === null)
        &&
        (this.timeDuration === undefined || this.timeDuration === null)
      ) {
      // dialog box used as alert msg
      let data = 'Kindly fill the Form';
      this.dialog.open(AlertBoxComponent, {data});
    }
    else {
      this.show = true;
      this.bookedSlots = [-1];
      this.resetSlots();

        for (let i = 0; i < this.getBookings.bookedParkings.length; i++) {
          if (this.pickDate === this.getBookings.bookedParkings[i].date) { // DATE MATCHED
            if (parseInt(this.startTime) === parseInt(this.getBookings.bookedParkings[i].start)) { // same start time
              this.pushToBookedSlots(i);
            }
            else if (parseInt(this.startTime) > parseInt(this.getBookings.bookedParkings[i].start)) { // form start time is after booked start time
                    if (parseInt(this.startTime) < parseInt(this.getBookings.bookedParkings[i].end)) { // form start time is before booked end time
                          this.pushToBookedSlots(i);
                    }
                    else if (((parseInt(this.startTime) + parseInt(this.timeDuration)) > parseInt(this.getBookings.bookedParkings[i].start)) // form duration is > booked start time
                            &&                                                                                                   // and
                            ((parseInt(this.startTime) + parseInt(this.timeDuration)) < parseInt(this.getBookings.bookedParkings[i].end))) {   // is < booked end time
                                  this.pushToBookedSlots(i);
                              }
            }
            else if (parseInt(this.startTime) < parseInt(this.getBookings.bookedParkings[i].start)) { // start time is prior to booked start time
                    if (((parseInt(this.startTime) + parseInt(this.timeDuration)) > parseInt(this.getBookings.bookedParkings[i].start))) { // form duration > booked start time
                        this.pushToBookedSlots(i);
                    }
            }
          }
        }
          for (let j = 1; j < this.bookedSlots.length; j++) { // slots booked
            this.slots[this.bookedSlots[j]].isBooked = true;
            this.slots[this.bookedSlots[j]].color = 'accent';
          }
    }
  }

  BookParkings(formVal, form) {
      for (let j = 1; j < this.bookedSlots.length; j++) {
        if (this.bookedSlotId === this.bookedSlots[j]) {
          this.errorFlag = true;
        }
      }
      if (this.errorFlag) {
        // dialog box used as alert msg
        let data = 'Error: Slot is already booked!';
        this.dialog.open(AlertBoxComponent, {data});
      }
      else {
        formVal.slotId = this.bookedSlotId; // inserts slotid to object
        this.slots[this.bookedSlotId].isBooked = true;
        this.angularFire.database.list('/bookings/' + this.getBookings.username) // creates a new node for each user
        .push(formVal); // pushes formVal on new node each time

        // dialog box used as alert msg
        let data = 'Parking Slot Booked!';
        this.dialog.open(AlertBoxComponent, {data});

        this.show = false;
        form.reset(); // form emptied
        this.resetSlots();

      }
    this.errorFlag = false;
  }

  slotBooked(slotId) {
    this.bookedSlotId = slotId.id;
  }

  resetForm(form) { // empties the form
    this.show = false; // slots hidden
    form.reset(); // form emptied
    this.resetSlots();
  }

  resetSlots() { // reset slots to available
    for (let i = 0; i < this.slots.length; i++) {
      this.slots[i].color = 'primary';
      this.slots[i].isBooked = false;
    }
  }

  pushToBookedSlots(index) { // throw error if getBookings.bookedParkings' conditions are met
    this.bookedSlots.push(parseInt(this.getBookings.bookedParkings[index].id));
    this.default.push(parseInt(this.getBookings.bookedParkings[index].id));
  }

}
