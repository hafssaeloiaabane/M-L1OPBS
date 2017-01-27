import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
// import { NgReduxModule } from 'ng2-redux';
import 'hammerjs';

// Components
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookParkingComponent } from './book-parking/book-parking.component';
import { ViewBookingsComponent } from './view-bookings/view-bookings.component';
import { SendFeedbackComponent } from './send-feedback/send-feedback.component';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';

export const myFirebaseConfig = {
    apiKey: 'AIzaSyDprS0fjxKqaIWjFwYuTNP844rkWxnjt1k',
    authDomain: 'l1opbs-4128f.firebaseapp.com',
    databaseURL: 'https://l1opbs-4128f.firebaseio.com',
    storageBucket: 'l1opbs-4128f.appspot.com',
    messagingSenderId: '514152719484'
};

export const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};

const routes: Routes =[
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: SigninComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    DashboardComponent,
    BookParkingComponent,
    ViewBookingsComponent,
    SendFeedbackComponent,
    FeedbackListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    // StoreModule,
    // NgReduxModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(myFirebaseConfig, myFirebaseAuthConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
