import { Component, ElementRef, ViewChild } from "@angular/core";
import {
  Platform,
  ModalController,
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  LoadingController,
} from "ionic-angular";
import { Storage } from "@ionic/storage";
import { AppConfig } from "../../config/config";
import { DataProvider } from "../../providers/data/data";

@IonicPage()
@Component({
  selector: "page-pl-journey",
  templateUrl: "pl-journey.html",
})
export class PlJourneyPage {
  unregisterBackButtonAction: any;
  currentSlide: any = 0;
  imgPreview = "assets/imgs/no_image.png";
  responseData: any;
  userDetails: any;
  hasLoaded: boolean = false;
  questions: any = [];
  confirmAlert: any;
  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public platform: Platform,
    public dataService: DataProvider
  ) {
    this.storage.get("userDetails").then((res: any) => {
      if (res) {
        this.userDetails = res;
        console.log(this.userDetails);
        let loader = this.loadingCtrl.create({
          spinner: "ios",
          content: "",
        });
        loader.present();
        this.dataService.getPhysicalLiteracyJourney(this.userDetails).then(
          async (result) => {
            loader.dismiss();
            this.responseData = result;
            if (this.responseData.returnStatus != 0) {
              this.questions = this.responseData["physicalJourneyList"];
              await this.questions.sort(
                (a, b) => parseInt(a.questionId) - parseInt(b.questionId)
              );
              let j = 0;
              for (let i = 0; i < this.questions.length; i++) {
                if (i % 3 == 0) {
                  j = 0;
                }
                j++;
                this.questions[i]["questionIndex"] = j;
                let options = [];
                for (let k = 0; k < result["physicalOptionList"].length; k++) {
                  let option = {};
                  option["options"] =
                    result["physicalOptionList"][k]["options"];
                  option["optionId"] =
                    result["physicalOptionList"][k]["optionId"];
                  if (
                    this.questions[i]["soptionId"] ==
                    result["physicalOptionList"][k]["optionId"]
                  ) {
                    option["selected"] = true;
                  } else {
                    option["selected"] = false;
                  }
                  options.push(option);
                }
                this.questions[i]["answers"] = options;
              }
              console.log("questions", this.questions);
              this.hasLoaded = true;
              setTimeout(() => {
                let radioIcon = document.getElementsByClassName("radio-icon");
                for (let i = 0; i < radioIcon.length; ++i) {
                  let item = radioIcon[i];
                  item.setAttribute(
                    "style",
                    "border-color: #828282 !important;background-color: #fff !important;"
                  );
                }
                let radioBox = document.getElementsByClassName("radio-checked");
                for (let i = 0; i < radioBox.length; ++i) {
                  let item = radioBox[i];
                  item.setAttribute(
                    "style",
                    "border-color: #031337 !important;background-color: #FFF !important;"
                  );
                }
                let radioInner = document.querySelectorAll(
                  ".radio-checked .radio-inner"
                );
                for (let i = 0; i < radioInner.length; ++i) {
                  let item = radioInner[i];
                  item.setAttribute(
                    "style",
                    "background-color: #031337 !important;"
                  );
                }
              }, 200);
            } else if (this.responseData.returnStatus == 0) {
              console.log("returnStatus=>0");
              const alert = this.alertCtrl.create({
                message: this.responseData.returnMessage,
                buttons: [
                  {
                    text: "Ok",
                    handler: () => {
                      this.navCtrl.setRoot("MenuPage");
                    },
                  },
                ],
                enableBackdropDismiss: false,
              });
              alert.present();
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
    });
  }

  selectAnswer(aIndex, qIndex) {
    for (let i = 0; i < this.questions[qIndex]["answers"].length; i++) {
      this.questions[qIndex]["answers"][i]["selected"] = false;
    }
    this.questions[qIndex]["answers"][aIndex]["selected"] = true;
    console.log(this.questions, aIndex, qIndex);
    setTimeout(() => {
      let radioIcon = document.getElementsByClassName("radio-icon");
      for (let i = 0; i < radioIcon.length; ++i) {
        let item = radioIcon[i];
        item.setAttribute(
          "style",
          "border-color: #828282 !important;background-color: #fff !important;"
        );
      }
      let radioBox = document.getElementsByClassName("radio-checked");
      for (let i = 0; i < radioBox.length; ++i) {
        let item = radioBox[i];
        item.setAttribute(
          "style",
          "border-color: #031337 !important;background-color: #FFF !important;"
        );
      }
      let radioInner = document.querySelectorAll(".radio-checked .radio-inner");
      for (let i = 0; i < radioInner.length; ++i) {
        let item = radioInner[i];
        item.setAttribute("style", "background-color: #031337 !important;");
      }
    }, 200);
  }

  savePlJourney() {
    this.confirmAlert = this.alertCtrl.create({
      title: "Exit",
      message: "Do you want to save your changes?",
      buttons: [
        {
          text: "No",
          role: "cancel",
          handler: () => {
            console.log("No!");
          },
        },
        {
          text: "Yes",
          handler: () => {
            let loader = this.loadingCtrl.create({
              spinner: "ios",
              content: "",
            });
            loader.present();
            let questionArray = [];
            let optionArray = [];
            for (let i = 0; i < this.questions.length; i++) {
              let index = this.questions[i]["answers"].findIndex(
                (x) => x.selected === true
              );
              if (index != -1) {
                console.log("qId", this.questions[i]["questionId"]);
                questionArray.push(this.questions[i]["questionId"]);
                console.log(
                  "opId",
                  this.questions[i]["answers"][index]["optionId"]
                );
                optionArray.push(
                  this.questions[i]["answers"][index]["optionId"]
                );
              }
            }
            if (questionArray.length > 0 && optionArray.length > 0) {
              this.userDetails["questionArray"] = questionArray;
              this.userDetails["optionArray"] = optionArray;
              this.dataService.savePhysicalJourney(this.userDetails).then(
                (result) => {
                  loader.dismiss();
                  this.responseData = result;
                  console.log("result", result);
                  const alert = this.alertCtrl.create({
                    message: this.responseData.returnMessage,
                    buttons: [
                      {
                        text: "Ok",
                        handler: () => {
                          this.navCtrl.setRoot("MenuPage");
                        },
                      },
                    ],
                    enableBackdropDismiss: false,
                  });
                  alert.present();
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
          },
        },
      ],
    });
    this.confirmAlert.present();
  }

  ionViewDidLoad() {
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
        this.goHome();
      }
    );
  }

  goHome() {
    this.navCtrl.setRoot("MenuPage");
  }

  goPage(pmPage) {
    this.navCtrl.setRoot(pmPage);
  }
}
