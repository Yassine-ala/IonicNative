import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {BarcodeScanner, BarcodeScannerOptions} from "@ionic-native/barcode-scanner";



@IonicPage()
@Component({
  selector: 'page-qrcode',
  templateUrl: 'qrcode.html',
})

export class QrcodePage {


  barOptions: BarcodeScannerOptions;
  encodText: string='';
  encodeData: any={};
  scannedData:any={};

  img: any;

  constructor(private camera: Camera, private barScanner: BarcodeScanner) {}

  pic(){

    const camOptions: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      //allowEdit: true,
      mediaType: this.camera.MediaType.PICTURE,
      // saveToPhotoAlbum: true
    }

    this.camera.getPicture(camOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.img = base64Image;
    }, (err) => {
      // Handle error
    });
  }


  scanbar(){
    this.barOptions= {
      prompt: 'Scan your barcode'
    };
    this.barScanner.scan(this.barOptions).then((data) => {
      this.scannedData = data;
    }, (err) => {
      console.log('Error :', err);
    })
  }

  encodebar(){
    this.barScanner.encode(this.barScanner.Encode.TEXT_TYPE, this.encodText).then((data) => {
      this.encodeData = data
    }, (err) => {
      console.log('Error :', err);
    })
  }

}
