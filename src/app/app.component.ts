import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { FavoritesPage } from '../pages/favorites/favorites';
import { PromotionsPage } from '../pages/promotions/promotions';
import { ConfigurationPage } from '../pages/configuration/configuration';
import { AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private alertCtrl: AlertController,) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'ios-home-outline' },
      { title: 'Promoções', component: PromotionsPage, icon: 'logo-usd' },
      { title: 'Favoritos', component: FavoritesPage, icon: 'ios-star-outline' },
      { title: 'Configurações', component: ConfigurationPage, icon: 'md-settings' },
      { title: 'Sair', component: HomePage, icon: 'md-settings' },
    ];

    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    if(page.title == 'Sair'){
      let alert = this.alertCtrl.create({
        title: 'Você foi desconectado',
        subTitle: '',
        buttons: ['Ok']
      });
      alert.present();
      localStorage.clear();
      this.nav.setRoot(page.component);
    } else{
      this.nav.setRoot(page.component);
    }
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
  }
  
}
