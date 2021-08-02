import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ImageCroppedEvent, ImageCropperComponent, ImageTransform } from 'ngx-image-cropper';
import { CompressService } from '../compress.service';
import { DatabaseService } from '../databse.service';
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
  uploadedImage: string = "";
  imageChangedEvent: any = '';

  @ViewChild("cropper")
  cropper: any;

  rotation: number = 0;
  imgTransform: ImageTransform = {};

  constructor(
    private rest: RestService,
    private parser: ParserService,
    private router: Router,
    private db: DatabaseService,
    private compressService: CompressService
    ) { }

  ngOnInit(): void {
    this.db.get("1111").subscribe((val: any) => {
      this.cropper.imageBase64 = this.uploadedImage;
      this.uploadedImage = val["img"];
      this.db.delete("1111");
    });
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
    this.imageChangedEvent = event;
  }

  async submit() {
    if(this.croppedImage) {
      this.loading = true;

      const compressedImage = await this.compressService.compressImage(this.croppedImage);
      
      let parsedCSV: string[][] = [];
      sessionStorage.setItem("croppedImage", compressedImage);
      this.rest.doOCR(compressedImage).then(
        (resp: any) => {
          parsedCSV = this.parser.parse(resp);
          sessionStorage.setItem("parsedResults", JSON.stringify(parsedCSV));
          this.router.navigate(['/step2']);
        });
    }
  }
}
