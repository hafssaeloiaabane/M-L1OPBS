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
import 'hammerjs';

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

// const routes: Routes =[
//   { path: '', pathMatch: 'full', redirectTo: 'home' },
//   { path: 'home', component: HomeComponent },
//   { path: 'dashboard', component: UserComponent },
//   { path: 'card_travel', component: CompanyComponent },
//   { path: 'perm_identity', component: StudentComponent },
//   { path: 'account_circle', component: AdminComponent },
//   { path: 'notifications', component: NotificationsComponent },
//   { path: '**', redirectTo: 'home'}

// ];

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    // StoreModule,
    // NgReduxModule,
    MaterialModule.forRoot(),
    // RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(myFirebaseConfig, myFirebaseAuthConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
