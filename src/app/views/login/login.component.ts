import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  errorMessage = ''; // validation error handling
  error: { name: string, message: string } = {name: '', message: ''}; // for firebase error handling

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  // checks with firebase is user info is inputted and then if its valid. routes to userinfo site
  login() {
    this.clearErrorMessage();
    if (this.validateForm(this.email, this.password)) {
      this.authService.loginWithEmail(this.email, this.password).then(() => {
        this.router.navigate(['schedule']).then();
      }).catch(error => {
        this.error = error;
        this.router.navigate(['login']).then();
      });
    }
  }

  // custom validator for register form
  validateForm(email, password) {
    if (email.lenght === 0) {
      this.errorMessage = 'please enter email id';
      return false;
    }

    if (password.lenght === 0) {
      this.errorMessage = 'please enter password';
      return false;
    }

    if (password.lenght < 6) {
      this.errorMessage = 'password should be at least 6 char';
      return false;
    }

    this.errorMessage = '';
    return true;

  }

  // is called in validateRegisterForm, clears messages on true value
  clearErrorMessage() {
    this.errorMessage = '';
    this.error = {name: '', message: ''};
  }
}
