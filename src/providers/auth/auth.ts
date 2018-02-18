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
export class AuthProvider {

  constructor(public http: HttpClient, public localApi: LocalApiProvider, public storage:Storage) {}


  register(data:any){
    return this.localApi.post("register", data)
  }

  login(data:any){
    return this.localApi.post("login", data);
  }

  logOut(){
    this.storage.get("user").then(data=>{
      if(data){
        this.localApi.post("logOut", {
          token: data.token
        });
      }else{
        return true;
      }

    })
  }




}
