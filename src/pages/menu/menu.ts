import { Component } from "@angular/core";
import {
  Platform,
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  LoadingController,
  ModalController,
} from "ionic-angular";
import { DataProvider } from "../../providers/data/data";
import { Storage } from "@ionic/storage";
import { DatabaseProvider } from "../../providers/database/database";

@IonicPage()
@Component({
  selector: "page-menu",
  templateUrl: "menu.html",
})
export class MenuPage {
  unregisterBackButtonAction: any;
  showedAlert: boolean;
  confirmAlert: any;
  elementStdId: any;
  imgPreview = "assets/imgs/no_image.png";
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
  showMenuIcon: boolean = true;
  showNoAccessMsg: boolean = false;
  studentId: any;
  storedIds: any;
  arrStudentImgs: any = [];
  userDetails: any;
  responseData: any;
  redDotVisibleCoach: boolean = false;
  specialMessage = "";
  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public databaseprovider: DatabaseProvider,
    public dataService: DataProvider,
    public modalCtrl: ModalController
  ) {
    this.databaseprovider.getDatabaseState();

    this.storage.get("userDetails").then((res: any) => {
      console.log("userDetails userDetails =>> ", JSON.stringify(res));
      if (res) {
        this.userDetails = res;
        this.specialMessage = res.specialConsideration;
        if (res.coachFlag == "1") {
          this.redDotVisibleCoach = true;
        }
        this.studentId = res.studentId;
        let classArr = this.dataService.getClassNumber(res.className);
        console.log("className Arr =>> ", classArr);
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
          classArr.indexOf(-3) > -1 ||
          classArr.indexOf(-2) > -1 ||
          classArr.indexOf(-1) > -1 ||
          classArr.indexOf(1) > -1 ||
          classArr.indexOf(2) > -1 ||
          classArr.indexOf(3) > -1 ||
          classArr.indexOf(4) > -1 ||
          classArr.indexOf(5) > -1 ||
          classArr.indexOf(6) > -1 ||
          classArr.indexOf(7) > -1 ||
          classArr.indexOf(8) > -1
        ) {
          this.showQuizMenu = true;
        }
        if (
          classArr.indexOf(9) > -1 ||
          classArr.indexOf(10) > -1 ||
          classArr.indexOf(11) > -1 ||
          classArr.indexOf(12) > -1
        ) {
          this.showSportsMenu = true;
        }

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

        if (
          classArr.indexOf(-3) > -1 ||
          classArr.indexOf(-2) > -1 ||
          classArr.indexOf(-1) > -1 ||
          classArr.indexOf(1) > -1 ||
          classArr.indexOf(2) > -1 ||
          classArr.indexOf(3) > -1 ||
          classArr.indexOf(4) > -1 ||
          classArr.indexOf(5) > -1 ||
          classArr.indexOf(6) > -1 ||
          classArr.indexOf(7) > -1 ||
          classArr.indexOf(8) > -1
        ) {
          this.showSessionMenu = true;
        }

        if (
          classArr.indexOf(9) > -1 ||
          classArr.indexOf(10) > -1 ||
          classArr.indexOf(11) > -1 ||
          classArr.indexOf(12) > -1
        ) {
          this.showGuidesMenu = true;
        }

        if (
          classArr.indexOf(-3) > -1 ||
          classArr.indexOf(-2) > -1 ||
          classArr.indexOf(-1) > -1 ||
          classArr.indexOf(1) > -1 ||
          classArr.indexOf(2) > -1 ||
          classArr.indexOf(3) > -1 ||
          classArr.indexOf(4) > -1 ||
          classArr.indexOf(5) > -1 ||
          classArr.indexOf(6) > -1 ||
          classArr.indexOf(7) > -1 ||
          classArr.indexOf(8) > -1 ||
          classArr.indexOf(9) > -1 ||
          classArr.indexOf(10) > -1 ||
          classArr.indexOf(11) > -1 ||
          classArr.indexOf(12) > -1
        ) {
          this.showFitSpotMenu = true;
        }

        if (res.fitzoneFlag == "1") {
          this.showFitSpotSessionIcon = true;
        }

        let loader = this.loadingCtrl.create({
          spinner: "ios",
          content: "",
        });
        loader.present();
        this.dataService
          .isCheckSportSkills(
            this.userDetails.schoolCode,
            this.userDetails.classCode
          )
          .then(
            (result) => {
              this.responseData = result;
              loader.dismiss();
              console.log("isCheckSportSkills", this.responseData);
              if (
                classArr.indexOf(6) > -1 ||
                classArr.indexOf(7) > -1 ||
                classArr.indexOf(8) > -1 ||
                classArr.indexOf(9) > -1 ||
                classArr.indexOf(10) > -1 ||
                classArr.indexOf(11) > -1 ||
                classArr.indexOf(12) > -1
              ) {
                if (
                  this.responseData.skillFlag == "1" &&
                  (classArr.indexOf(6) > -1 ||
                    classArr.indexOf(7) > -1 ||
                    classArr.indexOf(8) > -1)
                ) {
                  this.showSportSkillsMenu = true;
                } else {
                  this.showActiveTracksMenu = true;
                }
                this.databaseprovider
                  .updateUserSportSkills(
                    res.studentId,
                    this.responseData.skillFlag
                  )
                  .then((data) => {
                    console.log("User sports skills updated to local db.");
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              }
            },
            (err) => {
              loader.dismiss();
              console.log(err);
            }
          );
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
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad MenuPage");
    // this.storage.get('imgPreview')
    //   .then((res: any) => {
    //     if (res) {
    //       this.imgPreview = res;
    //       console.log("Img=>", this.imgPreview);
    //       let cusid_ele = document.getElementsByClassName('profile-avatar');
    //       for (let i = 0; i < cusid_ele.length; ++i) {
    //         let item = cusid_ele[i];
    //         item.setAttribute("style", "background-image: url(" + this.imgPreview + ");");
    //       }
    //     }
    //   });

    this.initializeBackButtonCustomHandler();
  }

  ionViewWillLeave() {
    console.log("HomePage Leave-->");
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  initializeBackButtonCustomHandler(): void {
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(
      () => {
        console.log("Prevent Back Button Page Change-->");
        this.logOut();
      }
    );
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

  clearData() {
    //this.storage.clear();
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  logOutFromHome() {
    if (!this.platform.is("android")) {
      this.logOut();
    }
  }

  logOut() {
    if (!this.showedAlert) {
      this.showedAlert = true;
      this.confirmAlert = this.alertCtrl.create({
        title: "Log off",
        message: "Do you want to log off?",
        buttons: [
          {
            text: "No",
            role: "cancel",
            handler: () => {
              console.log("Application exit prevented!");
            },
          },
          {
            text: "Yes",
            handler: () => {
              // this.storage.clear();
              // this.navCtrl.setRoot("RegisterPage");
              this.databaseprovider
                .updateUserStatus(this.userDetails.studentId, "2")
                .then((data) => {
                  console.log("User status updated to local db.");
                  this.databaseprovider
                    .updateUserLockStatus(this.userDetails.studentId, "0")
                    .then((data) => {
                      console.log("User status updated to local db.");
                      this.navCtrl.setRoot("UsersPage");
                    })
                    .catch((e) => {
                      console.log(e);
                    });
                })
                .catch((e) => {
                  console.log(e);
                });
            },
          },
        ],
      });
      this.confirmAlert.present();
    } else {
      this.showedAlert = false;
      this.confirmAlert.dismiss().catch(() => {});
    }
  }

  checkNoAccess(pmPage) {
    this.storage.get("userDetails").then((res: any) => {
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
        if (pmPage != "") {
          this.navCtrl.setRoot(pmPage);
        }
      }
    });
  }

  openModal(pageName, pmSportsCode) {
    let modal = this.modalCtrl.create(
      pageName,
      { sportsCode: pmSportsCode },
      {
        cssClass: "exercise-modal",
        enableBackdropDismiss: true,
      }
    );
    modal.present();
  }
}
