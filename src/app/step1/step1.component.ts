import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DOC_ORIENTATION, NgxImageCompressService } from 'ngx-image-compress';
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
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
  imageChangedEvent: any = '';

  rotation: number = 0;
  imgTransform: ImageTransform = {};

  constructor(
    private rest: RestService,
    private parser: ParserService,
    private router: Router,
    private db: DatabaseService,
    private imageCompress: NgxImageCompressService,
    private compressService: CompressService
    ) { }

  ngOnInit(): void {
    this.db.get("1111").subscribe((val: any) => {
      this.croppedImage = val["img"];
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
