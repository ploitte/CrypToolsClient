import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalApiProvider } from "../local-api/local-api";



/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InfoUser{

  constructor(public http: HttpClient, public localApi: LocalApiProvider) {}


    getFavoris(id:number){

       return this.localApi.postSecure("getFavoris", {
            id: id
        });
    }

    postFavoris(id:number, data:any){

        return this.localApi.postSecure("addFavoris", {
            idUser: id,
            favoris: data
        });
    }

}