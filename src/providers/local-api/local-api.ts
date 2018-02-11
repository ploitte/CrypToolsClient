import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the LocalApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocalApiProvider {


  private urlBase = "http://127.0.0.1:8000/api/";

  constructor(public http: HttpClient) {

  }

  get(endUrl:string, parameters ?:any, headers ?:any){
    return this.http.get(this.urlBase + endUrl, {
      params:parameters,
      headers: headers
    });
  }


  post(endUrl:string, body :any, headers ?:any){
    return this.http.post(this.urlBase + endUrl, body, headers);
  }

}
