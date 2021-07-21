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
      // this.loading = true;
      this.rest.doOCR(this.currentInput).then((resp: any) => console.log(resp["ParsedResults"][0]["TextOverlay"]["Lines"]));
    }
  }
}
