import { Component, Input } from '@angular/core';
import { AuthProvider } from '../../providers/auth/auth';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { CheckAuth } from '../../providers/auth/checkAuth';
import { Storage } from '@ionic/storage/dist/storage';

/**
 * Generated class for the MyHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'my-header',  
  templateUrl: 'my-header.html'
})
export class MyHeaderComponent {

  @Input() title:string;
  @Input() rights:number;

  constructor(public authProvider: AuthProvider,
  public navCtrl: NavController,
  public checkAuth:CheckAuth,
  public storage:Storage) {
  }

  logOut(){
    this.authProvider.logOut();
    this.storage.remove("user");
    this.navCtrl.setRoot("loginPage");
    }

}
