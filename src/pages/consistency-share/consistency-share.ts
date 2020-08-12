import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AppConfig } from '../../config/config';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { Screenshot } from '@ionic-native/screenshot';
import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-consistency-share',
  templateUrl: 'consistency-share.html',
})
export class ConsistencySharePage {
  unregisterBackButtonAction: any;
  consistencyList: any = [];
  responseData: any;
  userDetails: any;
  imgPreview = 'assets/imgs/no_image.png';
  totalStarCount: any;
  maxStarCount: any;
  fromPage: any;

  constructor(public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public platform: Platform,
    public dataService: DataProvider,
    private screenshot: Screenshot,
    private socialSharing: SocialSharing) {
    if (this.navParams.get('fromPage')) {
      this.fromPage = this.navParams.get('fromPage');
    }
    if (this.navParams.get('consistencyList')) {
      this.consistencyList = this.navParams.get('consistencyList');
      this.maxStarCount = this.navParams.get('maxStarCount');
      this.userDetails = this.navParams.get('userDetails');
      this.totalStarCount = this.navParams.get('totalStarCount');

      setTimeout(() => {
        this.screenshot.URI(100).then((data) => {
          console.log("data_screenshot");
          console.log(data);
          let datetimeString = moment().format('x');
          console.log('datetimeString', datetimeString);
          let imageName = 'IMAGE-' + this.userDetails.studentId + '.jpg';
          let loader = this.loadingCtrl.create({
            spinner: 'ios',
            content: ''
          });
          loader.present();
          this.dataService.addConsistencyPhoto(this.userDetails, data.URI, imageName).then((result) => {
            this.responseData = result;
            loader.dismiss();
            console.log('addConsistencyPhoto->Response', this.responseData);
            if (this.responseData.returnStatus != 0 && this.responseData.returnURL != "") {
              this.socialSharing.share("The key to fitness is consistency. The Maverick team applauds your sense of responsibility and celebrates your commitment to your wellbeing!", null, this.responseData.returnURL, null).then(() => {
                console.log("share facebook Success!");// Success!
                this.goHome();
              }).catch(() => {
                console.log("share facebook Error!");// Error!
                this.goHome();
              });
            } else {
              this.goHome();
            }
          }, (err) => {
            loader.dismiss();
            console.log(err);
            this.goHome();
          });
        }, (err) => {
          console.log("err_screenshot" + err);
          this.goHome();
        });
      }, 2000);
    }
  }

  goHome() {
    if (this.fromPage == 'consistency') {
      this.navCtrl.setRoot("SettingsPage");
    } else {
      this.navCtrl.setRoot("UsersPage");
    }
  }

  ionViewDidLoad() {
    this.storage.get('imgPreview')
      .then((res: any) => {
        if (res) {
          this.imgPreview = res;
          console.log("Img=>", this.imgPreview);
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

