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

  email = '';
  password = '';
  message = '';
  errorMessage = ''; // validation error handling
  error: { name: string, message: string } = {name: '', message: ''}; // for firebase error handling

  constructor(private authService: AuthService, private router: Router, config: NgbModalConfig, private modalService: NgbModal) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
  }

  clearErrorMessage() {
    this.errorMessage = '';
    this.error = {name: '', message: ''};
  }

  register(content) {
    this.clearErrorMessage();
    if (this.validateForm(this.email, this.password)) {
      this.authService.registerWithEmail(this.email, this.password).then(() => {
        this.modalService.open(content);
        this.message = 'Congratulations on creating your profile \n\n Login to get started'.toUpperCase();
        // this.router.navigate(['/userinfo']);
      }).catch(error => {
        this.error = error;
        this.router.navigate(['/register']);
      });
    }
  }

  validateForm(email, password) {
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
}
