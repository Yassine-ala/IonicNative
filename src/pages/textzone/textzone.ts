import {Component} from '@angular/core';
import {AlertController, IonicPage, ModalController, Platform} from 'ionic-angular';
import {ImgModal} from "../../modals/img/img.modal";
import {MediaCapture} from "@ionic-native/media-capture";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {Media, MediaObject} from "@ionic-native/media";
import {File} from "@ionic-native/file";

@IonicPage()
@Component({
  selector: 'page-textzone',
  templateUrl: 'textzone.html',
})
export class TextzonePage {

  // Product Rating and paths for demo visualisation
  rating: number = 0;
  imgPath: string = "file:///storage/emulated/0/Android/data/io.ionic.starter/cache/1527496976613.jpg";
  videoPath: string = "file:///storage/emulated/0/DCIM/Camera/20180528_101249.mp4";
  audioPath: string = "file:///storage/emulated/0/Android/data/io.ionic.starter/files/record142018151145.mp3";

  // Incremental for username in textMsging
  k: number = 1;

  // Audio
  recording: boolean = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;

  // Button Menu expanding
  expanded: boolean = false;

  messages = [{
    "userName": "John Wick",
    "type": 'pic',
    "date": "4 Jan",
    "ref": this.imgPath
  }, {
    "userName": "Mick Jagger",
    "type": 'text',
    "date": "2 Jan",
    "ref": "Commentaire sur le produit"
  }, {
    "userName": "Jason Bourne",
    "type": 'audio',
    "date": "27 Dec",
    "ref": this.audioPath
  }, {
    "userName": "James Bond",
    "type": 'vid',
    "date": "24 Dec",
    "ref": this.videoPath
  }];

  constructor(private mediaCapture: MediaCapture, private alertCtrl: AlertController, private file: File,
              public modalCtrl: ModalController, private camera: Camera,  public platform: Platform, private media: Media) {
  }

  // Video recording via phone camera
  startRecordingVideo() {
    this.mediaCapture.captureVideo().then((videoData) => {
      //  alert(JSON.stringify(videoData));
      console.log(videoData[0].fullPath);
      this.messages.push({
        "userName": "tempUser " + this.k,
        "type": 'pic',
        "date": this.k + " Jan",
        "ref": videoData[0].fullPath
      });
      this.k++;
    }).catch((e) => {
      console.log(e);
    });
  }

  // Add Crop for taking pics
  pic() {
    const camOptions: CameraOptions = {
      quality: 80,
      allowEdit: true,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true,
      correctOrientation: true
    };

    this.camera.getPicture(camOptions).then((imageData) => {
      console.log("Image Path : " + imageData);
      this.messages.push({
        "userName": "tempUser " + this.k,
        "type": 'pic',
        "date": this.k + " Jan",
        "ref": imageData
      });
      this.k++;
    }, (err) => {
      // Handle error
      console.log(err);
    });
  }

  // Prompt for text comment add
  addTextComment() {
    let prompt = this.alertCtrl.create({
      title: 'Login',
      message: "Add a comment for this product",
      inputs: [
        {
          type: 'textarea',
          name: 'content',
          placeholder: 'Comment'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: data => {
            this.messages.push({
              "userName": "tempUser " + this.k,
              "type": 'text',
              "date": this.k + " Jan",
              "ref": data.content
            });
            this.k++;
            console.log('Add clicked ' + data.content);
          }
        }
      ]
    });
    prompt.present();
  }

  // Redirection based on selected type in the list
  smartModal(messageType, index) {
    if (messageType == 'pic') {
      let data = {url: this.messages[index].ref, type: 'pic'};
      let modalImg = this.modalCtrl.create(ImgModal, data);
      modalImg.present();
    } else if (messageType == 'text') {
      let data = {url: this.messages[index].ref, type: 'text'};
      let modalImg = this.modalCtrl.create(ImgModal, data);
      modalImg.present();
    } else if (messageType == 'vid') {
      let data = {url: this.messages[index].ref, type: 'vid'};
      let modalImg = this.modalCtrl.create(ImgModal, data);
      modalImg.present();
    } else if (messageType == 'audio') {
      let data = {url: this.messages[index].ref, type: 'audio'};
      let modalImg = this.modalCtrl.create(ImgModal, data);
      modalImg.present();
    } else {
      console.log('Error : This is not supposed to trigger !!');
    }
  }

  // We reversed the list in the dom, we reverse the index here in order to get the correct form in modal redirect
  revrseIndex(index) {
   let len = this.messages.length - 1;
     return len - index ;
  }

  // Audio recording section
  startRecordingAudio() {
    if (this.platform.is('ios')) {
      this.fileName = 'record' + new Date().getDay() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.mp3';
      this.filePath = this.file.documentsDirectory + this.fileName;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.fileName = 'record' + new Date().getDay() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.mp3';
      this.filePath = this.file.externalDataDirectory + this.fileName;
      this.audio = this.media.create(this.filePath);
    }
    this.audio.startRecord();
    this.recording = true;
  }

  stopRecordingAudio() {
    this.audio.stopRecord();
    this.messages.push({
      "userName": "tempUser " + this.k,
      "type": 'audio',
      "date": this.k + " Jan",
      "ref": this.filePath
    });
    this.k++;
    this.recording = false;
  }
}
