import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {NgForm} from '@angular/forms';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {User, UserInterface} from '../../models/user';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: UserInterface; // Used for creating and editing a new user object
  userList: UserInterface[]; // Used to display list of users
  editState: boolean;
  errorMessage = '';

  constructor(private config: NgbModalConfig,
              private modalService: NgbModal,
              private toast: ToastrService,
              private userService: UserService,
              public authService: AuthService) {

    // Customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  // Initialises the users object with default values
  ngOnInit(): void {
    this.readUsersList();
    this.user = new User('', '', '', '', '', '');
  }

  // Opens modal window for create user
  openCreateUser(content) {
    this.modalService.open(content);
  }

  // Creates new task for the user
  createUser(userContent: NgForm) {
    this.errorMessage = '';
    if (this.validateForm(userContent)) {
      this.userService.createUser(userContent.value);
      this.showCreate();
    }
    this.user = new User('', '', '', '', '', '');
  }

  // gets list of users
  readUsersList() {
    this.userService.getUsers().subscribe(users => {
      this.userList = users;
    });
  }

  openUpdateUser(event, user: UserInterface) {
    this.editState = true;
    this.user = user;
  }

  updateUser(user: UserInterface) {
    this.userService.updateUser(user);
    this.clearState();
    this.showUpdate();
  }

  deleteUser(event, user: UserInterface) {
    this.userService.deleteUser(user);
    this.clearState();
    this.showDelete();
  }

  // used to clear input
  clearState() {
    this.editState = false;
    this.user = new User('', '', '', '', '', '');
  }

  // messages for CRUD
  showCreate() {
    this.toast.success('User Added');
  }

  showUpdate() {
    this.toast.info('User Update');
  }

  showDelete() {
    this.toast.error('User Deleted');
  }

  // custom validator for create user form
  validateForm(userContent: NgForm) {

    if (userContent.value.firstname.length === 0) {
      this.errorMessage = 'please enter a firstname';
      return false;
    }

    if (userContent.value.phone.length <= 8) {
      this.errorMessage = 'phone number should be at least 8 numbers';
      return false;
    }

    this.errorMessage = '';
    return true;
  }

}
