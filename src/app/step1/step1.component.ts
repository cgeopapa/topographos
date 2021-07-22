import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component implements OnInit {

  currentInput: any;
  loading = false;

  constructor(private rest: RestService) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    this.currentInput = event.target.files[0];
  }

  async submit() {
    if(this.currentInput) {
      this.loading = true;
      
      let parsedCSV: string[][] = [];
      // this.rest.doOCR(this.currentInput).then(
      //   (resp: any) => {
      //     for(let line of resp["ParsedResults"][0]["TextOverlay"]["Lines"]) {
      //       let wordsOfLine: string[] = [];
      //       for(let word of line["Words"]) {
      //         wordsOfLine.push(word["WordText"]);
      //       }
      //       parsedCSV.push(wordsOfLine);
      //     }
      //     console.log(parsedCSV);
      //   });
      localStorage.setItem("parsedResults", JSON.stringify(this.rest.ocrtest()))
      let gg = localStorage.getItem("parsedResults");
      if(gg){
        console.log(JSON.parse(gg));
      }
    }
  }
}
