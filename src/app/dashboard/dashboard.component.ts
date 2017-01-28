import { Component } from '@angular/core';
import { Observable } from 'rxjs';
// import {userType} from '../signin/signin.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  {

  index: number = 1;
  // type: string = 'isAdmin';
  constructor(){
  //   if(userType === undefined || 'isUser') {
  //     this.type = 'isUser';
  //   }
  //   // else {
  //   //   this.type = 'isAdmin';
  //   // }
  //   // this.type = (userType === undefined || 'isUser')?'isUser':'isAdmin';
  //   console.log('userType', userType);
  //       console.log('type', this.type);

  }
}
