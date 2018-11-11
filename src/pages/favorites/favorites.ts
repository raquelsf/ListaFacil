import { Component } from '@angular/core';
import { PlacesPage } from '../places/places';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the favoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  items:  Array<string>;
  user: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public userAPI: UserProvider,) {
   
  }
  ionViewDidLoad() {
    this.user = this.userAPI.getUser();
    this.http.get("http://listfacil.com/api/public/establishments/favorites/"+this.user.id).map(res => res.json())
    .subscribe(data => {
      this.items = data.data;
    }); 
  }
   
  Establishments(id) {
    this.navCtrl.push(PlacesPage, {id: id});
  }
  

}
