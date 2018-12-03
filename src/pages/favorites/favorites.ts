import { Component } from '@angular/core';
import { PlacesPage } from '../places/places';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { UserProvider } from '../../providers/user/user';
import { ModalController } from 'ionic-angular';
import { BasicPage } from '../login/login-modal';

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
  logado;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public http: Http,
              public userAPI: UserProvider,) {

  }
  ionViewDidLoad() {
    this.user = this.userAPI.getUser();
    console.log(this.user);

    this.user = this.userAPI.getUser();
    if (this.user.id) {
      this.logado = true;

      this.http.get("http://listfacil.com/api/public/establishments/favorites/"+this.user.id).map(res => res.json())
        .subscribe(data => {
          this.items = data.data;
        });
    } else {
      this.logado = false;
    }
    console.log(this.user);
  }


  Establishments(id) {
    this.navCtrl.push(PlacesPage, {id: id});
  }

  openModal() {
    const modal = this.modalCtrl.create(BasicPage);
    modal.present();
  }



}
