import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private readonly url: string = "https://api.ocr.space/parse/image";

  constructor(private http: HttpClient) { }

  public async doOCR(img: string) {
    const formData = new FormData();
    formData.append('base64Image', img);
    formData.append("isOverlayRequired", true.toString());
    formData.append("isTable", true.toString());
    formData.append("OCREngine", "2");

    const resp = await this.http.post(this.url, formData, {
      headers: { 'apikey': "c268f6d4d188957" },
      observe: 'response'
    }).toPromise();
    return resp.body;
  }

  public ocrtest() {
    return [
      [
        "183230,408",
        "4232026,411"
      ],
      [
        "183231,751|",
        "4232023,A13"
      ],
      [
        "183238,545",
        "4232021,947"
      ],
      [
        "183237,683",
        "4232016,602"
      ],
      [
        "183244,224",
        "4232015,153"
      ],
      [
        "183244,020",
        "4232012,963"
      ],
      [
        "183241,435",
        "4232007,548"
      ],
      [
        "183239,332",
        "4232004,145"
      ],
      [
        "183232,334",
        "4232004,014"
      ],
      [
        "183226,707",
        "4232008,622"
      ],
      [
        "183219,608",
        "4232008,555"
      ],
      [
        "183218,844",
        "4232018,195|"
      ],
      [
        "183214,172",
        "42320017,677"
      ],
      [
        "183214,417",
        "4232025,964"
      ],
      [
        "183218,126",
        "4232025,912"
      ],
      [
        "183218,103",
        "4232026,411"
      ],
      [
        "183230,408",
        "4232026,411"
      ]
    ]
  }
}
