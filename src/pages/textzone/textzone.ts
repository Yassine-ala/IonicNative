import { Component } from '@angular/core';
import {AlertController, IonicPage, ModalController} from 'ionic-angular';
import {ImgModal} from "../../modals/img/img.modal";
import {MediaCapture} from "@ionic-native/media-capture";
import {Camera, CameraOptions} from "@ionic-native/camera";

@IonicPage()
@Component({
  selector: 'page-textzone',
  templateUrl: 'textzone.html',
})
export class TextzonePage {

  opened: boolean = false;
  imgPath: string="file:///storage/emulated/0/Pictures/1527168729255.jpg";
  videoPath: string = "file:///storage/emulated/0/DCIM/Camera/20180524_154730.mp4";
  audioPath: string;

  messages = [{
    "userName":"John Wick",
    "type":'pic',
    "date":"4 Jan",
    "ref": this.imgPath
  } ,{
    "userName":"Mick Jagger",
    "type":'text',
    "date":"2 Jan",
    "ref": "Commentaire sur le produit"
  } ,{
    "userName":"Jason Bourne",
    "type":'audio',
    "date":"27 Dec",
    "ref": this.audioPath
  } ,{
    "userName":"James Bond",
    "type":'vid',
    "date":"24 Dec",
    "ref": this.videoPath
  },{
    "userName":"John Wick",
    "type":'pic',
    "date":"4 Jan",
    "ref": this.imgPath
  } ,{
    "userName":"Mick Jagger",
    "type":'text',
    "date":"2 Jan",
    "ref": "Commentaire sur le produit"
  } ,{
    "userName":"Jason Bourne",
    "type":'audio',
    "date":"27 Dec",
    "ref": this.audioPath
  } ,{
    "userName":"James Bond",
    "type":'vid',
    "date":"24 Dec",
    "ref": this.videoPath
  } ] ;

  constructor(private mediaCapture: MediaCapture, private alertCtrl: AlertController,
              public modalCtrl : ModalController, private camera: Camera) {}

  startRecording() {
    this.mediaCapture.captureVideo().then((videoData)=>{
      alert(JSON.stringify(videoData));
      this.videoPath = videoData[0].fullPath;
      console.log(this.videoPath);
    }).catch((e)=>{
      console.log(e);
    });
  }

  // Restricted
  captureImage() {
    this.mediaCapture.captureImage().then((pictureData)=>{
      this.imgPath = pictureData[0].fullPath;
      console.log(this.imgPath);
      alert(JSON.stringify(pictureData));
    }).catch((e)=>{
      console.log(e);
    });
  }

  // More Options for taking pics
  pic(){
    const camOptions: CameraOptions = {
      quality: 80,
      allowEdit: true,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true,
      correctOrientation: true
    };

    this.camera.getPicture(camOptions).then((imageData) => {
          console.log(imageData);
          this.imgPath = imageData;
    }, (err) => {
      // Handle error
    });
  }

  /*openImgModal() {
    let data = { url : this.imgPath };
    let modalImg = this.modalCtrl.create(ImgModal, data);
    modalImg.present();
  }*/

  smartModal(messageType, index) {
    if(messageType == 'pic') {
      let data = {url: this.messages[index].ref, type: 'pic'};
      let modalImg = this.modalCtrl.create(ImgModal, data);
      modalImg.present();
    } else if(messageType == 'text') {
      let data = {url: this.messages[index].ref, type: 'text'};
      let modalImg = this.modalCtrl.create(ImgModal, data);
      modalImg.present();
    } else if(messageType == 'vid') {
      let data = {url: this.messages[index].ref, type: 'vid'};
      let modalImg = this.modalCtrl.create(ImgModal, data);
      modalImg.present();
    } /*else if(messageType == 'audio') {
      let data = {url: this.messages[index].ref, type: 'audio'};
      let modalImg = this.modalCtrl.create(ImgModal, data);
      modalImg.present();
    }*/ else {
      console.log('audio not avaliable yet');
    }
  }

}
