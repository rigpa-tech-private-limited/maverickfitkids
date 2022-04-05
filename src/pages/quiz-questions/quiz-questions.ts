import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AppConfig } from '../../config/config';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-quiz-questions',
  templateUrl: 'quiz-questions.html',
})
export class QuizQuestionsPage {
  unregisterBackButtonAction: any;
  responseData: any;
  userDetails: any;
  imgPreview = 'assets/imgs/no_image.png';
  quizId: any;
  quizList: any;
  baseUrl: any;
  quizShown: boolean = false;
  constructor(public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public platform: Platform,
    public dataService: DataProvider) {
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
          this.dataService.getStudentQuizDetails(this.userDetails).then((result) => {
            loader.dismiss();
            this.responseData = result;
            console.log(this.responseData);
            if (this.responseData.returnStatus != 0) {
              this.quizId = this.responseData.quizId;
              this.quizList = this.responseData.quizList;
              console.log(this.responseData.quizList);
              if (this.responseData.quizList != null) {
                this.quizShown = true;
              } else {
                this.quizShown = false;
                const alert = this.alertCtrl.create({
                  message: this.responseData.returnMessage,
                  buttons: [{
                    text: 'Ok',
                    handler: () => {
                      this.navCtrl.setRoot("QuizResultsPage", { "quizId": this.quizId });
                    }
                  }],
                  enableBackdropDismiss: false
                });
                alert.present();
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
    this.navCtrl.setRoot("MenuPage");
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

  SubmitQuiz() {
    var flag = true;
    var innerflag = false;
    var Question = new Array();
    var Ans = new Array();
    for (var i = 1; i <= (this.quizList).length; i++) {

      Question[i - 1] = (<HTMLInputElement>document.getElementById("Question" + i)).value;

      Ans[i - 1] = (<HTMLInputElement>document.getElementById("option" + i)).value;

      innerflag = false;

      let nodeList: NodeList = document.getElementsByName("option" + i);
      let ansOption: Array<HTMLInputElement> = [];

      if (nodeList) {
        for (let i = 0; i < nodeList.length; i++) {
          let node: Node = nodeList[i];

          if (node.nodeType == Node.ELEMENT_NODE) {
            ansOption.push(node as HTMLInputElement);
          }
        }
      }
      console.log(i, ansOption.length);
      for (var j = 0; j < ansOption.length; j++) {
        if (ansOption[j].checked) {
          innerflag = true;
          Ans[i - 1] = ansOption[j].value;
        }
      }

      if (!innerflag) {
        flag = false;
      }
    }
    if (flag) {
      //alert("answered the all Quiz Question");
      console.log(Question, Ans);

      let loader = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loader.present();
      this.dataService.saveStudentQuizDetails(this.userDetails, this.quizId, Question, Ans).then((result) => {
        loader.dismiss();
        this.responseData = result;
        console.log(this.responseData);
        if (this.responseData.returnStatus != 0) {
          this.navCtrl.setRoot("QuizResultsPage", { "quizId": this.quizId });
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
    } else {
      const alert = this.alertCtrl.create({
        message: "Please answer the all Quiz Question",
        buttons: [{
          text: 'Ok',
          handler: () => {
            //this.goHome();
          }
        }],
        enableBackdropDismiss: false
      });
      alert.present();
      return false;
    }
  }

  showQuizResults() {
    this.navCtrl.setRoot("QuizResultsPage", { "quizId": this.quizId });
  }
  goPage(pmPage) {
    this.navCtrl.setRoot(pmPage);
  }

}
