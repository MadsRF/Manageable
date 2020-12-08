import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // TODO: use the user interface for values
  firstname = '';
  lastname = '';
  company = '';
  email = '';
  password = '';

  message = '';
  errorMessage = ''; // validation error handling
  error: { name: string, message: string } = {name: '', message: ''}; // for firebase error handling

  constructor(private authService: AuthService,
              private router: Router,
              private config: NgbModalConfig,
              private modalService: NgbModal) {

    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
  }

  registerUser(content) {
    this.clearErrorMessage();
    if (this.validateRegisterForm(this.email, this.password)) {

      const user = {
        firstname: this.firstname,
        lastname: this.lastname,
        company: this.company,
        email: this.email,
      };

      this.authService.registerWithEmail(this.email, this.password).then(() => {
        this.authService.createAdminUser(user).then(r => {});
        this.modalService.open(content);
        this.router.navigate(['userinfo']);
        this.message = '\nCongratulations on creating your profile\n'.toUpperCase();
      }).catch(error => {
        this.error = error;
        this.router.navigate(['register']);
      });
    }
  }

  validateRegisterForm(email, password) {
    if (email.lengh === 0) {
      this.errorMessage = 'Please enter email';
      return false;
    }
    if (password === 0) {
      this.errorMessage = 'Please enter password';
      return false;
    }
    if (password.lengh < 6) {
      this.errorMessage = 'Password should be at least 6 characters long';
      return false;
    }

    this.errorMessage = '';
    return true;
  }

  clearErrorMessage() {
    this.errorMessage = '';
    this.error = {name: '', message: ''};
  }

}
