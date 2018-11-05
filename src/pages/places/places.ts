import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { BasicPage } from '../login/login-modal';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the PlacesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-places',
  templateUrl: 'places.html',
})
export class PlacesPage {
  id: any;
  comentarios: any;
  imagem: string;
  desc: string;
  nome: string;
  status: string;
  aberto: string;
  fechado: string;
  instagram: string;
  facebook: string;
  vazio: boolean;
  logado: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public modalCtrl: ModalController) {
    this.id = this.navParams.get('id');
  }

  ionViewDidLoad() {
    this.comentarios = [
      { imagem: 'avatar1.png', usuario: 'Dillan Kenner', comentario: 'Amei o ambiente' },
      { imagem: 'avatar2.png', usuario: 'Joyce', comentario: 'Otimos Preços' },
      { imagem: 'avatar3.png', usuario: 'Rafael', comentario: 'Tive dificuldade de encontrar' }
     
    ];
    
    var user = localStorage.getItem("user");
    console.log(user);
    if(user){
      this.logado = true;
    } else{
      this.logado = false;
    }

    this.http.get("http://listfacil.com/api/public/establishments/"+this.id).map(res => res.json())
    .subscribe(data => {
      if(data.status == "true"){
        this.vazio = true;
        this.imagem = data.data.imagem;
        this.desc = data.data.desc;
        this.nome = data.data.nome;
        this.status = data.data.status;
        this.aberto = data.data.aberto;
        this.fechado = data.data.fechado;
        this.instagram = data.data.instagram;
        this.facebook = data.data.facebook;
      }else{
        this.vazio = false;
      }

    }); 

    
  }
 

  openModal() {
    const modal = this.modalCtrl.create(BasicPage);
    modal.present();
  }
}

