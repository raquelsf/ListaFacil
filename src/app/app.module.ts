import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SubcategoriesPage } from '../pages/subcategories/subcategories';
import { EstablishmentsPage } from '../pages/establishments-list/establishments';
import { PlacesPage } from '../pages/places/places';
import { BasicPage } from '../pages/login/login-modal';
import { PromotionsPage } from '../pages/promotions/promotions';
import { ConfigurationPage } from '../pages/configuration/configuration';

import { FavoritesPage } from '../pages/favorites/favorites';

import 'rxjs/add/operator/map';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';

import { Facebook } from '@ionic-native/facebook';
import { HttpClientModule } from '@angular/common/http';

import { SearchPipe } from '../pipes/search/search';
import { SortPipe } from '../pipes/sort/sort';

import { UserProvider } from '../providers/user/user';
import { DbProvider } from '../providers/db/db';
import { SQLite } from '@ionic-native/sqlite';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    SubcategoriesPage,
    EstablishmentsPage,
    PlacesPage,
    FavoritesPage,
    BasicPage,
    PromotionsPage,
    ConfigurationPage,
    SearchPipe,
    SortPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    SubcategoriesPage,
    EstablishmentsPage,
    PlacesPage,
    FavoritesPage,
    BasicPage,
    PromotionsPage,
    ConfigurationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    DbProvider,
    UserProvider,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
