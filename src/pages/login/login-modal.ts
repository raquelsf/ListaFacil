import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { ModalController, ViewController } from 'ionic-angular';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'login-modal',
  templateUrl: 'login-modal.html'
})
export class BasicPage {
  
  userdata: string;

  constructor(
    public navCtrl:NavController,
    public modalCtrl: ModalController,  
    public viewCtrl: ViewController,
    private alertCtrl: AlertController,
    private fb: Facebook,
    private http: HttpClient
    ) { }

  
  loginFb(){
    this.fb.login(['public_profile', 'email'])
    .then((res: FacebookLoginResponse) => {
      if(res.status === 'connected'){
          this.getData(res.authResponse.accessToken);
          let alert = this.alertCtrl.create({
            title: 'Bem-Vindo '+this.userdata,
            subTitle: '',
            buttons: ['Ok']
          });
          alert.present();
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
      this.userdata = JSON.stringify(data);
      localStorage.setItem("user", this.userdata);
      console.log(data);
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
    let alert = this.alertCtrl.create({
      title: 'Bem-Vindo',
      subTitle: '',
      buttons: ['Ok']
    });
    alert.present();
  }

}
