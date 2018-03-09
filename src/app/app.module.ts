import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

//Native
import {NativeStorage} from "@ionic-native/native-storage";
import { SQLite } from '@ionic-native/sqlite';
//Pages
import {SqliPage} from "../pages/sqli/sqli";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SqliPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SqliPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
