import { HttpClient } from '@angular/common/http';
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

constructor(public http: HttpClient) {}


AllCurrencie(parameters ?:any){
    return this.http.get(this.urlBase, {
        params: parameters
    })
}


}
