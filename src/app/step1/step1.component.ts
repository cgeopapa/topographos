import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { ParserService } from '../parser.service';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component implements OnInit {

  loading = false;
  croppedImage: any = null;
  imageChangedEvent: any = '';

  rotation: number = 0;
  imgTransform: ImageTransform = {};

  constructor(
    private rest: RestService,
    private parser: ParserService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  exit(): void {
    this.router.navigate([""]);
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  onRotationChange(event: any) {
    this.imgTransform = {rotate: event.currentTarget.value};
  }

  onFileSelected(event: any) {
    // this.currentInput = event.target.files[0];
    this.imageChangedEvent = event;
  }

  async submit() {
    if(this.croppedImage) {
      this.loading = true;
      
      let parsedCSV: string[][] = [];
      sessionStorage.setItem("croppedImage", this.croppedImage);
      this.rest.doOCR(this.croppedImage).then(
        (resp: any) => {
          parsedCSV = this.parser.parse(resp);
          sessionStorage.setItem("parsedResults", JSON.stringify(parsedCSV));
          this.router.navigate(['/step2']);
        });
    }
  }
}
