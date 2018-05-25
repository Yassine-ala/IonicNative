import {Component} from "@angular/core";
import {NavParams, ViewController} from "ionic-angular";

@Component({
  selector: "img-modal",
  templateUrl: "./img.modal.html"
})

export class ImgModal {

  msg: string;
  type: string;

  constructor(public viewCtrl : ViewController, public navParams: NavParams) {}

  public closeModal(){
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    this.type = this.navParams.get('type');
    this.msg = this.navParams.get('url');
  }

}
