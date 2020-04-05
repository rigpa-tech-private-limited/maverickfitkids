import { Component } from '@angular/core';
import { Platform, ModalController, IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../config/config';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-fit-zone-like',
  templateUrl: 'fit-zone-like.html',
})
export class FitZoneLikePage {
  unregisterBackButtonAction: any;
  mfkID: any;
  userDetails: any;
  responseData: any;
  intendItem: any;
  quote: any;
  intendCode: any;
  likeImg: any = 'assets/imgs/like_icon_grey.png';
  imgPreview = 'assets/imgs/no_image.png';
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
          if (this.navParams.get('mfkID')) {
            this.mfkID = this.navParams.get('mfkID');
            console.log(this.mfkID);
          }
          if (this.navParams.get('intendCode')) {
            this.intendCode = this.navParams.get('intendCode');
            console.log(this.intendCode);
          }
          if (this.navParams.get('quote')) {
            this.quote = this.navParams.get('quote');
            console.log(this.quote);
          }
          if (this.navParams.get('intendItem')) {
            this.intendItem = this.navParams.get('intendItem');
            console.log(this.intendItem);
          }
          if (this.navParams.get('img')) {
            this.imgPreview = this.navParams.get('img');
            console.log(this.imgPreview);
          }
        }
      });

  }

  giveLikesForFriendToBeList() {
    let loader = this.loadingCtrl.create({
      spinner: 'ios',
      content: ''
    });
    loader.present();
    this.dataService.giveLikesForFriendToBeList(this.userDetails, this.mfkID, this.intendCode).then((result) => {
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
              this.likeImg = 'assets/imgs/like_icon_white.png';
            } else {
              console.log('returnStatus=>0');
              this.likeImg = 'assets/imgs/like_icon_white.png';
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

  ionViewDidLoad() {
    // this.storage.get('imgPreview')
    //   .then((res: any) => {
    //     if (res) {
    //       this.imgPreview = res;
    //       console.log("Img=>", this.imgPreview);
    //     }
    //   });
    this.initializeBackButtonCustomHandler();
  }

  ionViewWillLeave() {
    console.log('ionicPage Leave-->');
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  initializeBackButtonCustomHandler(): void {
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
      console.log('Prevent Back Button Page Change-->');
      this.closeModal();
    });
  }
}
