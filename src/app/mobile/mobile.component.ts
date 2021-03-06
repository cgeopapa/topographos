import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../databse.service';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class MobileComponent implements OnInit {

  pin: string = "";
  img: any = null;
  ready = false;
  send = false;
  buttonText = "Upload"

  private pinFlag = false;
  private imgFlag = false;

  constructor(
    private db: DatabaseService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.forEach(params => {
      if(params.pin) {
        this.pin = params.pin;
        this.checkPIN();
      }
    })
  }

  async checkPIN() {
    const re = /\d{4}/;
    this.pinFlag = re.test(this.pin) && await this.db.exists(this.pin);
  }

  fileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.img = reader.result;
      this.imgFlag = this.img !== null;
      this.ready = this.pinFlag && this.imgFlag;
    }
  }

  start() {
    this.send = true;
    this.buttonText = "Uploading..."
    this.ready = false;
    this.db.uploadImg(this.pin, this.img).then(() => {
      this.send = false;
      this.buttonText = "Upload";
      this.ready = this.pinFlag && this.imgFlag;
      alert("Upload was completed successfully. You should be able to see your photo in the browser app now.");
    });
  }
}
