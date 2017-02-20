import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select } from 'ng2-redux';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  index: number = 1;
  type: string;

  @select(['UserReducer', 'type'])
  user$: Observable<any>; // gets User State of the app

  ngOnInit() {
    this.user$.subscribe(x => {
      if (x !== 'signedout' && x !== undefined) {
        this.type = (x === 'admin@gmail.com') ? 'isAdmin' : 'isUser';
      }
    });
  }

}
