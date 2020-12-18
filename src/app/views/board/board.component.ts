import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {NgbCalendar, NgbDateStruct, NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {BoardService} from '../../services/board/board.service';
import {Message, MessageInterface} from '../../models/message';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  dateModel: NgbDateStruct; // Holds the date structure day/month/year format
  message: MessageInterface; // Used for creating a new message object and editing
  messageList: MessageInterface[]; // Used to display list of messages
  state: boolean;

  constructor(private config: NgbModalConfig,
              private modalService: NgbModal,
              private calendar: NgbCalendar,
              private boardService: BoardService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.message = new Message('', '', this.dateModel, '');
    this.readMessageList();
  }

  openCreateMessage(event, message: MessageInterface) {
    this.state = true;
    this.message = message;
  }

  // Creates new task for the schedule
  createMessage(messageContent: NgForm) {
    if (messageContent.valid) {
      this.message = messageContent.value;

      this.message.date = {
        year: this.calendar.getToday().year,
        month: this.calendar.getToday().month,
        day: this.calendar.getToday().day,
      };

      this.boardService.createMessage(this.message);
      this.showCreate();
    }
    this.message = new Message('', '', this.dateModel, '');
  }

  readMessageList() {
    this.boardService.getMessages().subscribe(messages => {
      console.log('messages list', messages);
      this.messageList = messages;
    });
  }

  openUpdateMessage(event, message: MessageInterface) {
    this.state = true;
    this.message = message;
  }

  updateMessage(message: MessageInterface) {
    this.boardService.updateMessage(message);
    this.clearState();
    this.showUpdate();
  }

  deleteMessage(event, message: MessageInterface) {
    this.boardService.deleteMessage(message);
    this.clearState();
    this.showDelete();
  }

  clearState() {
    this.state = false;
    this.message = new Message('', '', this.dateModel, '');
  }

  showCreate() {
    this.toastr.success('Message Added');
  }

  showUpdate() {
    this.toastr.info('Message Update');
  }

  showDelete() {
    this.toastr.error('Message Deleted');
  }

}
