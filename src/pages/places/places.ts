import { Component, ViewChild, Renderer } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { BasicPage } from '../login/login-modal';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { UserProvider } from '../../providers/user/user';

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

  user : any;
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

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: Http, 
    public userAPI: UserProvider,
    public modalCtrl: ModalController,
    public renderer: Renderer
    // private callNumber: CallNumber
    ) {
    this.id = this.navParams.get('id');
  }

  ionViewDidLoad() {
    this.accordionExapanded = false;
    this.comentarios = [
      { imagem: 'avatar1.png', usuario: 'Dillan Kenner', comentario: 'Amei o ambiente' },
      { imagem: 'avatar2.png', usuario: 'Joyce', comentario: 'Otimos Preços' },
      { imagem: 'avatar3.png', usuario: 'Rafael', comentario: 'Tive dificuldade de encontrar' }
     
    ];
    
    var userObj = this.userAPI.getUser();
    console.log(userObj);
    if(userObj){
      this.logado = true;
      this.user = userObj;
      this.user.img = 'https://graph.facebook.com/'+userObj.id+'/picture?type=small';

    } else{
      this.user.img = 'http://listfacil.com/api/public/images/avatar3.png'
      this.logado = false;
    }
    this.logado = false;
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

  toggleAccordion() {
    this.http.get("http://listfacil.com/api/public/schedules/list/select/"+this.id).map(res => res.json())
    .subscribe(data => {
      this.horarios = data.data;
    }); 

    this.accordionExapanded = !this.accordionExapanded;
    this.icon = this.icon == "ios-arrow-down" ? "ios-arrow-up" : "ios-arrow-down";
  }

  // call(number){
  //   this.callNumber.callNumber("18001010101", true)
  //   .then(res => console.log('Launched dialer!', res))
  //   .catch(err => console.log('Error launching dialer', err));
  // }
}

