import { Component, ViewChild } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AppConfig } from '../../config/config';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { Screenshot } from '@ionic-native/screenshot';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Slides } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  selector: 'page-consistency',
  templateUrl: 'consistency.html',
})
export class ConsistencyPage {
  @ViewChild(Slides) slides: Slides;
  unregisterBackButtonAction: any;
  consistencyList: any = [];
  responseData: any;
  userDetails: any;
  imgPreview = 'assets/imgs/no_image.png';
  totalStarCount: any = [];
  totalCount: any = 0;
  maxStarCount: any = [];
  selectMonth: any = "01";
  currYear: any = "";
  weekList: any = [];
  currentIndex: any = 0;

  constructor(public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public platform: Platform,
    public dataService: DataProvider,
    private screenshot: Screenshot,
    private toast: Toast,
    private socialSharing: SocialSharing) {
    let d = new Date();
    let n = d.getMonth();
    console.log(d, n);
    if (n < 10) {
      this.selectMonth = "0" + (n + 1);
    } else {
      this.selectMonth = "" + (n + 1);
    }
    this.currYear = d.getFullYear();
    this.storage.get('userDetails')
      .then((res: any) => {
        if (res) {
          this.userDetails = res;
          console.log(this.userDetails);
          this.fetchMonthlyConsistencyDetails(this.selectMonth);
        }
      });
  }

  onSelectChange(selectedValue: any) {
    console.log('Selected', selectedValue);
    this.fetchMonthlyConsistencyDetails(selectedValue);
  }

  fetchMonthlyConsistencyDetails(pmMonth) {
    let loader = this.loadingCtrl.create({
      spinner: 'ios',
      content: ''
    });
    loader.present();
    this.dataService.getMonthlyStudentConsistency(this.userDetails, pmMonth).then((result) => {
      loader.dismiss();
      this.responseData = result;
      console.log(this.responseData);
      if (this.responseData.returnStatus != 0) {
        this.totalCount = 0;
        this.totalStarCount = [];
        this.maxStarCount = [];
        this.weekList = (this.responseData.weekList);
        for (let i = 0; i < this.weekList.length; i++) {
          if (this.weekList[i].consistencyList) {
            this.consistencyList[i] = (this.weekList[i].consistencyList);
            this.totalStarCount[i] = this.weekList[i].totalStar;
            this.totalCount = this.totalCount + this.weekList[i].totalStar;
            var maxObj = this.consistencyList[i].reduce(function(max, obj) {
              return obj.star > max.star ? obj : max;
            });

            this.maxStarCount[i] = (maxObj.star);
            if (maxObj.star > 0) {
              this.consistencyList[i].forEach(element => {
                let percent = (element.star / maxObj.star) * 100;
                element.percent = (percent <= 100 ? percent : 100);
                element.top = ((100 - percent) >= 0 ? (100 - percent) : 0);
                console.log(element.star, percent);
              });
            }
            console.log(this.consistencyList[i]);
          }
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

  goHome() {
    this.navCtrl.setRoot("MenuPage");
  }

  goDigitalCertificate() {
    this.navCtrl.setRoot("DigitalCertificatePage", { "selectMonth": this.selectMonth, "currYear": this.currYear });
  }

  sharePage() {
    console.log("share");
    if (this.totalStarCount[this.currentIndex] > 0) {
      this.navCtrl.setRoot("ConsistencySharePage", { "consistencyList": this.consistencyList[this.currentIndex], "maxStarCount": this.maxStarCount[this.currentIndex], "userDetails": this.userDetails, "totalStarCount": this.totalStarCount[this.currentIndex], "fromPage": "consistency" });
    } else {
      this.toast.show(`No data found this week to share`, '2000', 'bottom').subscribe(
        toast => {
          console.log(toast);
        }
      );  
    }
  }

  slideChanged() {
    this.currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', this.currentIndex);
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

  openExternalLink(pmLink, fromPage) {
    if (this.platform.is('ios')) {
    this.navCtrl.setRoot('ParentGatePage', { "externalLink": pmLink, "fromPage": fromPage });
    } else {
      window.open(pmLink, '_system', 'location=yes');
      return false;
    }
  }
}
