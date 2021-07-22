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

  public ocrtest() {
    return [
      [
        "INAKAE",
        "KOPYDON",
        "OIKoNEAOY",
        "E1",
        "ZE",
        "NOAYrONIKO"
      ],
      [
        "Y2THMA",
        "EEO"
      ],
      [
        "ZHMEIO",
        "X",
        "Y",
        "AnOTAZEIE"
      ],
      [
        "183230,4084232026,4111"
      ],
      [
        "3,28"
      ],
      [
        "4",
        "183231,751",
        "4232023,415"
      ],
      [
        "6,95"
      ],
      [
        "183238,545",
        "4232021,947"
      ],
      [
        "514"
      ],
      [
        "183237,683",
        "4232016,602"
      ],
      [
        "6,70"
      ],
      [
        "183244,2244232015,153"
      ],
      [
        "285244,020|",
        "4232012,5b3"
      ],
      [
        "9",
        "183241,435",
        "4232007,548|"
      ],
      [
        "10",
        "183239,332",
        "4232004,145"
      ],
      [
        "7,00"
      ],
      [
        "183232,334",
        "4232004,014"
      ],
      [
        "8,25"
      ],
      [
        "12",
        "183226,707",
        "4232008,622"
      ],
      [
        "7,10"
      ],
      [
        "183219,6084232008,555"
      ],
      [
        "70"
      ],
      [
        "5",
        "183218,8444252018,195"
      ],
      [
        "4,70"
      ],
      [
        "183214,172",
        "42320017,577"
      ],
      [
        "8,29"
      ],
      [
        "83214,417",
        "4232025,964"
      ],
      [
        "24",
        "63218,",
        "126|",
        "252025,9122"
      ],
      [
        "27",
        "183218,103",
        "4232026,411"
      ],
      [
        "11,89"
      ],
      [
        "183230,408",
        "4232026,411"
      ],
      [
        "2TNONO"
      ],
      [
        "42790TH"
      ]
    ]
  }
}
