import { Component } from '@angular/core';
import { PlacesPage } from '../places/places';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

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
  id: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.id = this.navParams.get('id');
  }
  ionViewDidLoad() {
    this.http.get("http://localhost:8000/establishments/favorites/"+this.id).map(res => res.json())
    .subscribe(data => {
      this.items = data.data;
    }); 
  }
   
  Establishments(id) {
    this.navCtrl.push(PlacesPage, {id: id});
  }
  

}
