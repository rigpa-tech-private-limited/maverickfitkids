import { Component } from '@angular/core';
import { Platform, ModalController, NavController, IonicPage, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../config/config';
import { DataProvider } from '../../providers/data/data';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";
import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  selector: 'page-user-detail',
  templateUrl: 'user-detail.html',
})
export class UserDetailPage {

  unregisterBackButtonAction: any;
  imgPreview = 'assets/imgs/no_image.png';
  responseData: any;
  fitSpotFlag:boolean = false;
  reviewPath: any;
  userDetails: any;
  constructor(public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public dataService: DataProvider,
    public storage: Storage,
    private iab: InAppBrowser,
    private toast: Toast,
    public platform: Platform) {
    this.storage.get('userDetails')
      .then((res: any) => {
        if (res) {
          this.userDetails = res;
          if(res.fitzoneFlag == "1"){
            this.fitSpotFlag = true;
          }
          this.responseData = res;
        }
      });
  }

  openModal(pageName) {
    let modal = this.modalCtrl.create(pageName, null, {
      cssClass: 'exercise-modal',
      enableBackdropDismiss: true
    });
    modal.present();
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

  goHome() {
    this.navCtrl.setRoot("MenuPage");
  }

  goPage(pmPage) {
    this.navCtrl.setRoot(pmPage);
  }

  checkNoAccess(pmPage) {
    this.storage.get('userDetails')
      .then((res: any) => {
        if ((res.studentAccessLevel == "2" && pmPage == 'QueryPage') || (res.fitzoneFlag == "1" && pmPage == 'ReviewPage') || (res.fitzoneFlag == "1" && pmPage == 'FitFestPage')) {
          console.log(res.studentAccessLevel);
          this.toast.show(`Sorry! This feature is available only for schools that use the Maverick Physical Literacy Curriculum.If you have any queries please write to ceo@maverickliteracy.net`, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );          
        } else {
          if (pmPage != '') {
            if (pmPage == 'ReviewPage') {
              this.openReviewLink();
            } else {
              this.navCtrl.setRoot(pmPage);
            }
          }
        }
      });
  }

  openReviewLink() {
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
        this.reviewPath = AppConfig.SITE_URL + this.responseData.reviewPath;
        console.log(this.reviewPath);
        const options: InAppBrowserOptions = {
          zoom: 'no'
        }
        const browser = this.iab.create('https://docs.google.com/gview?embedded=true&url=' + this.reviewPath, '_blank', options);
        console.log(browser);
      } else if (this.responseData.returnStatus == 0) {
        console.log('returnStatus=>0');
        let modal = this.modalCtrl.create("ReviewPopupPage", {}, {
          cssClass: 'exercise-modal',
          enableBackdropDismiss: false
        });
        modal.present();
        modal.onDidDismiss(data => {
          if (data.slideAction == 'close') {
            this.storage.get('userDetails')
            .then((res: any) => {
              if (res) {
                this.userDetails = res;
                if(res.fitzoneFlag == "1"){
                  this.fitSpotFlag = true;
                }
                this.responseData = res;
              }
            });
          }
        });
        // const alert = this.alertCtrl.create({
        //   message: this.responseData.returnMessage,
        //   buttons: [{
        //     text: 'Ok',
        //     handler: () => {
        //       //this.goHome();
        //     }
        //   }],
        //   enableBackdropDismiss: false
        // });
        // alert.present();
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

}
