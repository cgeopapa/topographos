import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component implements OnInit {

  id: string = "download";

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public back(): void {
    this.router.navigate(['/step2']);
  }

  public download(): void {
    this.downloadFile();
  }

  private createData(): string {
    const data = JSON.parse(sessionStorage.getItem("parsedResults")!);
    let scr = "_MULTIPLE _POINT\n"
    data.forEach((line: string[]) => {
      scr = scr.concat(`${line[0]},${line[1]}\n`);
    });
    return scr;
  }
  
  private downloadFile(): void {
    const blob = new Blob([this.createData()], {type: 'text/scr'});
    const url = window.URL.createObjectURL(blob);
    const el = document.createElement('a');
    el.href = url;
    el.download = "topographos.scr";
    el.click();
  }
}
