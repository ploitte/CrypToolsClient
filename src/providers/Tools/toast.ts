import { Injectable } from '@angular/core';
import { ToastController, Events } from 'ionic-angular';




/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class toastTools {

    toast:any;

  constructor(private toastCtrl: ToastController,
    public events: Events){}

    start(message:string, time:number, position:string, button:boolean, classToast:string){

        this.toast = this.toastCtrl.create({
            message: message,
            duration: time,
            position: position,
            showCloseButton: button,
            cssClass: classToast
        });
        this.toast.present();
        this.toast.onDidDismiss(() => {
            this.events.publish("toast:closed", true);
        });
    }


}