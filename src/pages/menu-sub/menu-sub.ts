import { Component } from "@angular/core";
import {
  AlertController,
  IonicPage,
  LoadingController,
  ModalController,
  NavController,
  NavParams,
  Platform,
  ViewController,
} from "ionic-angular";
import { Storage } from "@ionic/storage";
import { DataProvider } from "../../providers/data/data";
import { DatabaseProvider } from "../../providers/database/database";
import { AppConfig } from "../../config/config";
import {
  InAppBrowser,
  InAppBrowserOptions,
} from "@ionic-native/in-app-browser";
import { Toast } from "@ionic-native/toast";

@IonicPage()
@Component({
  selector: "page-menu-sub",
  templateUrl: "menu-sub.html",
})
export class MenuSubPage {
  menuHead: any;

  showGamesMenu: boolean = false; //Games (class 1 to 5)
  showActiveTracksMenu: boolean = false; //Active Tracks (class 6 to 12)
  showSportSkillsMenu: boolean = false; //Sport Skills (class 6 to 8)
  showQuizMenu: boolean = false; //Quiz (class 1 to 8)
  showSportsMenu: boolean = false; //Sports (Class 9 to 12)
  showTransformMenu: boolean = false; //Transform (class 1 to 5)
  showChallengeMenu: boolean = false; //Challenge (class 8 to 12)
  showFitSpotMenu: boolean = false; //Challenge (class 1 to 8)
  showSessionMenu: boolean = false; //Session (class 1 to 8)
  showGuidesMenu: boolean = false; //Guides (Class 9 to 12)
  showFitSpotSessionIcon: boolean = false;
  showAspirationsMenu: boolean = false;
  showInsightsMenu: boolean = false;
  showExerciseMenu: boolean = false;
  showFitZoneMenu: boolean = false;
  showEndorserMenu: boolean = false;
  showPersonalDetailsMenu: boolean = false;
  showReviewMenu: boolean = false;
  showFitFestMenu: boolean = false;
  showCoachMenu: boolean = false;
  showPhysicalLiteracyMenu: boolean = false;
  showMaverickMinuteMenu: boolean = false;
  showConsistencyMenu: boolean = false;
  showQueryMenu: boolean = false;
  showPLJourneyMenu: boolean = false;

  studentId: any;
  storedIds: any;
  arrStudentImgs: any = [];
  userDetails: any;
  responseData: any;
  reviewPath: any;
  redDotVisibleCoach: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    public storage: Storage,
    public databaseprovider: DatabaseProvider,
    public dataService: DataProvider,
    public modalCtrl: ModalController,
    private toast: Toast,
    private iab: InAppBrowser
  ) {
    if (this.navParams.get("sportsCode")) {
      this.menuHead = this.navParams.get("sportsCode");
    }
    this.storage.get("userDetails").then((res: any) => {
      if (res) {
        this.userDetails = res;
        if (res.coachFlag == "1") {
          this.redDotVisibleCoach = true;
        }
        this.studentId = res.studentId;
        let classArr = this.dataService.getClassNumber(res.className);
        console.log("className Arr =>> ", classArr);

        // if (res.className == "Pre KG" || res.className == "LKG" || res.className == "UKG" || res.className == "I" || res.className == "II" || res.className == "III" || res.className == "IV" || res.className == "V" || res.className == "VI" || res.className == "VII" || res.className == "VIII") {
        //   this.showQuizMenu = true;
        // }
        if (
          classArr.indexOf(9) > -1 ||
          classArr.indexOf(10) > -1 ||
          classArr.indexOf(11) > -1 ||
          classArr.indexOf(12) > -1
        ) {
          this.showSportsMenu = true;
        }
        //If Transformation
        if (this.menuHead == "Transformation") {
          this.showAspirationsMenu = true;
          this.showInsightsMenu = true;
          this.showQuizMenu = true;

          if (
            classArr.indexOf(-3) > -1 ||
            classArr.indexOf(-2) > -1 ||
            classArr.indexOf(-1) > -1 ||
            classArr.indexOf(1) > -1 ||
            classArr.indexOf(2) > -1 ||
            classArr.indexOf(3) > -1 ||
            classArr.indexOf(4) > -1 ||
            classArr.indexOf(5) > -1
          ) {
            this.showTransformMenu = true;
          }
          if (
            classArr.indexOf(6) > -1 ||
            classArr.indexOf(7) > -1 ||
            classArr.indexOf(8) > -1 ||
            classArr.indexOf(9) > -1 ||
            classArr.indexOf(10) > -1 ||
            classArr.indexOf(11) > -1 ||
            classArr.indexOf(12) > -1
          ) {
            this.showChallengeMenu = true;
          }
        }

        // if ((res.className == "Pre KG" || res.className == "LKG" || res.className == "UKG" || res.className == "I" || res.className == "II" || res.className == "III" || res.className == "IV" || res.className == "V" || res.className == "VI" || res.className == "VII" || res.className == "VIII" || res.className == "IX" || res.className == "X" || res.className == "XI" || res.className == "XII")) {
        //   this.showFitSpotMenu = true;
        // }
        if (res.fitzoneFlag == "1") {
          this.showFitSpotSessionIcon = true;
        }

        //If Activity
        if (this.menuHead == "Activity") {
          this.showExerciseMenu = true;
          this.showSessionMenu = true;

          if (
            classArr.indexOf(-3) > -1 ||
            classArr.indexOf(-2) > -1 ||
            classArr.indexOf(-1) > -1 ||
            classArr.indexOf(1) > -1 ||
            classArr.indexOf(2) > -1 ||
            classArr.indexOf(3) > -1 ||
            classArr.indexOf(4) > -1 ||
            classArr.indexOf(5) > -1
          ) {
            this.showGamesMenu = true;
          }

          if (
            classArr.indexOf(6) > -1 ||
            classArr.indexOf(7) > -1 ||
            classArr.indexOf(8) > -1 ||
            classArr.indexOf(9) > -1 ||
            classArr.indexOf(10) > -1 ||
            classArr.indexOf(11) > -1 ||
            classArr.indexOf(12) > -1
          ) {
            this.showActiveTracksMenu = true;
          }

          // if (res.className == "Pre KG" || res.className == "LKG" || res.className == "UKG" || res.className == "I" || res.className == "II" || res.className == "III" || res.className == "IV" || res.className == "V" || res.className == "VI" || res.className == "VII" || res.className == "VIII") {
          //   this.showSessionMenu = true;
          // }

          if (
            classArr.indexOf(9) > -1 ||
            classArr.indexOf(10) > -1 ||
            classArr.indexOf(11) > -1 ||
            classArr.indexOf(12) > -1
          ) {
            this.showGuidesMenu = true;
          }
          if (
            classArr.indexOf(6) > -1 ||
            classArr.indexOf(7) > -1 ||
            classArr.indexOf(8) > -1
          ) {
            this.showSportSkillsMenu = true;
          }

          // let loader = this.loadingCtrl.create({
          //   spinner: 'ios',
          //   content: ''
          // });
          // loader.present();
          // this.dataService.isCheckSportSkills(this.userDetails.schoolCode, this.userDetails.classCode).then((result) => {
          // this.responseData = result;
          // loader.dismiss();
          // console.log('isCheckSportSkills', this.responseData);
          // if (res.className == "VI" || res.className == "VII" || res.className == "VIII" || res.className == "IX" || res.className == "X" || res.className == "XI" || res.className == "XII") {
          // if ((this.responseData.skillFlag == "1") && (res.className == "VI" || res.className == "VII" || res.className == "VIII")) {
          //   this.showSportSkillsMenu = true;
          // }
          // else {
          //    this.showActiveTracksMenu = true;
          // }
          // this.databaseprovider.updateUserSportSkills(res.studentId, this.responseData.skillFlag)
          //   .then(data => {
          //     console.log('User sports skills updated to local db.');
          //   }).catch(e => {
          //     console.log(e);
          //   });
          // }
          // }, (err) => {
          //   loader.dismiss();
          //   console.log(err);
          // });
        }
        this.dataService.getStudentStar(this.userDetails).then((result) => {
          this.responseData = result;
          console.log(this.responseData);
          if (this.responseData.returnStatus != 0) {
            this.databaseprovider
              .updateUserStars(
                this.userDetails.studentId,
                this.responseData.starCount
              )
              .then((data) => {
                console.log("User star count updated to local db.");
              })
              .catch((e) => {
                console.log(e);
              });
          }
        });
      }
    });

    if (this.menuHead == "Video Lessons") {
      this.showCoachMenu = true;
      this.showPhysicalLiteracyMenu = true;
    }
    if (this.menuHead == "Personal Details") {
      this.showEndorserMenu = true;
      this.showFitZoneMenu = true;
      this.showPersonalDetailsMenu = true;
      this.showReviewMenu = true;
      this.showFitFestMenu = true;
    }
    if (this.menuHead == "Consistency") {
      this.showMaverickMinuteMenu = true;
      this.showFitSpotMenu = true;
      this.showConsistencyMenu = true;
      this.showPLJourneyMenu = true;
    }
    if (this.menuHead == "Notification") {
      this.showQueryMenu = true;
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad MenuSubPage");
  }

  closeModal(): void {
    this.viewCtrl.dismiss({ slideAction: "close" });
  }

  goPage(pmPage) {
    if (pmPage == "ChallengePage") {
      this.dataService.getStudentChallenge(this.userDetails).then(
        (result) => {
          this.responseData = result;
          console.log(this.responseData);
          if (this.responseData.returnStatus != 0) {
            console.log(
              "challengeApproved",
              this.responseData.challengeApproved
            );
            if (this.responseData.challengeApproved == "0") {
              this.navCtrl.setRoot("TransformPage");
            } else {
              this.navCtrl.setRoot(pmPage);
            }
          } else if (this.responseData.returnStatus == 0) {
            console.log("returnStatus=>0");
            this.navCtrl.setRoot(pmPage);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.navCtrl.setRoot(pmPage);
    }
  }
  openModal(pageName) {
    let modal = this.modalCtrl.create(pageName, null, {
      cssClass: "exercise-modal",
      enableBackdropDismiss: true,
    });
    modal.present();
  }

  checkNoAccess(pmPage) {
    this.storage.get("userDetails").then((res: any) => {
      if (
        (res.studentAccessLevel == "2" && pmPage == "QueryPage") ||
        (res.fitzoneFlag == "1" && pmPage == "ReviewPage") ||
        (res.fitzoneFlag == "1" && pmPage == "FitFestPage")
      ) {
        console.log(res.studentAccessLevel);
        this.toast
          .show(
            `Sorry! This feature is available only for schools that use the Maverick Physical Literacy Curriculum.If you have any queries please write to ceo@maverickliteracy.net`,
            "5000",
            "center"
          )
          .subscribe((toast) => {
            console.log(toast);
          });
      } else {
        if (pmPage != "") {
          if (pmPage == "ReviewPage") {
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
      spinner: "ios",
      content: "",
    });
    loader.present();
    this.dataService.getStudent3AReview(this.userDetails).then(
      (result) => {
        loader.dismiss();
        this.responseData = result;
        console.log(this.responseData);
        if (this.responseData.returnStatus != 0) {
          this.reviewPath = AppConfig.SITE_URL + this.responseData.reviewPath;
          console.log(this.reviewPath);
          const options: InAppBrowserOptions = {
            zoom: "no",
          };
          const browser = this.iab.create(
            "https://docs.google.com/gview?embedded=true&url=" +
              this.reviewPath,
            "_blank",
            options
          );
          console.log(browser);
        } else if (this.responseData.returnStatus == 0) {
          console.log("returnStatus=>0");
          let modal = this.modalCtrl.create(
            "ReviewPopupPage",
            {},
            {
              cssClass: "exercise-modal",
              enableBackdropDismiss: true,
            }
          );
          modal.present();

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
      },
      (err) => {
        console.log(err);
        loader.dismiss();
        const alert = this.alertCtrl.create({
          message: AppConfig.API_ERROR,
          buttons: [
            {
              text: "Ok",
              handler: () => {},
            },
          ],
        });
        alert.present();
      }
    );
  }
}
