import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalApiProvider } from "../local-api/local-api";
import { Storage } from '@ionic/storage/dist/storage';



/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MoneyProvider {

  constructor(public http: HttpClient, public localApi: LocalApiProvider, public storage:Storage) {}

    //Voir droit admin coté serveur
    pushMoneys(id:number, money:any){
        return this.localApi.post("addMoney", {
            "id" : id,
            "moneys" : money  
        });
    }

}
