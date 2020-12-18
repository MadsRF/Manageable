import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// uses authservice in the html to check if user is logged in. changes navigation bar
export class AppComponent {
  constructor(public authService: AuthService) {
  }
}

