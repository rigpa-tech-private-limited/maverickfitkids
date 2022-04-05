import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AppConfig } from '../../config/config';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-disclaimer',
  templateUrl: 'disclaimer.html',
})
export class DisclaimerPage {
  unregisterBackButtonAction: any;
  showedAlert: boolean;
  confirmAlert: any;
  disclaimerContent: any;
  responseData: any;
  constructor(public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public platform: Platform,
    public dataService: DataProvider) {
    let loader = this.loadingCtrl.create({
      spinner: 'ios',
      content: ''
    });
    loader.present();
    this.dataService.getDisclaimer().then((result) => {
      loader.dismiss();
      this.responseData = result;
      console.log(this.responseData);
      if (this.responseData.returnStatus != 0) {
        this.disclaimerContent = this.responseData.disclaimerContent;
      } else if (this.responseData.returnStatus == 0) {
        console.log('returnStatus=>0');
        const alert = this.alertCtrl.create({
          message: this.responseData.returnMessage,
          buttons: [{
            text: 'Ok',
            handler: () => {
              //this.navCtrl.pop();
            }
          }],
          enableBackdropDismiss: false
        });
        alert.present();
      }
    }, (err) => {
      console.log(err);
      loader.dismiss();
      const alert = this.alertCtrl.create({
        message: AppConfig.API_ERROR,
        buttons: [{
          text: 'Ok',
          handler: () => { }
        }]
      });
      alert.present();
    });
  }
  ionViewDidLoad() {
    this.initializeBackButtonCustomHandler();
  }

  ionViewWillLeave() {
    console.log('HomePage Leave-->');
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  initializeBackButtonCustomHandler(): void {
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
      console.log('Prevent Back Button Page Change-->');
      if (!this.showedAlert) {
        this.showedAlert = true;
        this.confirmAlert = this.alertCtrl.create({
          title: 'Log off',
          message: 'Do you want to log off?',
          buttons: [{
            text: 'No',
            role: 'cancel',
            handler: () => {
              console.log('Application exit prevented!');
            }
          }, {
            text: 'Yes',
            handler: () => {
              this.storage.clear();
              this.navCtrl.setRoot("RegisterPage");
            }
          }]
        });
        this.confirmAlert.present();
      } else {
        this.showedAlert = false;
        this.confirmAlert.dismiss().catch(() => { })
      }
    });
  }

  goHome() {
    this.navCtrl.setRoot("MenuPage");
  }

}
