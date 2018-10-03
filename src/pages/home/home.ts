import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SubcategoriesPage } from '../subcategories/subcategories';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items:  Array<string>;
  private url: string = "http://localhost:8000/categories";  
  
  constructor(public navCtrl: NavController, public http: Http) {
    
    this.http.get(this.url).map(res => res.json())
      .subscribe(data => {
        this.items = data.data;
      }); 

  }

  SubCategories(id, nome) {
    this.navCtrl.push(SubcategoriesPage, {id: id, nome: nome});
  }
}
