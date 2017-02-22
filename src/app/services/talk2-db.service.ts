import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class Talk2DBService {

  currentDate;
  bookings: FirebaseListObservable<any> ;

  bookedParkings: [{
    id: string,
    user: string,
    date: string,
    start: string,
    end: string,
    duration: number
  }] = [{
    id: 'set',
    user: 'set',
    date: 'set',
    start: '0',
    end: '0',
    duration: 0
  }];

  constructor(private angularFire: AngularFire) {
    this.currentDate = new Date().toISOString().slice(0, 10); // 2017-01-30

      this.angularFire.database.list('/bookings')
      .subscribe( (x) => {
        // console.log('subscribe');
        let temp = [];
              for (let i = 0; i < x.length; i++) {
                // console.log('outerloop: ', x[i])
                for (let k in x[i]) {
                    // console.log('innerloop: ', k);
                    if (k === '$key') {
                      continue;
                    }
                    if (k === '$exists') {
                      continue;
                    }
                    if (typeof x[i][k] !== 'function') {
                      // console.log("pushed in temp? ", x[i][k]);
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
}
