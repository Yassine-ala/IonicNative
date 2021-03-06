import {Component} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';

import {NativeStorage} from "@ionic-native/native-storage";
import {SqliPage} from "../sqli/sqli";
import {MapsPage} from "../maps/maps";
import {QrcodePage} from "../qrcode/qrcode";
import {MediaPage} from "../media/media";
import {TextzonePage} from "../textzone/textzone";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  name: string;
  surname: string;
  years: number;

  constructor(public navCtrl: NavController,
              private nativeStorage: NativeStorage,
              private alertCtrl: AlertController) {}

  //PageSwitch
  switchqrpage(){
    this.navCtrl.push(QrcodePage);
  }
  switchmediapage(){
    this.navCtrl.push(MediaPage);
  }
  switchdbpage(){
  this.navCtrl.push(SqliPage);
  }
  switchmpage(){
    this.navCtrl.push(MapsPage);
  }
  textzonepage() {
    this.navCtrl.push(TextzonePage);
  }

  //NativeStorage
  storeAlert() {
    let alert = this.alertCtrl.create({
      title: 'Card Saved',
      subTitle: 'Data Saved and secured !!',
      buttons: ['Ok']
    });
    alert.present();
  }
  getAlert(a: string, b: string, c: number) {
    let alert = this.alertCtrl.create({
      title: 'Your Card',
      subTitle: "\n name : "+a+"\n surname : "+b+"\n years : "+c,
      buttons: ['Thanks']
    });
    alert.present();
  }
  public storeIdentity(): void {
    this.nativeStorage.setItem('my-identity-card',{
      name: this.name,
      surname: this.surname,
      years: this.years
    })
      .then(
        () => this.storeAlert(),
        error => console.error('Error storing item', error)
      );
    this.name="";
    this.surname="";
    this.years=null;
  }
  public getIdentity(): void {
    this.nativeStorage.getItem('my-identity-card')
    .then(
      data => {
    this.getAlert(data.name, data.surname, data.years);
   },
    error => console.error('Error storing item', error)
  );
}


}
