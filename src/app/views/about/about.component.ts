import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  src = '../../../assets/pdf/CV.pdf'; // points to the pdf

  constructor() {
  }

  ngOnInit(): void {
  }

}
