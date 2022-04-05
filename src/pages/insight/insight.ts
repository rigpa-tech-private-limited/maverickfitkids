import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AppConfig } from '../../config/config';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-insight',
  templateUrl: 'insight.html',
})
export class InsightPage {
  unregisterBackButtonAction: any;
  insightContent: any = { "imagePath": "", "description": "" };
  responseData: any;
  userDetails: any;
  showImage: boolean = false;
  showText: boolean = false;
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
          this.dataService.getStudentInsightDetails(this.userDetails).then((result) => {
            loader.dismiss();
            this.responseData = result;
            console.log(this.responseData);
            if (this.responseData.returnStatus != 0) {
              this.showImage = true;
              let showImage = document.getElementsByClassName('imageContent');
              for (let i = 0; i < showImage.length; ++i) {
                let item = showImage[i];
                item.setAttribute("style", "visibility:visible;");
              }
              this.showText = false;
              let showText = document.getElementsByClassName('textContent');
              for (let i = 0; i < showText.length; ++i) {
                let item = showText[i];
                item.setAttribute("style", "visibility:hidden;height:0;");
              }
              console.log(AppConfig.SITE_URL);
              this.insightContent.imagePath = AppConfig.SITE_URL + this.responseData.imagePath;
              this.insightContent.description = (this.responseData.description);
              var strMessage1 = document.getElementById("insight-content");
              strMessage1.innerHTML = (this.insightContent.description).replace(/(?:\r\n | \r | \n)/g, '<br>');
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

  showImageOrText(pmFlag) {
    if (pmFlag == 1) {
      this.showText = true;
      this.showImage = false;
      let showText = document.getElementsByClassName('textContent');
      for (let i = 0; i < showText.length; ++i) {
        let item = showText[i];
        item.setAttribute("style", "visibility:visible;");
      }
      let showImage = document.getElementsByClassName('imageContent');
      for (let i = 0; i < showImage.length; ++i) {
        let item = showImage[i];
        item.setAttribute("style", "visibility:hidden;height:0;");
      }
    } else {
      this.showImage = true;
      let showImage = document.getElementsByClassName('imageContent');
      for (let i = 0; i < showImage.length; ++i) {
        let item = showImage[i];
        item.setAttribute("style", "visibility:visible;");
      }
      this.showText = false;
      let showText = document.getElementsByClassName('textContent');
      for (let i = 0; i < showText.length; ++i) {
        let item = showText[i];
        item.setAttribute("style", "visibility:hidden;height:0;");
      }
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
  goPage(pmPage) {
    this.navCtrl.setRoot(pmPage);
  }
}
