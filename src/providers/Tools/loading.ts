import { Injectable } from '@angular/core';
import { LoadingController, Events } from 'ionic-angular';




/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class loadingTools {

    loading:any;

  constructor(public loadingCtrl: LoadingController,
    public events: Events) {}


  start(){
        this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
        });
        
        this.loading.present();
    }




  stop(){
    this.loading.dismiss();
    this.events.publish('data:receive', "testEvent");
  }


}