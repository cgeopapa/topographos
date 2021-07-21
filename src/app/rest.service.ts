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

    let params = new HttpParams();
    params = params.append("OCREngine", 2)
    params = params.append("isTable", true)

    const resp = await this.http.post(this.url, formData, {
      params: params,
      headers: { 'apikey': "c268f6d4d188957" },
      observe: 'response'
    }).toPromise();
    return resp.body;
  }
}
