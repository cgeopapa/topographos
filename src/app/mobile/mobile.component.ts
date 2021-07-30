import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../databse.service';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class MobileComponent implements OnInit {

  pin: string = "";
  send = false;
  img: any = null;

  private pinFlag = false;
  private imgFlag = false;


  constructor(
    private db: DatabaseService
  ) { }

  ngOnInit(): void {
  }

  async checkPIN() {
    const re = /\d{4}/;
    if(re.test(this.pin)){
      this.pinFlag = await this.db.exists(this.pin);
      this.send = this.pinFlag && this.imgFlag;
    }
  }

  fileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.img = reader.result;
      this.imgFlag = this.img !== null;
      this.send = this.pinFlag && this.imgFlag;
    }
  }

  start() {
    this.db.uploadImg(this.pin, this.img);
  }
}
