import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../databse.service';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class MobileComponent implements OnInit {

  pin: string = "";

  constructor(
    private db: DatabaseService
  ) { }

  ngOnInit(): void {
  }

  async checkPIN() {
    console.log(await this.db.exists(this.pin));
  }

}
