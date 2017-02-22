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

}
