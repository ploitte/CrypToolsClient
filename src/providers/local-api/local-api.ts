import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the LocalApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocalApiProvider {


  private urlBase = "http://127.0.0.1:8000/api/";
  private headerBase:HttpHeaders;

  constructor(public http: HttpClient, private storage: Storage,) {

    this.storage.get("user").then(data=>{
      if(data){
        this.headerBase = new HttpHeaders({
          'Authorization': 'Bearer ' + data.token,
        });
        // this.headerBase.set('Content-Type', 'application/json');
        // this.headerBase.set("Authorization", "Bearer " + data.token)
      }
    });

  }


  get(endUrl:string, header ?:any, parameters ?:any ){
    ;
    return this.http.get(this.urlBase + endUrl, {
      params:parameters,
      headers: header
    });
  }


  post(endUrl:string, body :any, headers ?:any){
    return this.http.post(this.urlBase + endUrl, body, headers);
  }


  getSecure(endUrl:string, header, parameters ?:any ){
    ;
    return this.http.get(this.urlBase + endUrl, {
      params:parameters,
      headers: this.headerBase
    });
  }


  postSecure(endUrl:string, body:any){
    return this.http.post(this.urlBase + endUrl, body, {
      headers: this.headerBase
    });
  }


  pingSecure(){
    return this.http.get(this.urlBase + "pingSecure", {
      headers: this.headerBase
    });
  }

  ping(){
    return this.http.get(this.urlBase + "ping");   
  }

}
