import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EstablishmentsPage } from '../establishments/establishments';

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
items: Array<{title: string, note: string, image: string}>;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.items = [];
    
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        image: 'assets/imgs/food.jpg'
      });
    }
  }

  Subcategories(event, item) {
    console.log("event");
    
    this.navCtrl.push(SubcategoriesPage, {
      item: item
    });
  }
  Establishments() {
    this.navCtrl.push(EstablishmentsPage);
  }
}
