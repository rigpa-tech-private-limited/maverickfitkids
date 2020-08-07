import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
import { DatabaseProvider } from '../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  unregisterBackButtonAction: any;
  showedAlert: boolean;
  confirmAlert: any;
  elementStdId: any;
  imgPreview = 'assets/imgs/no_image.png';
  showGamesMenu: boolean = false; //Games (class 1 to 5)
  showActiveTracksMenu: boolean = false; //Active Tracks (class 6 to 12)
  showSportSkillsMenu: boolean = false; //Sport Skills (class 6 to 8)
  showQuizMenu: boolean = false; //Quiz (class 1 to 8)
  showSportsMenu: boolean = false; //Sports (Class 9 to 12)
  showTransformMenu: boolean = false;  //Transform (class 1 to 5)
  showChallengeMenu: boolean = false; //Challenge (class 8 to 12)
  showFitSpotMenu: boolean = false; //Challenge (class 1 to 8)
  showSessionMenu: boolean = false; //Session (class 1 to 8)
  showGuidesMenu: boolean = false; //Guides (Class 9 to 12)
  showFitSpotSessionIcon: boolean = false;
  showMenuIcon: boolean = true;
  showNoAccessMsg: boolean = false;
  studentId: any;
  storedIds: any;
  arrStudentImgs: any = [];
  userDetails: any;
  responseData: any;
  redDotVisibleCoach: boolean = false;
  constructor(public navCtrl: NavController,
    public platform: Platform,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public databaseprovider: DatabaseProvider,
    public dataService: DataProvider) {
    this.databaseprovider.getDatabaseState();

    this.storage.get('userDetails')
      .then((res: any) => {
        if (res) {
          this.userDetails = res;
          if (res.coachFlag == "1") {
            this.redDotVisibleCoach = true;
          }
          this.studentId = res.studentId;
          if (res.className == "Pre KG" || res.className == "LKG" || res.className == "UKG" || res.className == "I" || res.className == "II" || res.className == "III" || res.className == "IV" || res.className == "V") {
            this.showGamesMenu = true;
          }

          if (res.className == "Pre KG" || res.className == "LKG" || res.className == "UKG" || res.className == "I" || res.className == "II" || res.className == "III" || res.className == "IV" || res.className == "V" || res.className == "VI" || res.className == "VII" || res.className == "VIII") {
            this.showQuizMenu = true;
          }
          if (res.className == "IX" || res.className == "X" || res.className == "XI" || res.className == "XII") {
            this.showSportsMenu = true;
          }

          if (res.className == "Pre KG" || res.className == "LKG" || res.className == "UKG" || res.className == "I" || res.className == "II" || res.className == "III" || res.className == "IV" || res.className == "V") {
            this.showTransformMenu = true;
          }
          if (res.className == "VI" || res.className == "VII" || res.className == "VIII" || res.className == "IX" || res.className == "X" || res.className == "XI" || res.className == "XII") {
            this.showChallengeMenu = true;
          }

          if (res.className == "Pre KG" || res.className == "LKG" || res.className == "UKG" || res.className == "I" || res.className == "II" || res.className == "III" || res.className == "IV" || res.className == "V" || res.className == "VI" || res.className == "VII" || res.className == "VIII") {
            this.showSessionMenu = true;
          }

          if (res.className == "IX" || res.className == "X" || res.className == "XI" || res.className == "XII") {
            this.showGuidesMenu = true;
          }

          if ((res.className == "Pre KG" || res.className == "LKG" || res.className == "UKG" || res.className == "I" || res.className == "II" || res.className == "III" || res.className == "IV" || res.className == "V" || res.className == "VI" || res.className == "VII" || res.className == "VIII")) {
            this.showFitSpotMenu = true;
          }
          
          if (res.fitzoneFlag == "1"){
            this.showFitSpotSessionIcon = true;
          }
          
          let loader = this.loadingCtrl.create({
            spinner: 'ios',
            content: ''
          });
          loader.present();
          this.dataService.isCheckSportSkills(this.userDetails.schoolCode, this.userDetails.classCode).then((result) => {
            this.responseData = result;
            loader.dismiss();
            console.log('isCheckSportSkills', this.responseData);
            if (res.className == "VI" || res.className == "VII" || res.className == "VIII" || res.className == "IX" || res.className == "X" || res.className == "XI" || res.className == "XII") {
              if ((this.responseData.skillFlag == "1") && (res.className == "VI" || res.className == "VII" || res.className == "VIII")) {
                this.showSportSkillsMenu = true;
              } else {
                this.showActiveTracksMenu = true;
              }
              this.databaseprovider.updateUserSportSkills(res.studentId, this.responseData.skillFlag)
                .then(data => {
                  console.log('User sports skills updated to local db.');
                }).catch(e => {
                  console.log(e);
                });
            }
          }, (err) => {
            loader.dismiss();
            console.log(err);
          });
          this.dataService.getStudentStar(this.userDetails).then((result) => {
            this.responseData = result;
            console.log(this.responseData);
            if (this.responseData.returnStatus != 0) {
              this.databaseprovider.updateUserStars(this.userDetails.studentId, this.responseData.starCount)
                .then(data => {
                  console.log('User star count updated to local db.');
                }).catch(e => {
                  console.log(e);
                });
            }
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
      this.logOut();
    });
  }

  goPage(pmPage) {

    if (pmPage == "ChallengePage") {
      this.dataService.getStudentChallenge(this.userDetails).then((result) => {
        this.responseData = result;
        console.log(this.responseData);
        if (this.responseData.returnStatus != 0) {
          console.log("challengeApproved", this.responseData.challengeApproved);
          if (this.responseData.challengeApproved == '0') {
            this.navCtrl.setRoot('TransformPage');
          } else {
            this.navCtrl.setRoot(pmPage);
          }
        } else if (this.responseData.returnStatus == 0) {
          console.log('returnStatus=>0');
          this.navCtrl.setRoot(pmPage);
        }
      }, (err) => {
        console.log(err);
      });
    } else {
      this.navCtrl.setRoot(pmPage);
    }
  }

  clearData() {
    //this.storage.clear();
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  logOutFromHome() {
    if (!this.platform.is('android')) {
      this.logOut();
    }
  }

  logOut() {
    if (!this.showedAlert) {
      this.showedAlert = true;
      this.confirmAlert = this.alertCtrl.create({
        title: 'Log off',
        message: 'Do you want to log off?',
        buttons: [{
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Application exit prevented!');
          }
        }, {
          text: 'Yes',
          handler: () => {
            // this.storage.clear();
            // this.navCtrl.setRoot("RegisterPage");
            this.databaseprovider.updateUserStatus(this.userDetails.studentId, '2')
              .then(data => {
                console.log('User status updated to local db.');
                this.databaseprovider.updateUserLockStatus(this.userDetails.studentId, '0')
                  .then(data => {
                    console.log('User status updated to local db.');
                    this.navCtrl.setRoot("UsersPage");
                  }).catch(e => {
                    console.log(e);
                  });
              }).catch(e => {
                console.log(e);
              });
          }
        }]
      });
      this.confirmAlert.present();
    } else {
      this.showedAlert = false;
      this.confirmAlert.dismiss().catch(() => { })
    }
  }

  checkNoAccess(pmPage) {
    this.storage.get('userDetails')
      .then((res: any) => {
        if (res.studentAccessLevel == "2") {
          console.log(res.studentAccessLevel);
          this.showMenuIcon = false;
          this.showNoAccessMsg = true;
          setTimeout(() => {
            this.showMenuIcon = true;
            this.showNoAccessMsg = false;
            console.log(res.studentAccessLevel);
          }, 5000);

        } else {
          if (pmPage != '') {
            this.navCtrl.setRoot(pmPage);
          }
        }
      });
  }
}
