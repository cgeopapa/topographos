import { Component, OnInit } from '@angular/core';
import * as Handsontable from 'handsontable';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component implements OnInit {

  dataset: any;

  constructor() { }

  ngOnInit(): void {
    let data = localStorage.getItem("parsedResults");
    if (data) {
      this.dataset = JSON.parse(data);
    }
  }

}
