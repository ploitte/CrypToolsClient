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
          this.loadingTools.stop();

      }else{
        //Error here
      }
    })
  }

  //Sort click title
  orderingBy(col:string){
    this.selectedFlag =! this.selectedFlag;
    this.selectedCol = col;
    this.selectedDirection = this.selectedFlag ? 1 : -1;
  }

  pushMoneys(){
    
      this.moneyProvider.pushMoneys( this.user.id, this.currencies).subscribe(response=>{
        console.log(response);
      });

  }

  clickFavoris(index){
    //Voir flag pierre Plusieur tours de boucle
    let currencie = this.currencies[index];
    // if(this.favoris.length)
    if(this.favoris.length === 0){
        this.favoris.push(currencie);
    }else{
      for(let key in this.favoris){
        if(this.favoris[key].id === currencie.id){
          this.favoris.splice(parseInt(key), 1);

        }else{
          this.favoris.push(currencie);
        }
      }
    }
    console.log(this.favoris);
  }

}
