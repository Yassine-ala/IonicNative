import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';

//Native
import {NativeStorage} from "@ionic-native/native-storage";
import {SQLite} from '@ionic-native/sqlite';
import {GoogleMaps} from "@ionic-native/google-maps";
import { Camera } from '@ionic-native/camera';
import {Media} from "@ionic-native/media";
import {MediaCapture} from "@ionic-native/media-capture";
import { File } from '@ionic-native/file';

//plugins
import {BarcodeScanner} from "@ionic-native/barcode-scanner";

//Pages
import { HomePage } from '../pages/home/home';
import {SqliPage} from "../pages/sqli/sqli";
import {MapsPage} from "../pages/maps/maps";
import {QrcodePage} from "../pages/qrcode/qrcode";
import {MediaPage} from "../pages/media/media";




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SqliPage,
    MapsPage,
    QrcodePage,
    MediaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SqliPage,
    MapsPage,
    QrcodePage,
    MediaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    SQLite,
    GoogleMaps,
    BarcodeScanner,
    File,
    MediaCapture,
    Media,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})

export class AppModule {}
