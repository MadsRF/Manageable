import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {AppRoutingModule} from './app-routing.module';
import {environment} from '../environments/environment';
import {NgbDatepickerModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// Components
import {AppComponent} from './app.component';
import {HomeComponent} from './views/home/home.component';
import {AboutComponent} from './views/about/about.component';
import {PagenotfoundComponent} from './views/pagenotfound/pagenotfound.component';
import {ContactComponent} from './views/contact/contact.component';
import {RegisterComponent} from './views/register/register.component';
import {LoginComponent} from './views/login/login.component';
import {UserinfoComponent} from './views/userinfo/userinfo.component';
import {BoardComponent} from './views/board/board.component';
import {ScheduleComponent} from './views/schedule/schedule.component';

// Firebase module
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AuthService} from './services/auth/auth.service';
import {ScheduleService} from './services/schedule/schedule.service';
import {BoardService} from './services/board/board.service';


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
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule, // CLI adds AppRoutingModule to the AppModule's imports array
    AngularFireModule.initializeApp(environment.firebaseConfig), // points to the firebase key
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    PdfViewerModule,
    NgbDatepickerModule,
    NgbModule,
  ],
  providers: [AuthService, ScheduleService, BoardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
