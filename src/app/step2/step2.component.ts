import { Component, OnInit, ViewChild } from '@angular/core';
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

  colHeaders: string[] = [];
  contextMenu = {
    items: {
      col_left: {},
      col_right: {},
      sep1: Handsontable.default.plugins.ContextMenu.SEPARATOR,
      clear_column: {},
      sep2: Handsontable.default.plugins.ContextMenu.SEPARATOR,
      rename_col: {
        name: "Rename Column",
        submenu: {
          items: [
            {
              key: "rename_col:id",
              name: "ID",
              callback: (key: any, selection: any, clickEvent: any) => {
                this.colHeaders[selection[0]["start"]["col"]] = "ID";
                this.hot.hotInstance.render();
              },
            },
            {
              key: "rename_col:x",
              name: "X",
              callback: (key: any, selection: any, clickEvent: any) => {
                this.colHeaders[selection[0]["start"]["col"]] = "X";
                this.hot.hotInstance.render();
              },
            },
            {
              key: "rename_col:y",
              name: "Y",
              callback: (key: any, selection: any, clickEvent: any) => {
                this.colHeaders[selection[0]["start"]["col"]] = "Y";
                this.hot.hotInstance.render();
              },
            }
          ]
        }
      }
    }
  };

  @ViewChild('hot') hot: any;
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
    let length: number = -1;
    for(let line of this.dataset) {
      length = Math.max(length, line.length);
    }
    const headers = ["ID", "X", "Y"]
    for(let i = 0; i < length; i++){
      this.colHeaders.push(headers[i%3]);
    }
  }

  public back(): void {
    this.router.navigate(['/step1']);
  }

  public next(): void {
    let data = this.hot.hotInstance.getData();
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
