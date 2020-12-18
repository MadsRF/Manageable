import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbDateStruct, NgbCalendar, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import {Schedule, ScheduleInterface} from '../../models/schedule';
import {ScheduleService} from '../../services/schedule/schedule.service';
import {ToastrService} from 'ngx-toastr';


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
              private toastr: ToastrService) {

    // Customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;

  }

  // Initialises the schedule object with default values
  ngOnInit(): void {
    this.schedule = new Schedule('', '', this.dateModel, '00:00');
    this.readSchedulesList();
  }

  // Opens modal window for create schedule
  openCreateSchedule(content) {
    this.modalService.open(content);
  }

  // Creates new task for the schedule
  createSchedule(schedulecontent: NgForm) {
    if (schedulecontent.valid) {
      this.scheduleService.createSchedule(schedulecontent.value);
      this.showCreate();
    }
    this.schedule = new Schedule('', '', this.dateModel, '00:00');
  }

  readSchedulesList() {
    this.scheduleService.getSchedules().subscribe(schedules => {
      console.log('schedules list', schedules);
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

  clearState() {
    this.editState = false;
    this.schedule = new Schedule('', '', this.dateModel, '00:00');
  }

  showCreate() {
    this.toastr.success('Task Added');
  }

  showUpdate() {
    this.toastr.info('Task Update');
  }

  showDelete() {
    this.toastr.error('Task Deleted');
  }

  // TODO: button for picking today's date
  // Gives to current day in the datepicker
  // selectToday() {
  //   this.dateModel = this.calendar.getToday();
  // }


}
