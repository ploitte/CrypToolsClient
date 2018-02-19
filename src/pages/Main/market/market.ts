import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { MarketCap } from '../../../providers/market/marketCap';
import { loadingTools } from '../../../providers/Tools/loading';
import { Storage } from '@ionic/storage';
import { CheckAuth } from '../../../providers/auth/checkAuth';
import { MoneyProvider } from '../../../providers/maintenance/money';
import { FavorisProvider } from '../../../providers/User/favoris';

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
  currencies:any;
  
  //SearchBar
  searchBar:string;

  //Sort pipe
  selectedCol:string;
  selectedFlag:boolean = false;
  selectedDirection:number = 1;

  //Favoris
  favoris:any[] = [];
  favorisFlag:boolean;




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
        let dataUser = data.currentUser;
        this.user = dataUser;
        this.rights = dataUser.rights;
      }

    })

    //Check if Auth
    this.checkAuth.checkAuthentified().then(data=>{
      if(data == false){
        this.navCtrl.setRoot("loginPage");
      }
    })   

    //Get market Cap
    this.getCurrencies();


  }

  //Get all currencies
  getCurrencies(){
    this.loadingTools.start();
    this.marketCap.AllCurrencie().subscribe(response =>{

      if(response != null){

          this.currencies = response;
          this.getFavoris();
          this.loadingTools.stop();

      }else{
        //Error here
      }
    })
  }
  
  //Get favoris of user
  getFavoris(){
    this.favoris = [];
    this.favorisProvider.actionFavoris("get", this.user.id).subscribe(response=>{
      let flag = true;
      this.loadingTools.start();

      for(let key in response){
        for(let key2 in this.currencies){
          if(response[key].name === this.currencies[key2].id){
            this.favoris.push(this.currencies[key2]);
            flag = false;
          }
        }
      }

      if(!flag){
        this.loadingTools.stop();
        console.log(this.favoris);
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
      if(currencie.id === this.favoris[key].id){
        flag = false;
        indice = parseInt(key);
      }else{
        flag = true;
      }
    }

    if(flag === true){
      this.favoris.push(currencie);
      this.favorisProvider.actionFavoris("add", this.user.id, currencie.id).subscribe(response=>{
        this.loadingTools.stop();
        console.log(response);
      });
    }else{
      this.favoris.splice(indice, 1);
      this.favorisProvider.actionFavoris("delete", this.user.id, currencie.id).subscribe(response=>{
        this.loadingTools.stop();
        console.log(response);
      })
    }

  }


}
