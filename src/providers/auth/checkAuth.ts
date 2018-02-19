import {Storage} from "@ionic/storage";
import {Injectable} from "@angular/core";
import { LocalApiProvider } from "../local-api/local-api";


@Injectable()
export class CheckAuth {


  constructor(public storage: Storage,
    public localApi: LocalApiProvider){}


    checkAuthentified(): Promise <any>{
        return new Promise(resolve=>{
          
          this.storage.get("user").then(data=>{

            if(data){

              this.localApi.post("checkAuth", {
                token: data.token
              }).subscribe(response=>{
              
                if(response["message"] == "good"){
                  resolve(true);
                }else{
                  resolve(false);
                }
              });

            }else{
              resolve(false);
            }

          });
        })
    }
}
