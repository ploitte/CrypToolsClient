import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the MainPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "mainTab"
})

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {

  marketRoot = 'marketPage'
  alertRoot = 'alertPage'
  walletRoot = 'walletPage'


  constructor(public navCtrl: NavController) {}


}
