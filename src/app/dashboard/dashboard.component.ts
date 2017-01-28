import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { select } from 'ng2-redux';
import { MyActions } from './../store/actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  {

  index: number = 1;
  type: string;

  @select(['UserReducer', 'type'])
  user$: Observable<any>; // gets User State of the app

  constructor(
    private a: MyActions
  ){
    this.user$.subscribe(x => {
        // console.log('app state: ', x);
        this.type = (x === 'admin@gmail.com') ? 'isAdmin' : 'isUser';
        // console.log('type: ', this.type);
    });
  }

}
