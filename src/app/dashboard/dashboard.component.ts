import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {userType} from '../signin/signin.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  {

  index: number = 1;
  type = userType;
  constructor(){
    console.log('userType', userType);
  }
}
