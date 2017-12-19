import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EstablishmentsPage } from '../establishments/establishments';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the SubcategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subcategories',
  templateUrl: 'subcategories.html',
})
export class SubcategoriesPage{
  items:  Array<string>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    var id = navParams.get('id');
  }
  ionViewDidLoad() {
    this.http.get("http://localhost:8000/subcategories/list/"+ id).map(res => res.json())
    .subscribe(data => {
      this.items = data.dados;
    }); 
  }
 
  Establishments() {
    this.navCtrl.push(EstablishmentsPage);
  }
}
