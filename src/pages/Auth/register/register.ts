import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { PasswordValidation } from "../../../validators/passwordValidation";
import { AuthProvider } from "../../../providers/auth/auth";
import { NativeStorage } from '@ionic-native/native-storage';


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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public authProvider: AuthProvider,
    private nativeStorage: NativeStorage) 
    {
      this.formRegister = this.formBuilder.group({
        username: ["", Validators.compose([Validators.required, Validators.maxLength(60)])],
        email: ["", Validators.compose([Validators.required, Validators.email])],
        password: ["", Validators.compose([Validators.required, Validators.minLength(6)])],
        confirmPass: ["", Validators.compose([Validators.required])],
      },{
        validator: PasswordValidation.MatchPassword
      });

      // this.nativeStorage.getItem("user").then(data=>console.log(data), error=>console.log(error));
    }



  ionViewDidLoad() {
    // console.log('ionViewDidLoad RegisterPage');
  }


  submitRegister(){
    let loader = this.loadingCtrl.create({content: ""});
    loader.present();

    this.authProvider.register(this.formRegister.value).subscribe(response =>{

      console.log(response);

      if(response["message"] == "success"){
        loader.dismiss();
        
        this.nativeStorage.setItem("user", {
          token: response["token"]
        })
        
      }else{
       loader.dismiss(); 
       
      }   
    });
  }


  goToLogin(){
    this.navCtrl.setRoot("loginPage");
  }

}
