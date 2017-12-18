import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SubcategoriesPage } from '../subcategories/subcategories';
/**
 * Generated class for the EstablishmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-establishments',
  templateUrl: 'establishments.html',
})
export class EstablishmentsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstablishmentsPage');
  }

}
