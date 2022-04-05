import { Component } from '@angular/core';
import { App, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { Storage } from '@ionic/storage';
import { DatabaseProvider } from '../providers/database/database';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any;
  usersList: any;

  constructor(public platform: Platform,
    public databaseprovider: DatabaseProvider, public keyboard: Keyboard, private storage: Storage, statusBar: StatusBar, splashScreen: SplashScreen, public app: App, public alertCtrl: AlertController) {
    platform.ready().then(() => {
      this.databaseprovider.getDatabaseState();
      statusBar.styleDefault();
      splashScreen.hide();
      // this.keyboard.hideKeyboardAccessoryBar(false);

      this.storage.get('loggedInUser')
        .then((res: any) => {
          if (res) {
            this.rootPage = "MenuPage";
            this.usersList = this.databaseprovider.getUserDetails().then(res => res);
            console.log(this.usersList);
            if (this.usersList.length > 0) {
              this.rootPage = "MenuPage";
            } else {
              this.rootPage = "UsersPage";
            }
          } else {
            this.rootPage = "RegisterPage";
          }
        })
        .catch(() => {
          this.rootPage = "RegisterPage";
        });
    });
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      console.log("Platform->Keyboard");
      // this.keyboard.hideKeyboardAccessoryBar(false);
    });
  }
}
