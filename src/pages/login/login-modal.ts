import {Component} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {ModalController, ViewController} from 'ionic-angular';

import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook';
import {Http} from '@angular/http';

import {DbProvider} from '../../providers/db/db';
import {UserProvider} from '../../providers/user/user';
import {SQLiteObject, SQLite} from '@ionic-native/sqlite';

import {ConfigurationPage} from '../configuration/configuration';
import {SubcategoriesPage} from "../subcategories/subcategories";

@Component({
  selector: 'login-modal',
  templateUrl: 'login-modal.html'
})
export class BasicPage {

  userdata: {};
  user: any = {};

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    private alertCtrl: AlertController,
    private fb: Facebook,
    private http: Http,
    public userAPI: UserProvider,
    public dbAPI: DbProvider,
    public sqlite: SQLite,
    // public requestAPI: RequestProvider
  ) {
  }


  loginFb() {
    this.fb.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => {
        if (res.status === 'connected') {
          this.getData(res.authResponse.accessToken);
          setTimeout(() => {
            this.http.post("http://listfacil.com/api/public/loginfb", this.userdata).map(res => res.json())
              .subscribe(res => {
                console.log(res);
                this.dbAPI.insertDbValues(res.data);
                this.userAPI.setUser(res.data)
                let alert = this.alertCtrl.create({
                  title: 'Bem-Vindo(a) ' + res.data.name,
                  subTitle: '',
                  buttons: ['Ok']
                });
                alert.present();
              });
          }, 3000);

        } else {
          let alert = this.alertCtrl.create({
            title: 'Erro ao Conectar',
            subTitle: '',
            buttons: ['Ok']
          });
          alert.present();
        }
        console.log('Logged into Facebook!', res);

      })
      .catch(e => console.log('Erro', e));
  }

  getData(access_token: string) {
    let url = 'https:/graph.facebook.com/me?fields=id,name,first_name,last_name,email&access_token=' + access_token;
    this.http.get(url).map(res => res.json()).subscribe(data => {
      console.log('DATA' + data);

      this.userdata = data
    })
  }

  openModal(id) {
    let modal = this.modalCtrl.create(BasicPage, id);
    modal.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  login() {
    this.http.post("http://listfacil.com/api/public/login", this.user).map(res => res.json())
      .subscribe(res => {
        console.log(res);
        if (res.status == "true") {
          this.dbAPI.insertDbValues(res.data);
          this.userAPI.setUser(res.data)
          setTimeout(() => {
            let alert = this.alertCtrl.create({
              title: 'Bem-Vindo(a) ' + res.data.name,
              subTitle: '',
              buttons: ['Ok']
            });
            alert.present();
          }, 2000);
        } else {
          let alert = this.alertCtrl.create({
            title: 'Ops',
            subTitle: 'Usuário ou senha incorretos',
            buttons: ['Ok']
          });
          alert.present();
        }

      });
  }

  create() {
    this.navCtrl.push(ConfigurationPage);
  }
}
