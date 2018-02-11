import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { AuthProvider } from '../providers/auth/auth';
import { HttpClientModule } from "@angular/common/http";
import { LocalApiProvider } from "../providers/local-api/local-api";
import { NativeStorage } from "@ionic-native/native-storage";



@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
       tabsHideOnSubPages: true,
    }),
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalApiProvider,
    AuthProvider,
    NativeStorage
  ]
})
export class AppModule {}
