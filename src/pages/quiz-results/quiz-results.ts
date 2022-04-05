import { Component } from '@angular/core';
import { Platform, ModalController, IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../config/config';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-quiz-results',
  templateUrl: 'quiz-results.html',
})
export class QuizResultsPage {
  unregisterBackButtonAction: any;
  imgPreview = 'assets/imgs/no_image.png';
  responseData: any;
  userDetails: any;
  friendsStudentName1: any = '';
  friendsStudentName2: any = '';
  friendsStudentName3: any = '';
  friendsStudentName4: any = '';
  friendsStudentName5: any = '';
  friendsStudentName6: any = '';
  friendsStudentName7: any = '';
  friendsStudentName8: any = '';
  friendsStudentCode1: any = '';
  friendsStudentCode2: any = '';
  friendsStudentCode3: any = '';
  friendsStudentCode4: any = '';
  friendsStudentCode5: any = '';
  friendsStudentCode6: any = '';
  friendsStudentCode7: any = '';
  friendsStudentCode8: any = '';
  friendsStudentImg1: any = 'assets/imgs/circles/0_empty.png';
  friendsStudentImg2: any = 'assets/imgs/circles/0_empty.png';
  friendsStudentImg3: any = 'assets/imgs/circles/0_empty.png';
  friendsStudentImg4: any = 'assets/imgs/circles/0_empty.png';
  friendsStudentImg5: any = 'assets/imgs/circles/0_empty.png';
  friendsStudentImg6: any = 'assets/imgs/circles/0_empty.png';
  friendsStudentImg7: any = 'assets/imgs/circles/0_empty.png';
  friendsStudentImg8: any = 'assets/imgs/circles/0_empty.png';
  quizFriendsList: any;
  quizId: any;
  studentQuizStar: any;
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
          console.log(this.userDetails);
          let loader = this.loadingCtrl.create({
            spinner: 'ios',
            content: ''
          });
          loader.present();
          this.dataService.getFriendsQuizResult(this.userDetails, this.quizId).then((result) => {
            loader.dismiss();
            this.responseData = result;
            console.log(this.responseData);
            if (this.responseData.returnStatus != 0) {

              this.quizFriendsList = this.responseData.quizFriendsList;
              this.studentQuizStar = this.responseData.studentQuizStar;
              if (this.responseData.quizFriendsList[0]) {
                this.friendsStudentName1 = this.responseData.quizFriendsList[0].friendsTotalStar;
                this.friendsStudentCode1 = this.responseData.quizFriendsList[0].friendsStudentId;
                this.friendsStudentImg1 = AppConfig.SITE_URL + 'maverick/StudentImages/' + this.responseData.quizFriendsList[0].friendsStudentImage;
              }
              if (this.responseData.quizFriendsList[1]) {
                this.friendsStudentName2 = this.responseData.quizFriendsList[1].friendsTotalStar;
                this.friendsStudentCode2 = this.responseData.quizFriendsList[1].friendsStudentId;
                this.friendsStudentImg2 = AppConfig.SITE_URL + 'maverick/StudentImages/' + this.responseData.quizFriendsList[1].friendsStudentImage;
              }
              if (this.responseData.quizFriendsList[2]) {
                this.friendsStudentName3 = this.responseData.quizFriendsList[2].friendsTotalStar;
                this.friendsStudentCode3 = this.responseData.quizFriendsList[2].friendsStudentId;
                this.friendsStudentImg3 = AppConfig.SITE_URL + 'maverick/StudentImages/' + this.responseData.quizFriendsList[2].friendsStudentImage;
              }
              if (this.responseData.quizFriendsList[3]) {
                this.friendsStudentName4 = this.responseData.quizFriendsList[3].friendsTotalStar;
                this.friendsStudentCode4 = this.responseData.quizFriendsList[3].friendsStudentId;
                this.friendsStudentImg4 = AppConfig.SITE_URL + 'maverick/StudentImages/' + this.responseData.quizFriendsList[3].friendsStudentImage;
              }
              if (this.responseData.quizFriendsList[4]) {
                this.friendsStudentName5 = this.responseData.quizFriendsList[4].friendsTotalStar;
                this.friendsStudentCode5 = this.responseData.quizFriendsList[4].friendsStudentId;
                this.friendsStudentImg5 = AppConfig.SITE_URL + 'maverick/StudentImages/' + this.responseData.quizFriendsList[4].friendsStudentImage;
              }
              if (this.responseData.quizFriendsList[5]) {
                this.friendsStudentName6 = this.responseData.quizFriendsList[5].friendsTotalStar;
                this.friendsStudentCode6 = this.responseData.quizFriendsList[5].friendsStudentId;
                this.friendsStudentImg6 = AppConfig.SITE_URL + 'maverick/StudentImages/' + this.responseData.quizFriendsList[5].friendsStudentImage;
              }
              if (this.responseData.quizFriendsList[6]) {
                this.friendsStudentName7 = this.responseData.quizFriendsList[6].friendsTotalStar;
                this.friendsStudentCode7 = this.responseData.quizFriendsList[6].friendsStudentId;
                this.friendsStudentImg7 = AppConfig.SITE_URL + 'maverick/StudentImages/' + this.responseData.quizFriendsList[6].friendsStudentImage;
              }
              if (this.responseData.quizFriendsList[7]) {
                this.friendsStudentName8 = this.responseData.quizFriendsList[7].friendsTotalStar;
                this.friendsStudentCode8 = this.responseData.quizFriendsList[7].friendsStudentId;
                this.friendsStudentImg8 = AppConfig.SITE_URL + 'maverick/StudentImages/' + this.responseData.quizFriendsList[7].friendsStudentImage;
              }


            } else if (this.responseData.returnStatus == 0) {
              console.log('returnStatus=>0');
              this.studentQuizStar = this.responseData.studentQuizStar;
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

  friendsStudentSelect(pmCode) {

  }

  showQuizHistory() {
    this.navCtrl.setRoot("QuizHistoryPage", { "quizId": this.quizId });
  }
  goPage(pmPage) {
    this.navCtrl.setRoot(pmPage);
  }
}
