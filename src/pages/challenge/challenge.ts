import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AppConfig } from '../../config/config';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-challenge',
  templateUrl: 'challenge.html',
})
export class ChallengePage {
  unregisterBackButtonAction: any;
  wellbeingContent: any;
  friendwellbeingContent: any;
  friendstarList: any;
  studentIdFriend: any;
  responseData: any;
  userDetails: any;
  starList: any;
  showReuslt: boolean = false;
  showFriendReuslt: boolean = false;
  imgPreview = 'assets/imgs/no_image.png';
  imgPreviewFriend = 'assets/imgs/no_image.png';
  acceptByCount: any;
  progressValue: any;
  transformList: any = [{ "friendsStudentId": "MFK010002", "friendsStudentImage": "MFK010002.jpg" }];
  baseUrl: any;
  starValueImg1: any = "assets/imgs/star_gray.png";
  starValueImg2: any = "assets/imgs/star_gray.png";
  starValueImg3: any = "assets/imgs/star_gray.png";
  starValueImg4: any = "assets/imgs/star_gray.png";
  starValueImg5: any = "assets/imgs/star_gray.png";
  starValueImg6: any = "assets/imgs/star_gray.png";
  starValueImg7: any = "assets/imgs/star_gray.png";
  constructor(public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public platform: Platform,
    public dataService: DataProvider) {
    this.baseUrl = AppConfig.SITE_URL + 'maverick/StudentImages/';
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
          this.dataService.getStudentChallenge(this.userDetails).then((result) => {
            loader.dismiss();
            this.responseData = result;
            console.log(this.responseData);
            if (this.responseData.returnStatus != 0) {
              this.wellbeingContent = this.responseData.wellbeingContent.replace(/(?:\r\n|\r|\n)/g, '<br>');;
              console.log(1, this.wellbeingContent);
              this.starList = this.responseData.starList;
              console.log(2, this.starList);
              this.progressValue = 0;
              this.starList.forEach(element => {
                console.log(element.starValue);
                this.progressValue = this.progressValue + Number(element.starValue);
              });
              console.log(this.progressValue);
              if (this.progressValue == 1) {
                this.starValueImg1 = "assets/imgs/star_orange.png";
              } else if (this.progressValue == 2) {
                this.starValueImg1 = "assets/imgs/star_orange.png";
                this.starValueImg2 = "assets/imgs/star_orange.png";
              } else if (this.progressValue == 3) {
                this.starValueImg1 = "assets/imgs/star_orange.png";
                this.starValueImg2 = "assets/imgs/star_orange.png";
                this.starValueImg3 = "assets/imgs/star_orange.png";
              } else if (this.progressValue == 4) {
                this.starValueImg1 = "assets/imgs/star_orange.png";
                this.starValueImg2 = "assets/imgs/star_orange.png";
                this.starValueImg3 = "assets/imgs/star_orange.png";
                this.starValueImg4 = "assets/imgs/star_orange.png";
              } else if (this.progressValue == 5) {
                this.starValueImg1 = "assets/imgs/star_orange.png";
                this.starValueImg2 = "assets/imgs/star_orange.png";
                this.starValueImg3 = "assets/imgs/star_orange.png";
                this.starValueImg4 = "assets/imgs/star_orange.png";
                this.starValueImg5 = "assets/imgs/star_orange.png";
              } else if (this.progressValue == 6) {
                this.starValueImg1 = "assets/imgs/star_orange.png";
                this.starValueImg2 = "assets/imgs/star_orange.png";
                this.starValueImg3 = "assets/imgs/star_orange.png";
                this.starValueImg4 = "assets/imgs/star_orange.png";
                this.starValueImg5 = "assets/imgs/star_orange.png";
                this.starValueImg6 = "assets/imgs/star_orange.png";
              } else if (this.progressValue == 7) {
                this.starValueImg1 = "assets/imgs/star_orange.png";
                this.starValueImg2 = "assets/imgs/star_orange.png";
                this.starValueImg3 = "assets/imgs/star_orange.png";
                this.starValueImg4 = "assets/imgs/star_orange.png";
                this.starValueImg5 = "assets/imgs/star_orange.png";
                this.starValueImg6 = "assets/imgs/star_orange.png";
                this.starValueImg7 = "assets/imgs/star_orange.png";
              }
              this.progressValue = this.progressValue * 14.2857;
              console.log(this.progressValue);

              this.acceptByCount = this.responseData.acceptByCount;
              this.transformList = this.responseData.transformList;
              console.log(3, this.transformList);
              if (this.acceptByCount != '0' && this.acceptByCount != null) {
                this.showReuslt = true;
              } else {
                this.showReuslt = false;
              }
            } else if (this.responseData.returnStatus == 0) {
              console.log('returnStatus=>0');
              const alert = this.alertCtrl.create({
                message: this.responseData.returnMessage,
                buttons: [{
                  text: 'Ok',
                  handler: () => {
                    this.navCtrl.pop();
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

  getStudentFriendChallenge(transform) {
    if (transform.friendsStudentImage != null) {
      this.imgPreviewFriend = this.baseUrl + transform.friendsStudentImage;
    }
    this.studentIdFriend = transform.friendsStudentId;
    let loader = this.loadingCtrl.create({
      spinner: 'ios',
      content: ''
    });
    loader.present();
    this.dataService.getStudentFriendChallenge(this.studentIdFriend).then((result) => {
      loader.dismiss();
      this.responseData = result;
      console.log(this.responseData);
      if (this.responseData.returnStatus != 0) {
        this.showFriendReuslt = true;
        this.friendwellbeingContent = this.responseData.wellbeingContent.replace(/(?:\r\n|\r|\n)/g, '<br>');;
        console.log(this.friendwellbeingContent);
        this.friendstarList = this.responseData.starList;
        console.log(this.friendstarList);

      } else if (this.responseData.returnStatus == 0) {
        console.log('returnStatus=>0');
        const alert = this.alertCtrl.create({
          message: this.responseData.returnMessage,
          buttons: [{
            text: 'Ok',
            handler: () => { }
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

  markStarForFriendsTransformationChallenge() {
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
          this.dataService.markStarForFriendsTransformationChallenge(this.userDetails, this.studentIdFriend).then((result) => {
            loader.dismiss();
            this.responseData = result;
            console.log(this.responseData);
            if (this.responseData.returnStatus != 0) {
              this.friendstarList = this.responseData.starList;
              console.log(this.friendstarList);
              const alert = this.alertCtrl.create({
                message: this.responseData.returnMessage,
                buttons: [{
                  text: 'Ok',
                  handler: () => { }
                }],
                enableBackdropDismiss: false
              });
              alert.present();
            } else if (this.responseData.returnStatus == 0) {
              console.log('returnStatus=>0');
              const alert = this.alertCtrl.create({
                message: this.responseData.returnMessage,
                buttons: [{
                  text: 'Ok',
                  handler: () => { }
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
    this.navCtrl.setRoot("HomePage");
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
