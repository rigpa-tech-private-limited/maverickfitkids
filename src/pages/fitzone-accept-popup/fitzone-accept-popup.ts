import { Component } from '@angular/core';
import { Platform, ModalController, IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../config/config';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-fitzone-accept-popup',
  templateUrl: 'fitzone-accept-popup.html',
})
export class FitzoneAcceptPopupPage {
  unregisterBackButtonAction: any;
  mfkID: any;
  userDetails: any;
  responseData: any;
  imgPreview = 'assets/imgs/no_image.png';
  friendsStudentImg = 'assets/imgs/no_image.png';
  fitzoneCode: any;
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
          console.log(this.userDetails);
          if (this.navParams.get('friendsStudentImg')) {
            this.friendsStudentImg = this.navParams.get('friendsStudentImg');
            console.log(this.friendsStudentImg);
            let cusid_ele = document.getElementsByClassName('friends-student-avatar');
            for (let i = 0; i < cusid_ele.length; ++i) {
              let item = cusid_ele[i];
              item.setAttribute("style", "background-image: url(" + this.friendsStudentImg + ");");
            }
          }
        }
      });
    if (this.navParams.get('fitzoneCode')) {
      this.fitzoneCode = this.navParams.get('fitzoneCode');
      console.log(this.fitzoneCode);
    }
    if (this.navParams.get('mfkID')) {
      this.mfkID = this.navParams.get('mfkID');
      console.log(this.mfkID);
    }
  }

  acceptRequest() {
    let loader = this.loadingCtrl.create({
      spinner: 'ios',
      content: ''
    });
    loader.present();
    this.dataService.acceptStudentFriendRequest(this.userDetails, this.fitzoneCode).then((result) => {
      this.responseData = result;
      loader.dismiss();
      console.log(this.responseData);
      const alert = this.alertCtrl.create({
        message: this.responseData.returnMessage,
        buttons: [{
          text: 'Ok',
          handler: () => {
            if (this.responseData.returnStatus != 0) {
              console.log('success');
              this.closeModal();
              this.navCtrl.setRoot("FitZonePage");
            } else {
              console.log('returnStatus=>0');
            }
          }
        }],
        enableBackdropDismiss: false
      });
      alert.present();

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

  rejectRequest() {

    let loader = this.loadingCtrl.create({
      spinner: 'ios',
      content: ''
    });
    loader.present();
    this.dataService.rejectStudentFriendRequest(this.userDetails, this.fitzoneCode).then((result) => {
      this.responseData = result;
      loader.dismiss();
      console.log(this.responseData);
      const alert = this.alertCtrl.create({
        message: this.responseData.returnMessage,
        buttons: [{
          text: 'Ok',
          handler: () => {
            if (this.responseData.returnStatus != 0) {
              console.log('success');
              this.closeModal();
              this.navCtrl.setRoot("FitZonePage");
            } else {
              console.log('returnStatus=>0');
            }
          }
        }],
        enableBackdropDismiss: false
      });
      alert.present();

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

  closeModal(): void {
    this.viewCtrl.dismiss({ slideAction: 'close' });
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
