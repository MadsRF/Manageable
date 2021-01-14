// modules
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {AppRoutingModule} from './app-routing.module';
import {NgbDatepickerModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

// environment for local build and deploy build
// import {environment} from '../environments/environment'; // local
import {environment} from '../environments/environment.prod'; // prod

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
import {TermComponent} from './views/term/term.component';

// Firebase modules
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFirestoreModule} from '@angular/fire/firestore';

// Services
import {AuthService} from './services/auth/auth.service';
import {ScheduleService} from './services/schedule/schedule.service';
import {BoardService} from './services/board/board.service';
import {ContactService} from './services/contact/contact.service';
import {CompanyuserService} from './services/companyuser/companyuser.service';
import { UserComponent } from './views/user/user.component';


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
    ScheduleComponent,
    TermComponent,
    UserComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule, // used for a more controllable form type
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added for alerts
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
  providers: [AuthService, ScheduleService, BoardService, ContactService, CompanyuserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
