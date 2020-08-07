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
  selector: 'page-consistency',
  templateUrl: 'consistency.html',
})
export class ConsistencyPage {
  unregisterBackButtonAction: any;
  consistencyList: any = [];
  responseData: any;
  userDetails: any;
  imgPreview = 'assets/imgs/no_image.png';
  totalStarCount: any;
  maxStarCount: any;

  constructor(public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public platform: Platform,
    public dataService: DataProvider,
    private screenshot: Screenshot,
    private socialSharing: SocialSharing) {
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
          this.dataService.getWeeklyStudentConsistency(this.userDetails).then((result) => {
            loader.dismiss();
            this.responseData = result;
            console.log(this.responseData);
            if (this.responseData.returnStatus != 0) {
              if (this.responseData.consistencyList) {
                this.consistencyList = (this.responseData.consistencyList);
                this.totalStarCount = this.responseData.totalStar;

                var maxObj = this.consistencyList.reduce(function(max, obj) {
                  return obj.star > max.star ? obj : max;
                });

                this.maxStarCount = (maxObj.star);
                if (maxObj.star > 0) {
                  this.consistencyList.forEach(element => {
                    let percent = (element.star / maxObj.star) * 100;
                    element.percent = (percent <= 100 ? percent : 100);
                    element.top = ((100 - percent) >= 0 ? (100 - percent) : 0);
                    console.log(element.star, percent);
                  });
                }
                console.log(this.consistencyList);

              }
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
    this.navCtrl.setRoot("SettingsPage");
  }

  sharePage() {
    console.log("share");
    if (this.consistencyList.length > 0) {
      this.navCtrl.setRoot("ConsistencySharePage", { "consistencyList": this.consistencyList, "maxStarCount": this.maxStarCount, "userDetails": this.userDetails });
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
