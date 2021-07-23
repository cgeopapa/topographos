import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotTableRegisterer } from '@handsontable/angular';
import * as Handsontable from 'handsontable';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component implements OnInit {

  dataset: any;
  croppedImg: string|null = '';
  id: string = "hot-table";

  private hotRegisterer = new HotTableRegisterer();

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.croppedImg = sessionStorage.getItem("croppedImage");
    let data = sessionStorage.getItem("parsedResults");
    if (data) {
      this.dataset = JSON.parse(data);
    }
  }

  public back(): void {
    this.router.navigate(['/step1']);
  }

  public next(): void {
    let data = this.hotRegisterer.getInstance(this.id).getData();
    data = data.filter((line: string[]) => {
      line = line.filter((word: string) => {
        return word !== null
      })
      return line.length !== 0;
    })
    sessionStorage.setItem("parsedResults", JSON.stringify(data));
    this.router.navigate(['/step3']);
  }
}
