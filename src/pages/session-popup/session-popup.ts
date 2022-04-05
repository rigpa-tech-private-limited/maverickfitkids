import { Component } from '@angular/core';
import { Platform, ModalController, IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../config/config';
import { DataProvider } from '../../providers/data/data';
@IonicPage()
@Component({
  selector: 'page-session-popup',
  templateUrl: 'session-popup.html',
})
export class SessionPopupPage {
  unregisterBackButtonAction: any;
  userDetails: any;
  sessioncode: any;
  responseData: any;
  constructor(public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public storage: Storage,
    public dataService: DataProvider,
    public viewCtrl: ViewController) {
    this.storage.get('userDetails')
      .then((res: any) => {
        if (res) {
          this.userDetails = res;
        }
      });
    this.sessioncode = this.navParams.get('sessioncode');
  }

  closeModal(): void {
    this.viewCtrl.dismiss({ slideAction: 'close' });
    this.navCtrl.setRoot("MenuPage");
  }

  repeatSlide() {
    this.viewCtrl.dismiss({ slideAction: 'repeat' });
  }

  finishSlide() {
    this.viewCtrl.dismiss({ slideAction: 'finish' });
  }

  ionViewDidLoad() {
    this.initializeBackButtonCustomHandler();
  }

  submitFeedback(pmvalue) {
    let loader = this.loadingCtrl.create({
      spinner: 'ios',
      content: ''
    });
    loader.present();
    this.dataService.saveSessionFeedBack(this.userDetails, this.sessioncode, pmvalue).then((result) => {

      this.responseData = result;
      console.log(this.responseData);
      if (this.responseData.returnStatus != 0) {
        this.closeModal();
        loader.dismiss();
        this.navCtrl.setRoot("SessionsPage");
      } else if (this.responseData.returnStatus == 0) {
        console.log('returnStatus=>0');
        loader.dismiss();
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

  ionViewWillLeave() {
    console.log('HomePage Leave-->');
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  initializeBackButtonCustomHandler(): void {
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
      console.log('Prevent Back Button Page Change-->');
      this.closeModal();
    });
  }
}
