import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the LocalApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MarketCap {


//getAllCurrencie
private urlBase = "https://api.coinmarketcap.com/v1/ticker/";
private urlGlobal = "https://api.coinmarketcap.com/v1/global/";

//Params

private myParam:HttpParams;

constructor(public http: HttpClient) {
    this.myParam = new HttpParams().set('convert', "EUR");
}


AllCurrencie(parameters ?:any){
    return this.http.get(this.urlBase, {
        params: parameters
    });
}

globalData(parameters ?:any){
    return this.http.get(this.urlGlobal, {
        params: this.myParam
    });
}


}
