import {Component} from '@angular/core';
import {AlertController, ModalController} from 'ionic-angular';
import {BasicPage} from '../login/login-modal';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserProvider} from '../../providers/user/user';
import {Http} from "@angular/http";
import {DbProvider} from "../../providers/db/db";

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
  logado;
  user: any = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public dbAPI: DbProvider,
              private alertCtrl: AlertController,
              private http: Http,
              public userAPI: UserProvider) {
  }

  ionViewDidLoad() {
    this.user = this.userAPI.getUser();
    if (this.user.id) {
      this.logado = true;
    } else {
      this.user.imagem = 'http://listfacil.com/api/public/images/avatar3.png';
      this.logado = false;
    }
    console.log(this.user);
  }

  switchAvatar() {
    var myArray = [
      "http://listfacil.com/api/public/images/avatar1.png",
      "http://listfacil.com/api/public/images/avatar2.png",
      "http://listfacil.com/api/public/images/avatar3.png",
      "http://listfacil.com/api/public/images/avatar4.png",
      "http://listfacil.com/api/public/images/avatar5.png"
    ];
    this.user.imagem = myArray[Math.floor(Math.random() * myArray.length)];
  }

  openModal() {
    const modal = this.modalCtrl.create(BasicPage);
    modal.present();
  }


  onSubmit() {
    console.log(this.user);

    if (this.user.id != 'undefined' && this.user.id != undefined && this.user.id != null) {
      this.updateUser();
    } else {
      this.saveUser()
    }
  }

  saveUser() {
    let formValue = {
      name: this.user.name,
      email: this.user.email,
      imagem: this.user.imagem,
      password: this.user.password,
    }
    this.http.post("http://listfacil.com/api/public/save/user", formValue).map(res => res.json())
      .subscribe(res => {
        if (res.status == 'true') {
          this.user = res.data;
          this.dbAPI.insertDbValues(res.data);
          this.userAPI.setUser(res.data);
          this.logado = true;
          console.log(this.user);
          let alert = this.alertCtrl.create({
            title: "Pronto!",
            subTitle: res.message,
            buttons: ['Ok']
          });
          alert.present();
        }else{
          let alert = this.alertCtrl.create({
            title: "Ops!",
            subTitle: res.message,
            buttons: ['Ok']
          });
          alert.present();
        }
      })
  }

  updateUser() {
    let formValue = {
      id: this.user.id,
      name: this.user.name,
      email: this.user.email,
      imagem: this.user.imagem,
      password: this.user.password,

    }
    this.http.put("http://listfacil.com/api/public/update/user/" + formValue.id, formValue).map(res => res.json())
      .subscribe(res => {
        console.log(res);
        let alert = this.alertCtrl.create({
          title: res.message,
          subTitle: '',
          buttons: ['Ok']
        });
        alert.present();
      })
  }

}
