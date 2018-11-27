import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DbProvider } from '../providers/db/db';
import { UserProvider } from '../providers/user/user';

import { SQLiteObject, SQLite } from '@ionic-native/sqlite';

import { HomePage } from '../pages/home/home';
import { FavoritesPage } from '../pages/favorites/favorites';
import { PromotionsPage } from '../pages/promotions/promotions';
import { ConfigurationPage } from '../pages/configuration/configuration';
import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private alertCtrl: AlertController, 
    public dbAPI: DbProvider, 
    public userAPI: UserProvider, 
    public sqlite: SQLite,
    private http: HttpClient
    ) {
    platform.ready().then(() => {
      this.dbAPI.createDatabase();
      let query = 'SELECT * from tb_user';
      this.dbAPI.getInstanceSQLite().then((db: SQLiteObject) => {
        db.executeSql(query, []).then((result) => {
          if(result.rows.length > 0) {
            let loginData:any = {
              // 'client_id': '2',
              // 'client_secret': 'WJSSSQU28mlLEgIxk2HaJpGuy2nKegYHJta8lTiX',
              // 'grant_type': 'password',
              'email': result.rows.item(0).email,
              'password': result.rows.item(0).password,
              // 'source': '2'
            };
            this.http.post("http://listfacil.com/api/public/login", loginData).subscribe(data => {
              console.log(data);
              this.userAPI.setUser(data)
              // this.tokenAPI.setToken(res.token)
              // this.tokenAPI.getDeviceToken(this.userAPI.getUser().id)
            })
          }else {
            
          }
        })
      })
    });
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'ios-home-outline' },
      { title: 'Promoções', component: PromotionsPage, icon: 'logo-usd' },
      { title: 'Favoritos', component: FavoritesPage, icon: 'ios-star-outline' },
      { title: 'Configurações', component: ConfigurationPage, icon: 'md-settings' },
      { title: 'Sair', component: HomePage, icon: 'ios-log-out-outline' },
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
      this.userAPI.removeUser()
      this.nav.setRoot(page.component);
    } else{
      this.nav.setRoot(page.component);
    }
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
  }
  
}
