import { ChangeDetectorRef, Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { isPartiallyEmittedExpression } from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private readonly dbPath = "/images";

  imgRef: AngularFireList<any>;

  constructor(
    private db: AngularFireDatabase
  ) { 
    this.imgRef = db.list(this.dbPath);
  }

  createPIN() {
    //TODO PIN generation
    return this.imgRef.update("1111", {img: ""});
  }

  get(pin: number) {
    let img: any;
    this.db.object(this.dbPath+"/1111").valueChanges().subscribe((val: any) => {
      img = val["img"];
      console.log(img);
    })
    return img;
  }
}
