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
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';

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
  { path: 'home', component: AppComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'user', component: UserComponent },
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    AdminComponent,
    UserComponent
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
