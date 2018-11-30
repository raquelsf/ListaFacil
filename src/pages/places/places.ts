import {Component, ViewChild, Renderer} from '@angular/core';
import {ModalController} from 'ionic-angular';
import {BasicPage} from '../login/login-modal';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {UserProvider} from '../../providers/user/user';
import {Events} from 'ionic-angular';

// import { CallNumber } from '@ionic-native/call-number';
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
  accordionExapanded = false;
  icon: string = "ios-arrow-down";
  horarios: any;
  novoComentario: string;
  user: any;
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
  favorito: any;
  rating: number = 4;
  totalRating: number = 0;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: Http,
              public userAPI: UserProvider,
              public modalCtrl: ModalController,
              public renderer: Renderer,
              // private callNumber: CallNumber
              public events: Events) {

    this.id = this.navParams.get('id');

    events.subscribe('star-rating:changed', (starRating) => {
      this.rating = starRating;
      this.avaliar();
    });
  }

  ionViewDidLoad() {
    this.accordionExapanded = false;
    this.favorito = 'heart-outline';

    this.user = this.userAPI.getUser();
    console.log("Usuário salvo" + this.user);
    if (this.user.id) {
      this.logado = true;
      this.user = this.user;
    } else {
      this.user.imagem = 'http://listfacil.com/api/public/images/avatar3.png'
      this.logado = false;
    }

    this.http.get("http://listfacil.com/api/public/establishments/" + this.id).map(res => res.json())
      .subscribe(data => {
        if (data.status == "true") {
          this.vazio = true;
          this.imagem = data.data.imagem;
          this.desc = data.data.desc;
          this.nome = data.data.nome;
          this.status = data.data.status;
          this.aberto = data.data.aberto;
          this.fechado = data.data.fechado;
          this.instagram = data.data.instagram;
          this.facebook = data.data.facebook;
          this.favorito = data.data.favorito;
        } else {
          this.vazio = false;
        }

      });
    setTimeout(() => {
      this.getFavoritos();

      this.getComentarios();
      this.getAvaliations();
    }, 4000);
  }

  openModal() {
    const modal = this.modalCtrl.create(BasicPage);
    modal.present();
  }

  toggleAccordion() {
    this.http.get("http://listfacil.com/api/public/schedules/list/select/" + this.id).map(res => res.json())
      .subscribe(data => {
        this.horarios = data.data;
      });

    this.accordionExapanded = !this.accordionExapanded;
    this.icon = this.icon == "ios-arrow-down" ? "ios-arrow-up" : "ios-arrow-down";
  }

  addComentario() {
    let data = {
      'id_usuario': this.user.id, 'id_estabelecimento': this.id, 'comentario': this.novoComentario,
    }
    this.http.post("http://listfacil.com/api/public/comments", data).map(res => res.json())
      .subscribe(res => {
        console.log(res);
      });

    this.getComentarios();

  }

  addFavorito() {
    let data = {
      'id_usuario': this.user.id, 'id_estabelecimento': this.id,
    }
    this.http.post("http://listfacil.com/api/public/establishments/favorites", data).map(res => res.json())
      .subscribe(res => {
        console.log(res);
      });
    this.favorito = 1;
    this.getFavoritos();
  }

  getComentarios() {
    this.http.get("http://listfacil.com/api/public/comments/list/select/" + this.id).map(res => res.json())
      .subscribe(data => {
        this.comentarios = data.data;
      });
  }

  getFavoritos() {
    if (this.favorito == 0) {
      this.favorito = 'heart-outline';
    } else if (this.favorito == 1) {
      this.favorito = 'heart';
    }
  }
  getAvaliations() {
    this.http.get("http://listfacil.com/api/public/avaliations/" + this.id).map(res => res.json())
      .subscribe(data => {
        console.log(data);
        this.rating = data.data.media;
        this.totalRating = data.data.total;
      });
  }

  avaliar(){
    let data = {
      'id_usuario': this.user.id, 'id_estabelecimento': this.id, 'avaliacao': this.rating,
    }
    this.http.post("http://listfacil.com/api/public/avaliations", data).map(res => res.json())
      .subscribe(res => {
        console.log(res);
      });
  }
  // call(number){
  //   this.callNumber.callNumber("18001010101", true)
  //   .then(res => console.log('Launched dialer!', res))
  //   .catch(err => console.log('Error launching dialer', err));
  // }
}

