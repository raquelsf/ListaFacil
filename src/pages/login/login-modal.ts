import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { ModalController, ViewController } from 'ionic-angular';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { HttpClient } from '@angular/common/http';

import { DbProvider } from '../../providers/db/db';
import { UserProvider } from '../../providers/user/user';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite';


@Component({
  selector: 'login-modal',
  templateUrl: 'login-modal.html'
})
export class BasicPage {
  
  userdata: {};

  constructor(
    public navCtrl:NavController,
    public modalCtrl: ModalController,  
    public viewCtrl: ViewController,
    private alertCtrl: AlertController,
    private fb: Facebook,
    private http: HttpClient,
    public userAPI: UserProvider,
    public dbAPI: DbProvider,
    public sqlite: SQLite,
    // public requestAPI: RequestProvider
    ) { }

  
  loginFb(){
    this.fb.login(['public_profile', 'email'])
    .then((res: FacebookLoginResponse) => {
      if(res.status === 'connected'){
       
          this.getData(res.authResponse.accessToken);
          setTimeout( () => {
            this.http.post("http://listfacil.com/api/public/loginfb", this.userdata)
            this.userdata = JSON.stringify(this.userdata);
            
            setTimeout( () => {
              this.dbAPI.insertDbValues(this.userdata);
            }, 5000);
            let alert = this.alertCtrl.create({
              title: 'Bem-Vindo '+this.userdata,
              subTitle: '',
              buttons: ['Ok']
            });
            alert.present();
          }, 5000);
          
      } else{
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

  getData(access_token:string){
    let url = 'https:/graph.facebook.com/me?fields=id,name,first_name,last_name,email&access_token='+ access_token;
    this.http.get(url).subscribe(data => {
      this.userdata = data;
      // localStorage.setItem("user", this.userdata);
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
    
  }

}
