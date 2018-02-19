import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalApiProvider } from "../local-api/local-api";



/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavorisProvider{

  constructor(public http: HttpClient, public localApi: LocalApiProvider) {}

  actionFavoris(type:string, id:number, name:string){
    return this.localApi.postSecure(type+"Favoris", {
      id : id,
      name: name
    });
  }


}