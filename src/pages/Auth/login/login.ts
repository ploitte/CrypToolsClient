import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "loginPage",
  segment: "Login"
})

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private formLogin: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.formLogin = this.formBuilder.group({
      username: ["", Validators.compose([Validators.required])],
      password: ["", Validators.compose([Validators.required])]
    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad LoginPage');
  }



  gotToRegister(){
    this.navCtrl.setRoot("registerPage");
  }

}
