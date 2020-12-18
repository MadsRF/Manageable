import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {CompanyUserInterface, CompanyUser} from '../../models/companyuser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  companyUser: CompanyUserInterface;
  password = '';

  message = '';
  errorMessage = ''; // validation error handling
  error: { name: string, message: string } = {name: '', message: ''}; // for firebase error handling

  constructor(public authService: AuthService,
              private router: Router,
              private config: NgbModalConfig,
              private modalService: NgbModal,
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
    this.companyUser = new CompanyUser('', '', '', '', '');
  }

  ngOnInit(): void {
  }

  // register company. checks if value are true before creating with authService
  // sends company info from registry to create new doc in collection
  registerCompany(content) {
    this.clearErrorMessage();
    console.log(this.companyUser);
    if (this.validateRegisterForm(this.companyUser.email, this.password)) {
      this.authService.registerWithEmail(this.companyUser.email, this.password, this.companyUser).then(() => {
        this.modalService.open(content);
        this.router.navigate(['userinfo']).then();
        this.message = '\nCongratulations on creating your profile\n'.toUpperCase();
      }).catch(error => {
        this.error = error;
        this.router.navigate(['register']).then();
      });
    }
  }

  // custom validator for register form
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

  // is called in validateRegisterForm, clears messages on true value
  clearErrorMessage() {
    this.errorMessage = '';
    this.error = {name: '', message: ''};
  }

}
