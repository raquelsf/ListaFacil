import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EstablishmentsPage } from '../establishments-list/establishments';
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
  id: any;
  nome: string;
  vazio: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.id = this.navParams.get('id');
    this.nome = this.navParams.get('nome');
  }
  ionViewDidLoad() {
    this.http.get("http://localhost:8000/subcategories/list/"+this.id).map(res => res.json())
    .subscribe(data => {
      if(data.status == "true"){
        this.vazio = false;
        this.items = data.data;
      }else{
        this.vazio = true;
      }
     
    }); 

  }
 
  Establishments(id, nome) {
    this.navCtrl.push(EstablishmentsPage, {id: id, nome: nome});
  }

  
}
