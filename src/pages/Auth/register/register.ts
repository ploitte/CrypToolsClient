import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { PasswordValidation } from "../../../validators/passwordValidation";
import { AuthProvider } from "../../../providers/auth/auth";
import { loadingTools } from '../../../providers/Tools/loading';


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "registerPage",
  segment: "Register"
})

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private formRegister: FormGroup;
  private errors:any[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public authProvider: AuthProvider,
    public loading:loadingTools) 
    {
      this.formRegister = this.formBuilder.group({
        username: ["", Validators.compose([Validators.required, Validators.maxLength(60)])],
        email: ["", Validators.compose([Validators.required, Validators.email])],
        password: ["", Validators.compose([Validators.required, Validators.minLength(6)])],
        confirmPass: ["", Validators.compose([Validators.required])],
      },{
        validator: PasswordValidation.MatchPassword
      });
    }



  ionViewDidLoad() {
    // console.log('ionViewDidLoad RegisterPage');
  }


  submitRegister(){
    this.loading.start();

    this.authProvider.register(this.formRegister.value).subscribe(response =>{

      if(response["message"] == "success"){
        this.loading.stop();
        
        this.navCtrl.push("loginPage", {
          message: "You are now registered"
        });
        
      }else{
        this.loading.stop();
        this.errors = response["errors"];
      }   
    });
  }



  goToLogin(){
    this.navCtrl.setRoot("loginPage");
  }

}
