import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { List } from 'ionic-angular/components/list/list';
import { SubcategoriesPage } from '../subcategories/subcategories';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {}

  SubCategories() {
    this.navCtrl.push(SubcategoriesPage);
  }
}
