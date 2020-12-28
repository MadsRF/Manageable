import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ContactService} from '../../services/contact/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  formGroup: FormGroup; // Used for reactive forms
  state: boolean;

  constructor(private builder: FormBuilder, private contact: ContactService) {
  }

  // Initializes on call of class
  ngOnInit(): void {
    this.formGroup = this.builder.group({
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
      comment: new FormControl('', [Validators.required])
    });
  }

  // Takes data from form and sends to service, resets form afterward.
  onSubmit(FormData) {
    this.state = true;
    this.contact.PostContactMessage(FormData)
      .subscribe(response => {
        console.log(response);
        this.state = false;
        alert('Email was sent');
      }, error => {
        alert('something went wrong');
        console.log({error});
      });
    this.formGroup.reset();

  }
}
