import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { List } from 'ionic-angular/components/list/list';
import { SubcategoriesPage } from '../subcategories/subcategories';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: Array<{name: string, image: string, qtd: string}>;
  
  constructor(public navCtrl: NavController) {

    this.items = [];
    for (let i = 1; i < 4; i++) {
      this.items.push({
        name: 'Alimentação',
        image: 'assets/imgs/food.jpg',
        qtd: '55'
      });
    }

  }

  SubCategories($this) {
    console.log($this);
    
    this.navCtrl.push(SubcategoriesPage);
  }
}
