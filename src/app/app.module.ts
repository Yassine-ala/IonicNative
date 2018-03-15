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

//plugins
import {BarcodeScanner} from "@ionic-native/barcode-scanner";

//Pages
import { HomePage } from '../pages/home/home';
import {SqliPage} from "../pages/sqli/sqli";
import {MapsPage} from "../pages/maps/maps";
import {QrcodePage} from "../pages/qrcode/qrcode";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SqliPage,
    MapsPage,
    QrcodePage
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
    QrcodePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    SQLite,
    GoogleMaps,
    BarcodeScanner,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})

export class AppModule {}
