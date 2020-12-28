import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {NgbCalendar, NgbDateStruct, NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {BoardService} from '../../services/board/board.service';
import {Message, MessageInterface} from '../../models/message';
import {AuthService} from '../../services/auth/auth.service';
import {CompanyuserService} from '../../services/companyuser/companyuser.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  dateModel: NgbDateStruct; // Holds the date structure day/month/year format
  message: Message; // Used for creating a new message object and editing
  messageList: MessageInterface[]; // Used to display list of messages
  user: string; // holds username
  state: boolean; // used for opening and closing "new message" button
  // time = Date.now(); TODO: add time to message and sort by time and date instead of just date


  constructor(private config: NgbModalConfig,
              private modalService: NgbModal,
              private calendar: NgbCalendar,
              private boardService: BoardService,
              private toast: ToastrService,
              public authService: AuthService,
              private companyUserService: CompanyuserService) {
  }

  // On initialization gets executed
  ngOnInit(): void {
    this.readMessageList();
    this.readCompaniesUsers();
  }

  // gets the company user. Used for getting username
  readCompaniesUsers() {
    this.companyUserService.getCompanyUser().subscribe(companyUser => {
      this.user = companyUser[0].firstname;
    });
  }

  // On button click creates object message
  openCreateMessage() {
    this.message = new Message('', '', '', this.dateModel, '');
    this.state = true;
  }

  // Creates new message for board
  createMessage(messageContent: NgForm) {
    if (messageContent.valid) {
      this.message = messageContent.value;
      this.message.date = {
        year: this.calendar.getToday().year,
        month: this.calendar.getToday().month,
        day: this.calendar.getToday().day,
      };
      this.message.user = this.user;
      this.boardService.createMessage(this.message);
      this.showCreate();
    }
    this.message = new Message('', '', '', this.dateModel, '');
  }

  // gets list of messages from the board collection
  readMessageList() {
    this.boardService.getMessages().subscribe(messages => {
      this.messageList = messages;
    });
  }

  // TODO: not implemented
  // openUpdateMessage(event, message: MessageInterface) {
  //   this.state = true;
  //   this.message = message;
  // }
  //
  // updateMessage(message: MessageInterface) {
  //   this.boardService.updateMessage(message);
  //   this.clearState();
  //   this.showUpdate();
  // }

  // delete object, clears input fields and shows delete message
  deleteMessage(event, message: MessageInterface) {
    this.boardService.deleteMessage(message);
    this.clearState();
    this.showDelete();
  }

  // used to clear input
  clearState() {
    this.state = false;
    this.message = new Message('', '', '', this.dateModel, '');
  }

  // messages for CRUD
  showCreate() {
    this.toast.success('Message Added');
  }

  showUpdate() {
    this.toast.info('Message Update');
  }

  showDelete() {
    this.toast.error('Message Deleted');
  }

}
