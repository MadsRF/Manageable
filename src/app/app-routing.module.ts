import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './views/home/home.component';
import {AboutComponent} from './views/about/about.component';
import {PagenotfoundComponent} from './views/pagenotfound/pagenotfound.component';
import {ContactComponent} from './views/contact/contact.component';
import {LoginComponent} from './views/login/login.component';
import {RegisterComponent} from './views/register/register.component';
import {UserinfoComponent} from './views/userinfo/userinfo.component';
import {BoardComponent} from './views/board/board.component';
import {ScheduleComponent} from './views/schedule/schedule.component';
import {TermComponent} from './views/term/term.component';
import {AngularFireAuthGuard} from '@angular/fire/auth-guard';

const routes: Routes = [
  // free for all visitor
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'terms', component: TermComponent},
  // has to be logged in to access these paths
  {path: 'userinfo', component: UserinfoComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'board', component: BoardComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'schedule', component: ScheduleComponent, canActivate: [AngularFireAuthGuard]},
  // other
  {path: '', redirectTo: '/home', pathMatch: 'full'}, // redirect to `first-component`
  {path: '**', component: PagenotfoundComponent},  // Wildcard route for a 404 page
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

