import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

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
    let testPin = Math.floor(Math.random() * 10000).toString();
    testPin = ('0000' + testPin).slice(-4);

    return this.imgRef.update("1111", {img: ""});
  }

  get(pin: string) {
    let img: any;
    return this.db.object(this.dbPath+"/"+pin).valueChanges();
  }

  delete(pin: string) {
    this.db.database.ref("images/"+pin+"/img").set("");
  }

  async exists(pin: string) {
    const val = await this.db.database.ref("images/"+pin).once("value")
    return val.val() !== null;
  }

  uploadImg(pin: string, img: string) {
    return this.imgRef.update(pin, {img: img});
  }

  viewImg() {
    return this.db.database.ref("images/1111").once("value");
  }
}
