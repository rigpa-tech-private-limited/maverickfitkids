import { Component } from '@angular/core';
import { Platform, ModalController, IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../config/config';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-fit-zone',
  templateUrl: 'fit-zone.html',
})
export class FitZonePage {
  unregisterBackButtonAction: any;
  imgPreview = 'assets/imgs/no_image.png';
  responseData: any;
  userDetails: any;
  friendStarCount1: any = '';
  friendStarCount2: any = '';
  friendStarCount3: any = '';
  friendStarCount4: any = '';
  friendStarCount5: any = '';
  friendStarCount6: any = '';
  friendStarCount7: any = '';
  friendStarCount8: any = '';
  friendsStudentCode0: any = '';
  friendsStudentCode1: any = '';
  friendsStudentCode2: any = '';
  friendsStudentCode3: any = '';
  friendsStudentCode4: any = '';
  friendsStudentCode5: any = '';
  friendsStudentCode6: any = '';
  friendsStudentCode7: any = '';
  friendsStudentCode8: any = '';
  friendsStudentImg1: any = 'assets/imgs/circles/add_circle.png';
  friendsStudentImg2: any = 'assets/imgs/circles/add_circle.png';
  friendsStudentImg3: any = 'assets/imgs/circles/add_circle.png';
  friendsStudentImg4: any = 'assets/imgs/circles/add_circle.png';
  friendsStudentImg5: any = 'assets/imgs/circles/add_circle.png';
  friendsStudentImg6: any = 'assets/imgs/circles/add_circle.png';
  friendsStudentImg7: any = 'assets/imgs/circles/add_circle.png';
  friendsStudentImg8: any = 'assets/imgs/circles/add_circle.png';
  fitzoneCode1: any = '';
  fitzoneCode2: any = '';
  fitzoneCode3: any = '';
  fitzoneCode4: any = '';
  fitzoneCode5: any = '';
  fitzoneCode6: any = '';
  fitzoneCode7: any = '';
  fitzoneCode8: any = '';
  toBecode1: any = '';
  toBecode2: any = '';
  toBecode3: any = '';
  toBecode4: any = '';
  toBecode5: any = '';
  toBecode6: any = '';
  toBecode7: any = '';
  toBecode8: any = '';
  sendRequestFlag1: any = '';
  sendRequestFlag2: any = '';
  sendRequestFlag3: any = '';
  sendRequestFlag4: any = '';
  sendRequestFlag5: any = '';
  sendRequestFlag6: any = '';
  sendRequestFlag7: any = '';
  sendRequestFlag8: any = '';
  friendsList: any;
  quizId: any;
  studentStar: any;
  starVisible1: boolean = false;
  starVisible2: boolean = false;
  starVisible3: boolean = false;
  starVisible4: boolean = false;
  starVisible5: boolean = false;
  starVisible6: boolean = false;
  starVisible7: boolean = false;
  starVisible8: boolean = false;
  fistVisible0: boolean = true;
  fistVisible1: boolean = false;
  fistVisible2: boolean = false;
  fistVisible3: boolean = false;
  fistVisible4: boolean = false;
  fistVisible5: boolean = false;
  fistVisible6: boolean = false;
  fistVisible7: boolean = false;
  fistVisible8: boolean = false;
  redDotVisible1: boolean = false;
  redDotVisible2: boolean = false;
  redDotVisible3: boolean = false;
  redDotVisible4: boolean = false;
  redDotVisible5: boolean = false;
  redDotVisible6: boolean = false;
  redDotVisible7: boolean = false;
  redDotVisible8: boolean = false;
  actionName1: any = 'add';
  actionName2: any = 'add';
  actionName3: any = 'add';
  actionName4: any = 'add';
  actionName5: any = 'add';
  actionName6: any = 'add';
  actionName7: any = 'add';
  actionName8: any = 'add';
  constructor(public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public platform: Platform,
    public dataService: DataProvider) {

    this.quizId = this.navParams.get('quizId');
    this.storage.get('userDetails')
      .then((res: any) => {
        if (res) {
          this.userDetails = res;
          this.friendsStudentCode0 = res.studentId;
          console.log(this.userDetails);
          let loader = this.loadingCtrl.create({
            spinner: 'ios',
            content: ''
          });
          loader.present();
          this.dataService.getStudentFriendsList(this.userDetails).then((result) => {
            loader.dismiss();
            this.responseData = result;
            console.log(this.responseData);
            if (this.responseData.returnStatus != 0) {
              this.friendsList = this.responseData.friendsList;
              this.studentStar = this.responseData.studentStar;
              console.log(this.friendsList);
              if (this.responseData.friendsList[0]) {
                this.friendStarCount1 = this.responseData.friendsList[0].friendStarCount;
                this.friendsStudentCode1 = this.responseData.friendsList[0].friendsStudentId;
                this.fitzoneCode1 = this.responseData.friendsList[0].fitzoneCode;
                this.toBecode1 = this.responseData.friendsList[0].toBecode;
                this.sendRequestFlag1 = this.responseData.friendsList[0].flag;
                if (this.responseData.friendsList[0].friendsStudentImage) {
                  this.friendsStudentImg1 = AppConfig.SITE_URL + 'maverick/StudentImages/' + this.responseData.friendsList[0].friendsStudentImage;
                } else {
                  this.friendsStudentImg1 = 'assets/imgs/circles/friend_photo_icon.png';
                }
                if (this.responseData.friendsList[0].status == "12") {
                  this.starVisible1 = true;
                  this.actionName1 = 'discontinue';
                } else {
                  this.starVisible1 = true;
                }
                if (this.responseData.friendsList[0].status == "11") {
                  this.redDotVisible1 = true;
                  this.actionName1 = 'accept';
                } else {
                  this.redDotVisible1 = false;
                }
                if (this.responseData.friendsList[0].status == "13") {
                  this.actionName1 = 'rejected';
                }
                if (this.responseData.friendsList[0].status == "5") {
                  this.actionName1 = 'disconnected';
                }
                if (this.toBecode1 != "") {
                  this.fistVisible1 = true;
                } else {
                  this.fistVisible1 = false;
                }
              }
              if (this.responseData.friendsList[1]) {
                this.friendStarCount2 = this.responseData.friendsList[1].friendStarCount;
                this.friendsStudentCode2 = this.responseData.friendsList[1].friendsStudentId;
                this.fitzoneCode2 = this.responseData.friendsList[1].fitzoneCode;
                this.toBecode2 = this.responseData.friendsList[1].toBecode;
                this.sendRequestFlag2 = this.responseData.friendsList[1].flag;
                if (this.responseData.friendsList[1].friendsStudentImage) {
                  this.friendsStudentImg2 = AppConfig.SITE_URL + 'maverick/StudentImages/' + this.responseData.friendsList[1].friendsStudentImage;
                } else {
                  this.friendsStudentImg2 = 'assets/imgs/circles/friend_photo_icon.png';
                }
                if (this.responseData.friendsList[1].status == "12") {
                  this.starVisible2 = true;
                  this.actionName2 = 'discontinue';
                } else {
                  this.starVisible2 = false;
                }
                if (this.responseData.friendsList[1].status == "11") {
                  this.redDotVisible2 = true;
                  this.actionName2 = 'accept';
                } else {
                  this.redDotVisible2 = false;
                }
                if (this.responseData.friendsList[1].status == "13") {
                  this.actionName2 = 'rejected';
                }
                if (this.responseData.friendsList[1].status == "5") {
                  this.actionName2 = 'disconnected';
                }
                if (this.toBecode2 != "") {
                  this.fistVisible2 = true;
                } else {
                  this.fistVisible2 = false;
                }
              }
              if (this.responseData.friendsList[2]) {
                this.friendStarCount3 = this.responseData.friendsList[2].friendStarCount;
                this.friendsStudentCode3 = this.responseData.friendsList[2].friendsStudentId;
                this.fitzoneCode3 = this.responseData.friendsList[2].fitzoneCode;
                this.toBecode3 = this.responseData.friendsList[2].toBecode;
                this.sendRequestFlag3 = this.responseData.friendsList[2].flag;
                if (this.responseData.friendsList[2].friendsStudentImage) {
                  this.friendsStudentImg3 = AppConfig.SITE_URL + 'maverick/StudentImages/' + this.responseData.friendsList[2].friendsStudentImage;
                } else {
                  this.friendsStudentImg3 = 'assets/imgs/circles/friend_photo_icon.png';
                }
                if (this.responseData.friendsList[2].status == "12") {
                  this.starVisible3 = true;
                  this.actionName3 = 'discontinue';
                } else {
                  this.starVisible3 = false;
                }
                if (this.responseData.friendsList[2].status == "11") {
                  this.redDotVisible3 = true;
                  this.actionName3 = 'accept';
                } else {
                  this.redDotVisible3 = false;
                }
                if (this.responseData.friendsList[2].status == "13") {
                  this.actionName3 = 'rejected';
                }
                if (this.responseData.friendsList[2].status == "5") {
                  this.actionName3 = 'disconnected';
                }
                if (this.toBecode3 != "") {
                  this.fistVisible3 = true;
                } else {
                  this.fistVisible3 = false;
                }
              }
              if (this.responseData.friendsList[3]) {
                this.friendStarCount4 = this.responseData.friendsList[3].friendStarCount;
                this.friendsStudentCode4 = this.responseData.friendsList[3].friendsStudentId;
                this.fitzoneCode4 = this.responseData.friendsList[3].fitzoneCode;
                this.toBecode4 = this.responseData.friendsList[3].toBecode;
                this.sendRequestFlag4 = this.responseData.friendsList[3].flag;
                if (this.responseData.friendsList[3].friendsStudentImage) {
                  this.friendsStudentImg4 = AppConfig.SITE_URL + 'maverick/StudentImages/' + this.responseData.friendsList[3].friendsStudentImage;
                } else {
                  this.friendsStudentImg4 = 'assets/imgs/circles/friend_photo_icon.png';
                }
                if (this.responseData.friendsList[3].status == "12") {
                  this.starVisible4 = true;
                  this.actionName4 = 'discontinue';
                } else {
                  this.starVisible4 = false;
                }
                if (this.responseData.friendsList[3].status == "11") {
                  this.redDotVisible4 = true;
                  this.actionName4 = 'accept';
                } else {
                  this.redDotVisible4 = false;
                }
                if (this.responseData.friendsList[3].status == "13") {
                  this.actionName4 = 'rejected';
                }
                if (this.responseData.friendsList[3].status == "5") {
                  this.actionName4 = 'disconnected';
                }
                if (this.toBecode4 != "") {
                  this.fistVisible4 = true;
                } else {
                  this.fistVisible4 = false;
                }
              }
              if (this.responseData.friendsList[4]) {
                this.friendStarCount5 = this.responseData.friendsList[4].friendStarCount;
                this.friendsStudentCode5 = this.responseData.friendsList[4].friendsStudentId;
                this.fitzoneCode5 = this.responseData.friendsList[4].fitzoneCode;
                this.toBecode5 = this.responseData.friendsList[4].toBecode;
                this.sendRequestFlag5 = this.responseData.friendsList[4].flag;
                if (this.responseData.friendsList[4].friendsStudentImage) {
                  this.friendsStudentImg5 = AppConfig.SITE_URL + 'maverick/StudentImages/' + this.responseData.friendsList[4].friendsStudentImage;
                } else {
                  this.friendsStudentImg5 = 'assets/imgs/circles/friend_photo_icon.png';
                }
                if (this.responseData.friendsList[4].status == "12") {
                  this.starVisible5 = true;
                  this.actionName5 = 'discontinue';
                } else {
                  this.starVisible5 = false;
                }
                if (this.responseData.friendsList[4].status == "11") {
                  this.redDotVisible5 = true;
                  this.actionName5 = 'accept';
                } else {
                  this.redDotVisible5 = false;
                }
                if (this.responseData.friendsList[4].status == "13") {
                  this.actionName5 = 'rejected';
                }
                if (this.responseData.friendsList[4].status == "5") {
                  this.actionName5 = 'disconnected';
                }
                if (this.toBecode5 != "") {
                  this.fistVisible5 = true;
                } else {
                  this.fistVisible5 = false;
                }
              }
              if (this.responseData.friendsList[5]) {
                this.friendStarCount6 = this.responseData.friendsList[5].friendStarCount;
                this.friendsStudentCode6 = this.responseData.friendsList[5].friendsStudentId;
                this.fitzoneCode6 = this.responseData.friendsList[5].fitzoneCode;
                this.toBecode6 = this.responseData.friendsList[5].toBecode;
                this.sendRequestFlag6 = this.responseData.friendsList[5].flag;
                if (this.responseData.friendsList[5].friendsStudentImage) {
                  this.friendsStudentImg6 = AppConfig.SITE_URL + 'maverick/StudentImages/' + this.responseData.friendsList[5].friendsStudentImage;
                } else {
                  this.friendsStudentImg6 = 'assets/imgs/circles/friend_photo_icon.png';
                }
                if (this.responseData.friendsList[5].status == "12") {
                  this.starVisible6 = true;
                  this.actionName6 = 'discontinue';
                } else {
                  this.starVisible6 = false;
                }
                if (this.responseData.friendsList[5].status == "11") {
                  this.redDotVisible6 = true;
                  this.actionName6 = 'accept';
                } else {
                  this.redDotVisible6 = false;
                }
                if (this.responseData.friendsList[5].status == "13") {
                  this.actionName6 = 'rejected';
                }
                if (this.responseData.friendsList[5].status == "5") {
                  this.actionName6 = 'disconnected';
                }
                if (this.toBecode6 != "") {
                  this.fistVisible6 = true;
                } else {
                  this.fistVisible6 = false;
                }
              }
              if (this.responseData.friendsList[6]) {
                this.friendStarCount7 = this.responseData.friendsList[6].friendStarCount;
                this.friendsStudentCode7 = this.responseData.friendsList[6].friendsStudentId;
                this.fitzoneCode7 = this.responseData.friendsList[6].fitzoneCode;
                this.toBecode7 = this.responseData.friendsList[6].toBecode;
                this.sendRequestFlag7 = this.responseData.friendsList[6].flag;
                if (this.responseData.friendsList[6].friendsStudentImage) {
                  this.friendsStudentImg7 = AppConfig.SITE_URL + 'maverick/StudentImages/' + this.responseData.friendsList[6].friendsStudentImage;
                } else {
                  this.friendsStudentImg7 = 'assets/imgs/circles/friend_photo_icon.png';
                }
                if (this.responseData.friendsList[6].status == "12") {
                  this.starVisible7 = true;
                  this.actionName7 = 'discontinue';
                } else {
                  this.starVisible7 = false;
                }
                if (this.responseData.friendsList[6].status == "11") {
                  this.redDotVisible7 = true;
                  this.actionName7 = 'accept';
                } else {
                  this.redDotVisible7 = false;
                }
                if (this.responseData.friendsList[6].status == "13") {
                  this.actionName7 = 'rejected';
                }
                if (this.responseData.friendsList[6].status == "5") {
                  this.actionName7 = 'disconnected';
                }
                if (this.toBecode7 != "") {
                  this.fistVisible7 = true;
                } else {
                  this.fistVisible7 = false;
                }
              }
              if (this.responseData.friendsList[7]) {
                this.friendStarCount8 = this.responseData.friendsList[7].friendStarCount;
                this.friendsStudentCode8 = this.responseData.friendsList[7].friendsStudentId;
                this.fitzoneCode8 = this.responseData.friendsList[7].fitzoneCode;
                this.toBecode8 = this.responseData.friendsList[7].toBecode;
                this.sendRequestFlag8 = this.responseData.friendsList[7].flag;
                if (this.responseData.friendsList[7].friendsStudentImage) {
                  this.friendsStudentImg8 = AppConfig.SITE_URL + 'maverick/StudentImages/' + this.responseData.friendsList[7].friendsStudentImage;
                } else {
                  this.friendsStudentImg8 = 'assets/imgs/circles/friend_photo_icon.png';
                }
                if (this.responseData.friendsList[7].status == "12") {
                  this.starVisible8 = true;
                  this.actionName8 = 'discontinue';
                } else {
                  this.starVisible8 = false;
                }
                if (this.responseData.friendsList[7].status == "11") {
                  this.redDotVisible8 = true;
                  this.actionName8 = 'accept';
                } else {
                  this.redDotVisible8 = false;
                }
                if (this.responseData.friendsList[7].status == "13") {
                  this.actionName8 = 'rejected';
                }
                if (this.responseData.friendsList[7].status == "5") {
                  this.actionName8 = 'disconnected';
                }
                if (this.toBecode8 != "") {
                  this.fistVisible8 = true;
                } else {
                  this.fistVisible8 = false;
                }
              }
            } else if (this.responseData.returnStatus == 0) {
              console.log('returnStatus=>0');
              const alert = this.alertCtrl.create({
                message: this.responseData.returnMessage,
                buttons: [{
                  text: 'Ok',
                  handler: () => {
                    //this.goHome();
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

  ionViewDidLoad() {
    console.log('HomePage DidLoad-->');
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
          let label_home = document.getElementsByClassName('user-image');
          for (let i = 0; i < label_home.length; ++i) {
            let item = label_home[i];
            item.setAttribute("style", "background-image: url(" + this.imgPreview + ");");
          }
        }
      });

    this.initializeBackButtonCustomHandler();
  }

  ionViewWillLeave() {
    console.log('ionicPage Leave-->');
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

  fistlike(pmfriendsStudentCode, pmfriendsstudentImage) {
    if (pmfriendsStudentCode == this.friendsStudentCode0) {
      pmfriendsstudentImage = this.imgPreview;
    }
    let loader = this.loadingCtrl.create({
      spinner: 'ios',
      content: ''
    });
    loader.present();
    this.dataService.getStudentFriendToBeList(this.userDetails, pmfriendsStudentCode).then((result) => {
      this.responseData = result;
      loader.dismiss();
      console.log(this.responseData);
      if (this.responseData.returnStatus != 0) {
        console.log('success');
        this.openModal('FitZoneLikePage', pmfriendsStudentCode, this.responseData.iam, this.responseData.quote, pmfriendsstudentImage);
      } else {
        console.log('returnStatus=>0');
        const alert = this.alertCtrl.create({
          message: this.responseData.returnMessage,
          buttons: [{
            text: 'Ok',
            handler: () => { }
          }]
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

  openModal(pageName, pmfriendsStudentCode, pmfriendsZoneCode, friendStarCount, friendsStudentImg) {
    console.log("==>" + pageName + "--" + pmfriendsStudentCode);
    let modal = this.modalCtrl.create(pageName, ((pageName == 'FitzoneAcceptPopupPage') ? { "fitzoneCode": pmfriendsZoneCode, "mfkID": pmfriendsStudentCode, "friendsStudentImg": friendsStudentImg } : ((pageName == 'FitzoneDiscontinuePopupPage') ? { "fitzoneCode": pmfriendsZoneCode, "mfkID": pmfriendsStudentCode, "friendStarCount": friendStarCount, "friendsStudentImg": friendsStudentImg } : ((pageName == 'FitZoneLikePage') ? { "mfkID": pmfriendsStudentCode, "intendItem": pmfriendsZoneCode, "quote": friendStarCount, "img": friendsStudentImg } : null))), {
      cssClass: 'exercise-modal',
      enableBackdropDismiss: true
    });
    modal.present();
  }

  friendsStudentSelect(pmCode, pmfriendsStudentCode, pmfriendsZoneCode, friendStarCount, friendsStudentImg, sendRequestFlag) {
    console.log(pmCode, pmfriendsStudentCode, pmfriendsZoneCode, friendStarCount, friendsStudentImg, sendRequestFlag);
    if (pmCode == 'add') {
      this.openModal('FitzoneAddPopupPage', pmfriendsStudentCode, pmfriendsZoneCode, friendStarCount, friendsStudentImg);
    } else if (pmCode == 'accept') {
      if (sendRequestFlag == "1") {
        this.openModal('FitzoneAcceptPopupPage', pmfriendsStudentCode, pmfriendsZoneCode, friendStarCount, friendsStudentImg);
      }
    } else if (pmCode == 'discontinue') {
      this.openModal('FitzoneDiscontinuePopupPage', pmfriendsStudentCode, pmfriendsZoneCode, friendStarCount, friendsStudentImg);
    }
  }

  showQuizHistory() {
    this.navCtrl.setRoot("QuizHistoryPage", { "quizId": this.quizId });
  }
}
