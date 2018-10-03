import { Component } from '@angular/core';
import { PlacesPage } from '../places/places';

import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PromotionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-promotions',
  templateUrl: 'promotions.html',
})
export class PromotionsPage {
  items: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
  }

  
  ionViewDidLoad() {
    this.items = [
      { imagem: 'promo.jpg', id_establishment: '2'},
      { imagem: 'promo1.jpg', id_establishment: '2'},
      { imagem: 'promo2.jpg', id_establishment: '2'},
      { imagem: 'promo3.jpg', id_establishment: '2'},
      { imagem: 'promo4.jpg', id_establishment: '2'},
      { imagem: 'promo5.jpg', id_establishment: '2'}
     
    ];
  }

  Establishments(id) {
    this.navCtrl.push(PlacesPage, {id: id});
  }
  

}
