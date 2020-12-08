import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {PdfViewerModule} from 'ng2-pdf-viewer';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './view/home/home.component';
import {AboutComponent} from './view/about/about.component';
import {PagenotfoundComponent} from './view/pagenotfound/pagenotfound.component';
import {ContactComponent} from './view/contact/contact.component';
import {RegisterComponent} from './view/register/register.component';
import {LoginComponent} from './view/login/login.component';
import {UserinfoComponent} from './view/userinfo/userinfo.component';
import {BoardComponent} from './view/board/board.component';
import {ScheduleComponent} from './view/schedule/schedule.component';

// firebase module
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from '../environments/environment';

// Angular decorator that modifies/setup our app.module
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    PagenotfoundComponent,
    ContactComponent,
    RegisterComponent,
    LoginComponent,
    UserinfoComponent,
    BoardComponent,
    ScheduleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule, // CLI adds AppRoutingModule to the AppModule's imports array
    AngularFireModule.initializeApp(environment.firebaseConfig), // points to the firebase key
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    PdfViewerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
