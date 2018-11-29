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
<<<<<<< HEAD
  logado = true;
  user ={
=======
  logado = false;
  user = {
>>>>>>> 31d01c17b91f01d31b585c44a2e4b69c217a0a31
    imagem: 'http://listfacil.com/api/public/images/avatar3.png',
    email: 'raquelsfreita@gmail.com',
    senha: '12345',
    nome: 'Raquel Freitas',
<<<<<<< HEAD
  };
=======
  }
>>>>>>> 31d01c17b91f01d31b585c44a2e4b69c217a0a31
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public userAPI: UserProvider) {
  }

  ionViewDidLoad() {
<<<<<<< HEAD
=======
    this.user = {
      imagem: 'http://listfacil.com/api/public/images/avatar3.png',
      email: 'raquelsfreita@gmail.com',
      senha: '12345',
      nome: 'Raquel Freitas',
    }

>>>>>>> 31d01c17b91f01d31b585c44a2e4b69c217a0a31
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
    this.user ={
      imagem: 'http://listfacil.com/api/public/images/avatar3.png',
      email: 'raquelsfreita@gmail.com',
      senha: '12345',
      nome: 'Raquel Freitas',
    };
  }



openModal() {
    this.user ={
      imagem: 'http://listfacil.com/api/public/images/avatar3.png',
      email: 'raquelsfreita@gmail.com',
      senha: '12345',
      nome: 'Raquel Freitas',
    };
    const modal = this.modalCtrl.create(BasicPage);
    modal.present();
  }


}
