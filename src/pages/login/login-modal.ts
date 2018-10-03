import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'login-modal',
  templateUrl: 'login-modal.html'
})
export class BasicPage {
  constructor(
    public modalCtrl: ModalController,  
    public viewCtrl: ViewController,
    private alertCtrl: AlertController
    ) { }

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
