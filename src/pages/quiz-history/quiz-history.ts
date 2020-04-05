import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AppConfig } from '../../config/config';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-quiz-history',
  templateUrl: 'quiz-history.html',
})
export class QuizHistoryPage {
  unregisterBackButtonAction: any;
  responseData: any;
  userDetails: any;
  imgPreview = 'assets/imgs/no_image.png';
  //quizHistoryList: any = [{ "colorValue": "Red", "starDate": "18", "starValue": "1" }];
  quizHistoryList: any = [];
  quizHistoryListArr: any = [];
  quizHistoryDate: any;
  baseUrl: any;
  quizId: any;
  quizShown: boolean = false;
  constructor(public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public platform: Platform,
    public dataService: DataProvider) {
    this.quizId = this.navParams.get('quizId');
    this.baseUrl = AppConfig.SITE_URL;
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
          this.dataService.getStudentQuizHistory(this.userDetails).then((result) => {
            loader.dismiss();
            this.responseData = result;
            console.log(this.responseData);
            if (this.responseData.quizHistoryDate) {
              this.quizHistoryList = this.responseData.quizHistoryList;
              this.quizHistoryDate = this.responseData.quizHistoryDate;
              console.log(this.quizHistoryList);
              this.quizHistoryDate.forEach(element => {
                console.log(element.date + ", " + this.quizHistoryList.find((c) => Number(c.starDate) === Number(element.date)));
                if (this.quizHistoryList.find((c) => Number(c.starDate) === Number(element.date))) {
                  let colorValue = '';
                  if (this.quizHistoryList.find((c) => Number(c.starDate) === Number(element.date)).colorValue == "Red") {
                    colorValue = '#f91103';
                  } else if (this.quizHistoryList.find((c) => Number(c.starDate) === Number(element.date)).colorValue == "Yellow") {
                    colorValue = '#fcf907';
                  } else if (this.quizHistoryList.find((c) => Number(c.starDate) === Number(element.date)).colorValue == "Blue") {
                    colorValue = '#3bf4fb';
                  } else if (this.quizHistoryList.find((c) => Number(c.starDate) === Number(element.date)).colorValue == "Pink") {
                    colorValue = '#f27c22';
                  } else if (this.quizHistoryList.find((c) => Number(c.starDate) === Number(element.date)).colorValue == "Green") {
                    colorValue = '#3ffc00';
                  } else {
                    colorValue = this.quizHistoryList.find((c) => Number(c.starDate) === Number(element.date)).colorValue;
                  }
                  this.quizHistoryListArr.push({ "colorValue": colorValue, "starDate": this.quizHistoryList.find((c) => Number(c.starDate) === Number(element.date)).starDate, "starValue": this.quizHistoryList.find((c) => Number(c.starDate) === Number(element.date)).starValue });
                } else {
                  this.quizHistoryListArr.push({ "colorValue": "", "starDate": element.date, "starValue": "0" });
                }
              });
              console.log(this.quizHistoryListArr);
            }
            if (this.responseData.returnStatus != 0) {
              this.quizHistoryDate = this.responseData.quizHistoryDate;
              console.log(this.responseData.quizHistoryDate);
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

  goHome() {
    this.navCtrl.setRoot("QuizResultsPage", { "quizId": this.quizId });
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
