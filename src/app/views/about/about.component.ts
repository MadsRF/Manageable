import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  src = '../../../assets/pdf/CV.pdf';

  constructor() {
    console.log('about');
  }

  ngOnInit(): void {
  }

}
