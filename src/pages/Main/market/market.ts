import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { MarketCap } from '../../../providers/market/marketCap';
import { loadingTools } from '../../../providers/Tools/loading';
import { Storage } from '@ionic/storage';
import { CheckAuth } from '../../../providers/auth/checkAuth';
import { MoneyProvider } from '../../../providers/maintenance/money';
import { FavorisProvider } from '../../../providers/User/favoris';
import { Currencie } from '../../../class/currencie.class';
import { toastTools } from '../../../providers/Tools/toast';

/**
 * Generated class for the MarketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "marketPage",
  segment: "market"
})

@Component({
  selector: 'page-market',
  templateUrl: 'market.html',
})
export class MarketPage {

  //Admin
  rights:number;

  //User
  user:any;

  //Currencies
  currencies:Currencie[] = [];

  //GlobalInfo
  globalInfo:any;
  
  //SearchBar
  searchBar:string;

  //Favoris
  favoris:Currencie[] = [];

  //ButtonMoney
  flagButtonMoney:boolean = false;
  
  //Segment(Onglet)
  appType:string = "market";
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public marketCap: MarketCap,
    public loadingTools:loadingTools,
    private storage: Storage,
    public checkAuth: CheckAuth,
    public events: Events,
    public moneyProvider: MoneyProvider,
    public favorisProvider:FavorisProvider,
    public toastTools:toastTools){}

  ionViewWillEnter(){

    //CheckAdmin
    this.storage.get("user").then(data =>{

      if(data){

        //Get User datas
        let dataUser = data.currentUser;
        this.user = dataUser;
        this.rights = dataUser.rights;


        //Check if Auth
        this.checkAuth.checkAuthentified(data.token).then(success=>{
          console.log("CheckAuth: Good");

          this.getCurrencies();
        }).catch(error=>{
          this.navCtrl.setRoot("loginPage");
          this.storage.remove("user");
        })  
  
      }else{
        this.navCtrl.setRoot("loginPage");
      }
    })
  }

  //Get all currencies
  getCurrencies(){
    this.loadingTools.start();
    this.marketCap.AllCurrencie().subscribe(response =>{

      if(response != null){

          for(let curr in response){
            let currencie = new Currencie(
              response[curr].id,
              response[curr].name,
              response[curr].percent_change_24h,
              response[curr].price_btc,
              response[curr].price_usd,
              response[curr].rank,
              response[curr].symbol
            );

            this.currencies.push(currencie);
          }
        
          this.getFavoris();
          this.marketCap.globalData().subscribe(response=>{
            this.globalInfo = response;
            console.log(this.globalInfo);
          })
          this.loadingTools.stop();
          console.log(this.currencies);

      }else{
        //Error here
      }
    })
  }
  
  //Admin: Add money in bdd
  pushMoneys(){
    this.flagButtonMoney = true;
    this.moneyProvider.pushMoneys( this.user.id, this.currencies).subscribe(response=>{
      if(response["status_code"] === 111){
        this.toastTools.start("Money(s) added", 4000, "bottom", true, "green");
      }else{
        this.toastTools.start("Money already exist", 4000, "bottom", true, "danger");
      }
      this.events.subscribe("toast:closed", (flag)=>{
        this.flagButtonMoney = false;
      })
    });
  }

  //Get User's favorites
  getFavoris(){
    this.favoris = [];
    this.favorisProvider.actionFavoris("get", this.user.id).then(data=>{

      let flag = true;
      this.loadingTools.start();

       if(data === "empty"){
        flag = false;
        console.log("GetFavoris: No favorites");
       }

      for(let key in data){
        for(let key2 in this.currencies){
          if(data[key].name === this.currencies[key2].id){
            this.currencies[key2].isFav = true;
            this.favoris.push(this.currencies[key2]);
            flag = false;
          }
        }
      }

      if(!flag){
        this.loadingTools.stop();
      }

    }).catch(error =>{});
  }

  //Add Supp favorite Toggle
  AddSuppFavoris(index){

    let flag:boolean;
    let indice:number;

    let currencie = (this.appType == "market") ? this.currencies[index] : this.favoris[index];
    let tab = (this.appType == "market") ? this.favoris : this.currencies;

    this.loadingTools.start();

    if(this.favoris.length === 0){
      flag = true;
    }

    for(let key in tab){
      if(tab[key].id === currencie.id){
        flag = false;
        indice = parseInt(key);
        break;
      }else{
        flag = true;
      }
    }
    
    if(flag === true){
      this.favorisProvider.actionFavoris("add", this.user.id, currencie.id).then(data=>{
        if(data === "added"){
          currencie.isFav = true;
          this.favoris.push(currencie);
          this.loadingTools.stop();
          console.log(this.favoris);
        }else{
          this.loadingTools.stop();
        }
        console.log(data);
      }).catch(error=>{});
    }else if(flag === false){
      this.favorisProvider.actionFavoris("delete", this.user.id, currencie.id).then(data=>{
        if(data === "deleted"){
          
          //Ternaire condition
          this.appType == "market" ? (
            this.favoris.splice(indice, 1),
            currencie.isFav = false
          ) : (
            this.favoris.splice(index, 1),
            this.currencies[indice].isFav = false
          )

          this.loadingTools.stop();
        }else{
          this.loadingTools.stop();
        }
      }).catch(error=>{});
    }
  }

  //Segement Toggle
  getAppType(){
    if(this.appType === "market"){
      return this.currencies;
    }else{
      return this.favoris;
    }
  }

}
