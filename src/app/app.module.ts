import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';


import { AuthProvider } from '../providers/auth/auth';
import { HttpClientModule } from "@angular/common/http";
import { LocalApiProvider } from "../providers/local-api/local-api";
import { NativeStorage } from "@ionic-native/native-storage";
import { CheckAuth } from '../providers/auth/checkAuth';
import { MarketCap } from '../providers/market/marketCap';
import { loadingTools } from '../providers/Tools/loading';
import { toastTools } from '../providers/Tools/toast';
import { MoneyProvider } from '../providers/maintenance/money';
import { FavorisProvider } from '../providers/User/favoris';





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
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

    //MyProvider

    LocalApiProvider,
    CheckAuth,
    AuthProvider,
    MarketCap,
    FavorisProvider,
    MoneyProvider,

    //Other
    NativeStorage,
    loadingTools,
    toastTools,

  ],
})
export class AppModule {}
