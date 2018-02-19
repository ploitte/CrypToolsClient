import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';




/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class toastTools {

    toast:any;

  constructor(private toastCtrl: ToastController){}


    start(message:string, time:number, position:string, button:boolean){
        this.toast = this.toastCtrl.create({
            message: message,
            duration: time,
            position: position,
            showCloseButton: button
        });
        this.toast.present();
    }


}