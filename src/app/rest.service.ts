import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private readonly url: string = "https://api.ocr.space/parse/image";

  constructor(private http: HttpClient) { }

  public async doOCR(img: File) {
    const formData = new FormData();
    formData.append('file', img, img.name);
    formData.append("isOverlayRequired", true.toString());
    formData.append("isTable", true.toString());
    formData.append("OCREngine", "2");

    const resp = await this.http.post(this.url, formData, {
      headers: { 'apikey': "c268f6d4d188957" },
      observe: 'response'
    }).toPromise();
    return resp.body;
  }
}
