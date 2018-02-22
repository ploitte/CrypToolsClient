import { Injectable } from '@angular/core';
import { PopoverController , Events } from 'ionic-angular';




/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class toastTools {

    popOv:any;

  constructor(
    public popOver: PopoverController ,
    public events: Events){}


    start(){
        this.popOv = this.popOver.create(PopoverPage);
    }


}