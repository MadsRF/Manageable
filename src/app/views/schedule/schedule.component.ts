import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbDateStruct, NgbCalendar, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import {Schedule, ScheduleInterface} from '../../models/schedule';
import {ScheduleService} from '../../services/schedule/schedule.service';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../services/auth/auth.service';
import {UserService} from '../../services/user/user.service';
import {UserInterface} from '../../models/user';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent implements OnInit {

  dateModel: NgbDateStruct; // Holds the date structure day/month/year format
  date: { year: number, month: number }; // Is for the datepicker month and year selector
  schedule: ScheduleInterface; // Used for creating a new schedule object and editing
  scheduleList: ScheduleInterface[]; // Used to display list of schedules
  userList: UserInterface[] = null; // Used to display list of users
  editState: boolean; // toggles edit window on/off
  errorMessage = ''; // holds error message

  constructor(private config: NgbModalConfig,
              private modalService: NgbModal,
              private calendar: NgbCalendar,
              private scheduleService: ScheduleService,
              private toast: ToastrService,
              private userService: UserService,
              public authService: AuthService) {

    // Customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  // Initialises the schedule object with default values
  ngOnInit(): void {
    this.readSchedulesList();
    this.schedule = new Schedule('', '', this.dateModel, '12:00');
  }

  // Opens modal window for create schedule
  openCreateSchedule(content) {
    this.userService.getUsers().subscribe(users => {
      this.userList = users;
    });
    this.modalService.open(content);
  }

  // Creates new task for the schedule
  createSchedule(scheduleContent: NgForm) {
    console.log(scheduleContent.value);
    this.errorMessage = '';
    if (this.validateForm(scheduleContent)) {
      this.scheduleService.createSchedule(scheduleContent.value);
      this.showCreate();
      this.schedule = new Schedule('', '', this.dateModel, '12:00');
    }
  }

  // gets list of tasks for schedules
  readSchedulesList() {
    this.scheduleService.getSchedules().subscribe(schedules => {
      this.scheduleList = schedules;
    });
  }

  openUpdateSchedule(event, schedule: ScheduleInterface) {
    this.editState = true;
    this.schedule = schedule;
  }

  updateSchedule(schedule: ScheduleInterface) {
    this.scheduleService.updateSchedule(schedule);
    this.clearState();
    this.showUpdate();
  }

  deleteSchedule(event, schedule: ScheduleInterface) {
    this.scheduleService.deleteSchedule(schedule);
    this.clearState();
    this.showDelete();
  }

  // used to clear input
  clearState() {
    this.editState = false;
    this.schedule = new Schedule('', '', this.dateModel, '');
  }

  // messages for CRUD
  showCreate() {
    this.toast.success('Task Added');
  }

  showUpdate() {
    this.toast.info('Task Update');
  }

  showDelete() {
    this.toast.error('Task Deleted');
  }

  // custom validator for create task form
  validateForm(scheduleContent: NgForm) {

    if (scheduleContent.value.task.length === 0) {
      this.errorMessage = 'please enter a task';
      return false;
    }

    if (scheduleContent.value.user.length === 0) {
      this.errorMessage = 'please pick an employee';
      return false;
    }

    if (scheduleContent.value.date === undefined) {
      scheduleContent.value.date = {
        day: 0,
        month: 0,
        year: 0,
      };
      this.errorMessage = 'please enter a date';
      return false;
    }

    this.errorMessage = '';
    return true;
  }

  // TODO: button for picking today's date
  // Gives to current day in the datepicker
  // selectToday() {
  //   this.dateModel = this.calendar.getToday();
  // }


}
