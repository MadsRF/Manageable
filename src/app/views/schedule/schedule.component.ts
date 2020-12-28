import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbDateStruct, NgbCalendar, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import {Schedule, ScheduleInterface} from '../../models/schedule';
import {ScheduleService} from '../../services/schedule/schedule.service';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../services/auth/auth.service';


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
  editState: boolean;

  constructor(private config: NgbModalConfig,
              private modalService: NgbModal,
              private calendar: NgbCalendar,
              private scheduleService: ScheduleService,
              private toast: ToastrService,
              public authService: AuthService) {

    // Customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  // Initialises the schedule object with default values
  ngOnInit(): void {
    this.readSchedulesList();
    this.schedule = new Schedule('', '', this.dateModel, '00:00');
  }

  // Opens modal window for create schedule
  openCreateSchedule(content) {
    this.modalService.open(content);
  }

  // Creates new task for the schedule
  createSchedule(scheduleContent: NgForm) {
    if (scheduleContent.valid) {
      this.scheduleService.createSchedule(scheduleContent.value);
      this.showCreate();
    }
    this.schedule = new Schedule('', '', this.dateModel, '00:00');
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
    this.schedule = new Schedule('', '', this.dateModel, '00:00');
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

  // TODO: button for picking today's date
  // Gives to current day in the datepicker
  // selectToday() {
  //   this.dateModel = this.calendar.getToday();
  // }


}
