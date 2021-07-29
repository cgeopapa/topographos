import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../databse.service';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent implements OnInit {

  constructor(
    private router: Router,
    private dbController: DatabaseService
  ) { }

  ngOnInit(): void {
  }

  public begin(): void {
    this.dbController.createPIN().then(() => {
      this.router.navigate(["step1"]) 
    });
  }
}
