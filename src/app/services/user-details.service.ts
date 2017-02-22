import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select } from 'ng2-redux';

@Injectable()
export class UserDetailsService {

  username: string;
  type: string;

  @select(['UserReducer', 'type'])
  user$: Observable<any>; // gets User State of the app

  constructor() { }

  usertype(): string {
    this.user$.subscribe(x => {
          if ( x !== 'signedout' &&  x !== undefined) {
            this.type = (x === 'admin@gmail.com') ? 'isAdmin' : 'isUser'; // type of user
          }
    });
    return this.type; // , this.username;
  }

  user(): string {
    this.user$.subscribe(x => {
          if ( x !== 'signedout' &&  x !== undefined) {
            this.username = x.slice(0, x.indexOf('@')); // extracts username from email
          }
    });
    return this.username;
  }

  firstname(value): string {
    let firstChar = value.uname.charAt(0); // get 1st char of name
    let capitalize = firstChar.toUpperCase(); // transformed into upperCase
    let uname = value.uname.replace(firstChar, capitalize); // replaced first char of name
    let space = uname.indexOf(' '); // get first name
    let firstname = uname.slice(0, space); // extract first name with 1st letter capital
    return firstname;
  }
}
