import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthProvider } from "../../../providers/auth/auth";
import { Storage } from '@ionic/storage';
import { CheckAuth } from '../../../providers/auth/checkAuth';
import { loadingTools } from '../../../providers/Tools/loading';
import { toastTools } from '../../../providers/Tools/toast';
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
  templateUrl: 'login.html'
})
export class LoginPage {

  private formLogin: FormGroup;
  private errors:any;
  private checkRemember:boolean = false;
  private log:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public authProvider: AuthProvider,
    private storage: Storage,
    public checkAuth: CheckAuth,
    public loading:loadingTools,
    public toastTools:toastTools,
    public events: Events) {

    this.formLogin = this.formBuilder.group({
      usernameEmail: ["", Validators.compose([Validators.required])],
      password: ["", Validators.compose([Validators.required])]
    });
    
    //Juste après l'inscription
    let message = navParams.get("message");
    if(message){
      this.toastTools.start(message, 5000, "bottom", true);
    }
    
  }

  ionViewCanEnter(){

    this.checkAuth.checkAuthentified().then(data=>{
      if(data == true){
        this.navCtrl.setRoot("mainTab");
      }
    })

    this.storage.get("remember").then(data => {
      this.log = data;
    })

  }


  submitLogin(){

    this.loading.start();

    this.authProvider.login(this.formLogin.value).subscribe(response =>{

      if(response["message"] == "success"){
        this.loading.stop();
        
        this.storage.set("user", {
          token: response["token"],
          currentUser: response["currentUser"]
        });

        if(this.checkRemember === true){
          this.storage.set("remember", this.formLogin.value);
        }

        this.navCtrl.setRoot("mainTab");
        
      }else{
        this.loading.stop();
        this.errors = response["errors"];
      }   
    });   
  }



  toggleRemember(event){
    if(event.target.checked){
      this.checkRemember = true;
    }else{
      this.checkRemember = false;
    }
  }

  gotToRegister(){
    this.navCtrl.setRoot("registerPage");
  }

  gotToForgotPass(){
    this.navCtrl.setRoot("forgotPassPage");
  }



  toastIt(){
    this.toastTools.start("Salut les gens", 10000, "bottom", true);
  }
}
