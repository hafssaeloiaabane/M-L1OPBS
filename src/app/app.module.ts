import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { StoreModule } from './store';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { NgReduxModule } from 'ng2-redux';
import 'hammerjs';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookParkingComponent } from './book-parking/book-parking.component';
import { ViewBookingsComponent } from './view-bookings/view-bookings.component';
import { FeebacksComponent } from './feebacks/feebacks.component';
import { AlertBoxComponent } from './alert-box/alert-box.component';

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
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    SigninComponent,
    DashboardComponent,
    BookParkingComponent,
    ViewBookingsComponent,
    FeebacksComponent,
    AlertBoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule,
    NgReduxModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(myFirebaseConfig, myFirebaseAuthConfig)
  ],
  providers: [],
  entryComponents: [AlertBoxComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
