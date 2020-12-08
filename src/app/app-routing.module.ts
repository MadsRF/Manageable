import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './view/home/home.component';
import {AboutComponent} from './view/about/about.component';
import {PagenotfoundComponent} from './view/pagenotfound/pagenotfound.component';
import {ContactComponent} from './view/contact/contact.component';
import {LoginComponent} from './view/login/login.component';
import {RegisterComponent} from './view/register/register.component';
import {UserinfoComponent} from './view/userinfo/userinfo.component';
import {BoardComponent} from './view/board/board.component';
import {ScheduleComponent} from './view/schedule/schedule.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'userinfo', component: UserinfoComponent},
  {path: 'board', component: BoardComponent},
  {path: 'schedule', component: ScheduleComponent},
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

