import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {CompanyUser, CompanyUserInterface} from '../../models/companyuser';
import {CompanyuserService} from '../../services/companyuser/companyuser.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  companyUser: CompanyUserInterface;
  companyUserList: CompanyUserInterface[];
  editState: boolean;

  constructor(public authService: AuthService,
              private companyUserService: CompanyuserService,
              private toast: ToastrService) {
  }

  // On initialization gets executed
  ngOnInit(): void {
    this.companyUser = new CompanyUser('', '', '', '', '');
    this.readCompaniesUsers();
  }

  // gets the company user. Used for getting information
  readCompaniesUsers() {
    this.companyUserService.getCompanyUser().subscribe(companyUser => {
      this.companyUserList = companyUser;
    });
  }

  // updates new values from form
  updateCompanyUser(companyUserContent) {
    this.companyUserService.updateCompanyUser(companyUserContent);
    this.toast.info('User Update');
  }
}
