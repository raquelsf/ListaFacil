import { Component } from '@angular/core';
import { PlacesPage } from '../places/places';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

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
  items:  Array<string>;
  id: any;
  nome: string;
  vazio: boolean;
  descending: boolean = false;
  order: number;
  column: string = 'nome';
  terms: string = '';
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.id = this.navParams.get('id');
    this.nome = this.navParams.get('nome');
  }
  ionViewDidLoad() {
    this.http.get("http://listfacil.com/api/public/establishments/list/"+this.id).map(res => res.json())
    .subscribe(data => {
      if(data.status == "true"){
        this.vazio = false;
        this.items = data.data;
      }else{
        this.vazio = true;
      }
    }); 
  }
 
  Establishments(id) {
    this.navCtrl.push(PlacesPage, {id: id});
  }
  sort(){
    this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }

}
