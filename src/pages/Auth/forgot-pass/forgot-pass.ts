import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the ForgotPassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "forgotPassPage",
  segment: "forgot-password"
})

@Component({
  selector: 'page-forgot-pass',
  templateUrl: 'forgot-pass.html',
})
export class ForgotPassPage {

  private formForgot: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
  
    this.formForgot = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])]
    })
  
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad ForgotPassPage');
  }


  goToLogin(){
    this.navCtrl.setRoot("loginPage");
  }

  goToRegister(){
    this.navCtrl.setRoot("registerPage");
  }

  
}
