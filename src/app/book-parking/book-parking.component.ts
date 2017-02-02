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
  
  bookedSlots: number[] = [0];
  bookedSlotId: number;
  show: boolean = false;
  errorFlag: boolean;

  slots  = [
    { id: 0, isBooked: false, color: 'primary' },
    { id: 1, isBooked: false, color: 'primary' },
    { id: 2, isBooked: false, color: 'primary' },
    { id: 3, isBooked: false, color: 'primary' }
  ];

  bookings: FirebaseListObservable<any> ;
  book: FirebaseListObservable<any> = this.af.database.list('/bookings');

  @select(['UserReducer', 'type'])
  user$: Observable<any>; // gets User State of the app

  currentDate;
  bookedParkings: [{
    id: string,
    user: string,
    date: string,
    start: number,
    end: string,
    duration: number
  }] = [{
    id: 'set',
    user: 'set',
    date: 'set',
    start: 0,
    end: '0',
    duration: 0
  }];

  constructor(
    private af: AngularFire,
    private a: MyActions
  ){
      this.currentDate = new Date().toISOString().slice(0, 10); // 2017-01-30

      this.book.take(1)
      .subscribe( (x) => {
        let temp = [];
              for (let i = 0; i < x.length; i++) {
                console.log('outerloop: ', x[i])
                for(let k in x[i]) {
                    console.log('innerloop: ', k);
                    if(k === '$key') {
                      continue;
                    }
                    if(k === '$exists') {
                      continue;
                    }
                    if(typeof x[i][k] != "function"){
                      console.log("kya push kia temp m? ",x[i][k] )
                        temp.push({
                          id: x[i][k].slotId,
                          user: x[i].$key,
                          date: x[i][k].date,
                          start: x[i][k].start,
                          end: parseInt(x[i][k].start) + parseInt(x[i][k].duration) + 'AM',
                          duration: x[i][k].duration,
                        });
                    }
                  }
              }
              this.bookedParkings = <any>temp;
        console.log('bookedParkings: ', this.bookedParkings);
    });
  }

  validateSlots(formVal) {
    if (formVal.date < this.currentDate) {
      alert('Error: Kindly select a future date!');
    }
    else {
      for (let i = 0; i < this.bookedParkings.length; i++) {
        if (formVal.date === this.bookedParkings[i].date) {
          console.log('DATE MATCHED');
          if (
            (this.bookedParkings[i].start <= formVal.start) && (formVal.start <= this.bookedParkings[i].end)
            // (formVal.start === this.bookedParkings[i].start)
            // || (
            // (formVal.start >= this.bookedParkings[i].start)
            // &&
            // ((formVal.start + formVal.duration) <= this.bookedParkings[i].end))
            ) {
              console.log('DATE AND TIME CLASH LETS SEE SLOTS'); // kool ab ok hai
              // if(this.bookedParkings[i].id) {
              //   this.bookedSlots.push(parseInt(this.bookedParkings[i].id));
              //   for(let j=0; j<this.bookedSlots.length; j++) {
              //     this.slots[this.bookedSlots[j]].isBooked = true;
              //     this.slots[this.bookedSlots[j]].color = 'accent';
              //     // this.slots[this.bookedParkings[j].id].isBooked = true;
              //     // this.slots[this.bookedParkings[j].id].color = 'accent';
              //   }
              //   console.log('slots booked ', this.bookedSlots);
              //   return this.bookedSlots;
              // }

          }
        }
      }
    }
  }

  BookParkings(formVal) {
      let x = this.validateSlots(formVal);
      console.log('validateSlots returned this: ',x);
    //   for(let j=0; j<this.bookedSlots.length; j++) {
    //     if(this.bookedSlotId === x[j]) {
    //       this.errorFlag = true;
    //     }
    //   }
    //   if(this.errorFlag) {
    //     alert('Error: Slot is already booked! Kindly select another one');
    //   }
    //   else {
    //     formVal.slotId = this.bookedSlotId; // inserts slotid to object

    //     this.user$.subscribe(x => {
    //       if( x !== 'signedout') {
    //         let username = x.slice(0, x.indexOf('@')); // extracts username from email
    //         // console.log('app state: ', username);
    //         this.af.database.list('/bookings/' + username) // creates a new node for each user
    //         .push(formVal); // pushes formVal on new node each time
    //         alert('Parking Slot Booked!');
    //       }
    //     });
    //   }
  }

  slotBooked(slotId) {
    this.bookedSlotId = slotId.id;
  }
}
