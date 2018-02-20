import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { MarketCap } from '../../../providers/market/marketCap';
import { loadingTools } from '../../../providers/Tools/loading';
import { Storage } from '@ionic/storage';
import { CheckAuth } from '../../../providers/auth/checkAuth';
import { MoneyProvider } from '../../../providers/maintenance/money';
import { FavorisProvider } from '../../../providers/User/favoris';
import { Currencie } from '../../../class/currencie.class';

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
  
  //SearchBar
  searchBar:string;

  //Sort pipe
  selectedCol:string;
  selectedFlag:boolean = false;
  selectedDirection:number = 1;

  //Favoris
  favoris:Currencie[] = [];
  favorisFlag:boolean = false;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public marketCap: MarketCap,
    public loadingTools:loadingTools,
    private storage: Storage,
    public checkAuth: CheckAuth,
    public events: Events,
    public moneyProvider: MoneyProvider,
    public favorisProvider:FavorisProvider,){}

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
          this.loadingTools.stop();
          console.log(this.currencies);

      }else{
        //Error here
      }
    })
  }
  
  //Get User's favorites
  getFavoris(){
    this.favoris = [];
    this.favorisProvider.actionFavoris("get", this.user.id).subscribe(response=>{

      let flag = true;
      this.loadingTools.start();

       if(response === "empty"){
        flag = false;
        console.log("GetFavoris: No favorites");
       }

      for(let key in response){
        for(let key2 in this.currencies){
          if(response[key].name === this.currencies[key2].id){
            this.currencies[key2].inFav = true;
            this.favoris.push(this.currencies[key2]);
            flag = false;
          }
        }
      }

      console.log(this.favoris);

      if(!flag){
        this.loadingTools.stop();
      }

    });
  }

  //Sort click title
  orderingBy(col:string){
    this.selectedFlag =! this.selectedFlag;
    this.selectedCol = col;
    this.selectedDirection = this.selectedFlag ? 1 : -1;
  }

  //Admin: Add money in bdd
  pushMoneys(){
    
      this.moneyProvider.pushMoneys( this.user.id, this.currencies).subscribe(response=>{
        console.log(response);
      });

  }

  //Add Supp favorite
  AddSuppFavoris(index){

    let flag:boolean;
    let indice:number;
    let currencie = this.currencies[index];

    this.loadingTools.start();

    if(this.favoris.length === 0){
      flag = true;
    }

    for(let key in this.favoris){
      if(this.favoris[key].id === currencie.id){
        flag = false;
        indice = parseInt(key);
      }else{
        flag = true;
      }
    }

    if(flag === true){
      currencie.inFav = true;
      this.favoris.push(currencie);
      this.favorisProvider.actionFavoris("add", this.user.id, currencie.id).subscribe(response=>{
        this.loadingTools.stop();
        console.log(response);
      });
    }else{
      currencie.inFav = false;
      this.favoris.splice(indice, 1);
      this.favorisProvider.actionFavoris("delete", this.user.id, currencie.id).subscribe(response=>{
        this.loadingTools.stop();
        console.log(response);
      })
    }
    console.log(this.currencies);
    console.log(this.favoris);

  }


}
