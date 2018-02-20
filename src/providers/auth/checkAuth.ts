import {Storage} from "@ionic/storage";
import {Injectable} from "@angular/core";
import { LocalApiProvider } from "../local-api/local-api";


@Injectable()
export class CheckAuth {


  constructor(public storage: Storage,
    public localApi: LocalApiProvider){}


    checkAuthentified(token:string): Promise<any>{
         
        let newPromise = new Promise((resolve, reject)=>{

          this.localApi.post("checkAuth", {
            token: token
          }).subscribe(data=>{
            if(data["message"] === "good"){
              resolve("good");
            }else{
              reject("bad");
            }
          });

        });
      return newPromise;
        
    }
}
