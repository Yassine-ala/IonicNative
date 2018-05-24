import {Component} from '@angular/core';
import {IonicPage, Platform} from 'ionic-angular';
import {Media, MediaObject} from '@ionic-native/media';
import {MediaCapture} from '@ionic-native/media-capture';
import {File} from '@ionic-native/file';

@IonicPage()
@Component({
  selector: 'page-media',
  templateUrl: 'media.html',
})
export class MediaPage {

  recording: boolean = false;
  playing: boolean = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];

  timer: number = 0;
  interval;
  intervall;
  duration: number = -1;

  constructor(private media: Media, private mediaCapture: MediaCapture,
              private file: File, public platform: Platform) {
  }

  getAudioList() {
    if (localStorage.getItem("audiolist")) {
      this.audioList = JSON.parse(localStorage.getItem("audiolist"));
      console.log(this.audioList);
    }
  }

  ionViewWillEnter() {
    this.getAudioList();
  }

  startRecord() {
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

  stopRecord() {
    this.audio.stopRecord();
    this.audio.play();
    this.audio.setVolume(0.0);
    this.duration = -1 ;
    let self = this;
    this.interval = setInterval(function () {
      if (self.duration == -1) {
        self.duration = self.audio.getDuration();
      } else {
        self.audio.stop();
        let data = {filename: self.fileName, duration: self.duration};
        self.audioList.push(data);
        self.audio.release();
        localStorage.setItem("audiolist", JSON.stringify(self.audioList));
        self.recording = false;
        self.getAudioList();
        console.log("done1");
        clearInterval(self.interval);
      }
    }, 100);
  }

  playAudio(file, idx) {

    if (this.platform.is('ios')) {
      this.filePath = this.file.documentsDirectory + file;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.filePath = this.file.externalDataDirectory + file;
      this.audio = this.media.create(this.filePath);
    }
    this.audio.play();
    this.audio.setVolume(0.8);
    let self = this;
    //this.duration = Math.trunc(this.duration);
    this.intervall = setInterval(function () {
      console.log(self.duration);
      if (self.timer < self.duration) {
        self.timer += 1;
      } else {
        self.timer = 0;
        clearInterval(self.intervall);
      }
    }, 1000);
  }

  deleteAudio(file, idx) {

    if (this.platform.is('ios')) {
      this.filePath = this.file.documentsDirectory;
    } else if (this.platform.is('android')) {
      this.filePath = this.file.externalDataDirectory;
    }
    this.audioList.splice(idx, 1);
    localStorage.setItem("audiolist", JSON.stringify(this.audioList));
    console.log(this.filePath);
    this.file.removeFile(this.filePath, file).catch((e) => console.error(e));
  }
}

