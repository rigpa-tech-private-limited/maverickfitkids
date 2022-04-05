import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AppConfig } from '../../config/config';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
})
export class ReviewPage {
  unregisterBackButtonAction: any;
  reviewPath: any;
  responseData: any;
  userDetails: any;
  imgPreview = 'assets/imgs/no_image.png';

  constructor(public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public platform: Platform,
    public dataService: DataProvider) {
    this.storage.get('userDetails')
      .then((res: any) => {
        if (res) {
          this.userDetails = res;
          console.log(this.userDetails);
          let loader = this.loadingCtrl.create({
            spinner: 'ios',
            content: ''
          });
          loader.present();
          this.dataService.getStudent3AReview(this.userDetails).then((result) => {
            loader.dismiss();
            this.responseData = result;
            console.log(this.responseData);
            if (this.responseData.returnStatus != 0) {
              this.reviewPath = this.responseData.reviewPath;
            } else if (this.responseData.returnStatus == 0) {
              console.log('returnStatus=>0');
              const alert = this.alertCtrl.create({
                message: this.responseData.returnMessage,
                buttons: [{
                  text: 'Ok',
                  handler: () => {
                    this.goHome();
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
      });
  }

  goHome() {
    this.navCtrl.setRoot("MenuPage");
  }

  ionViewDidLoad() {
    this.storage.get('imgPreview')
      .then((res: any) => {
        if (res) {
          this.imgPreview = res;
          let cusid_ele = document.getElementsByClassName('profile-avatar');
          for (let i = 0; i < cusid_ele.length; ++i) {
            let item = cusid_ele[i];
            item.setAttribute("style", "background-image: url(" + this.imgPreview + ");");
          }
        }
      });
    this.initializeBackButtonCustomHandler();
  }

  ionViewWillLeave() {
    console.log('HomePage Leave-->');
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  initializeBackButtonCustomHandler(): void {
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
      console.log('Prevent Back Button Page Change-->');
      this.goHome();
    });
  }
}
