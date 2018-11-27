import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { BasicPage } from '../login/login-modal';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the ConfigurationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-configuration',
  templateUrl: 'configuration.html',
})
export class ConfigurationPage {
  logado = true;
  user;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public userAPI: UserProvider) {
  }

  ionViewDidLoad() {
    this.logado = true;
    this.user ={
      imagem: 'http://listfacil.com/api/public/images/avatar3.png',
      email: 'raquelsfreita@gmail.com',
      senha: '12345',
      nome: 'Raquel Freitas',
    }

    // this.user = this.userAPI.getUser();
    // if(this.user.id){
    //   this.logado = true;
    //   this.user = this.user;
    //   if(!this.user.imagem){
    //     this.user.img = 'http://listfacil.com/api/public/images/avatar3.png'
    //   }
    // } else{
    //   this.logado = false;
    // }
  }



openModal() {
    const modal = this.modalCtrl.create(BasicPage);
    modal.present();
  }


}
