import { Injectable } from '@angular/core';
import { DOC_ORIENTATION, NgxImageCompressService } from 'ngx-image-compress';

@Injectable({
  providedIn: 'root'
})
export class CompressService {
  private originalSize: number = 0;
  private compSize: number = 0;

  constructor(
    private imageCompress: NgxImageCompressService
  ) { }

  public async compressImage(image64: string): Promise<string> {
    this.originalSize = this.imageCompress.byteCount(image64);
    this.compSize = this.originalSize;

    let size = 100;
    let compImageTemp = '';

    for(let step = 50; step > 1; step/=2) {
      if (this.compSize >= 1000000) {
        size -= step;
      } else {
        size += step;
      }
      await this.imageCompress.compressFile(image64, DOC_ORIENTATION.Up, size, size).then(
        result => {
          compImageTemp = result;
          this.compSize = this.imageCompress.byteCount(compImageTemp);
        });
    }
    if(this.compSize > 1000000) {
      while(this.compSize > 1000000) {
        size-=0.25;
        await this.imageCompress.compressFile(image64, DOC_ORIENTATION.Up, size, size).then(
          result => {
            compImageTemp = result;
            this.compSize = this.imageCompress.byteCount(compImageTemp);
          });
        }
    }
    return compImageTemp;
  }
}
