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
import { Chart } from "chart.js";

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
  responseData1: any;
  userDetails: any;
  hasLoaded: boolean = false;
  noQuestions: boolean = false;
  questions: any = [];
  chartDatasets = [];
  confirmAlert: any;
  hrzLines2: any;
  colorArray: any;
  @ViewChild("hrzLineChart2") hrzLineChart2;

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
    this.storage.get("userDetails").then(async (res: any) => {
      if (res) {
        this.userDetails = res;
        console.log(this.userDetails);

        let loader = this.loadingCtrl.create({
          spinner: "ios",
          content: "",
        });
        loader.present();
        await this.dataService
          .getPhysicalLiteracyJourney(this.userDetails)
          .then(
            async (result) => {
              loader.dismiss();
              this.responseData = result;
              if (this.responseData.returnStatus == 1) {
                this.showQuestionOrResult(1);
                if (this.questions) {
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
                    for (
                      let k = 0;
                      k < result["physicalOptionList"].length;
                      k++
                    ) {
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
                    let radioIcon =
                      document.getElementsByClassName("radio-icon");
                    for (let i = 0; i < radioIcon.length; ++i) {
                      let item = radioIcon[i];
                      item.setAttribute(
                        "style",
                        "border-color: #828282 !important;background-color: #fff !important;"
                      );
                    }
                    let radioBox =
                      document.getElementsByClassName("radio-checked");
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
                }
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
              } else if (this.responseData.returnStatus == 2) {
                console.log("returnStatus=>2");
                this.showQuestionOrResult(2);
                this.noQuestions = true;
                const alert = this.alertCtrl.create({
                  message: this.responseData.returnMessage,
                  buttons: [
                    {
                      text: "Ok",
                      handler: () => {},
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
        await this.dataService.getPhysicalLiteracyChart(this.userDetails).then(
          async (result) => {
            this.responseData1 = result;
            if (this.responseData1.returnStatus != 0) {
              console.log(
                "physicalChartList",
                this.responseData1["physicalChartList"]
              );
              if (this.responseData1["physicalChartList"]) {
                let cDatasets = this.responseData1["physicalChartList"];
                console.log("cDatasets", cDatasets);

                for (let i = 0; i < cDatasets[0]["plDetail"].length; i++) {
                  let cDataObj = {
                    label: "",
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
                    backgroundColor: "rgba(0, 0, 0, 0)",
                    borderColor: "rgb(38, 194, 129)",
                    borderWidth: 1,
                  };
                  cDataObj["label"] = cDatasets[0]["plDetail"][i]["title"];
                  let dataArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                  for (let j = 0; j < cDatasets.length; j++) {
                    dataArr[j] = parseInt(cDatasets[j]["plDetail"][i]["value"]);
                  }
                  cDataObj["data"] = dataArr;
                  if (i == 0) {
                    cDataObj["borderColor"] = "rgb(38, 194, 129)";
                  } else if (i == 1) {
                    cDataObj["borderColor"] = "rgb(242, 38, 19)";
                  } else if (i == 2) {
                    cDataObj["borderColor"] = "rgb(0, 0, 255)";
                  } else if (i == 3) {
                    cDataObj["borderColor"] = "rgb(128, 0, 0)";
                  }
                  this.chartDatasets.push(cDataObj);
                }
                console.log("chartDatasets", this.chartDatasets);
                this.createGroupLineChart();
              }
            } else if (this.responseData1.returnStatus == 0) {
              console.log("returnStatus=>0");
              const alert1 = this.alertCtrl.create({
                message: this.responseData1.returnMessage,
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
              alert1.present();
            }
          },
          (err) => {
            console.log(err);
            const alert1 = this.alertCtrl.create({
              message: AppConfig.API_ERROR,
              buttons: [
                {
                  text: "Ok",
                  handler: () => {},
                },
              ],
            });
            alert1.present();
          }
        );
      }
    });
  }

  ionViewDidEnter() {
    // this.createGroupLineChart();
  }

  showQuestionOrResult(pmFlag, pmAction = "") {
    if (this.noQuestions && pmAction == "click") {
      const alert1 = this.alertCtrl.create({
        message: "Journey details already saved for this month",
        buttons: [
          {
            text: "Ok",
            handler: () => {},
          },
        ],
        enableBackdropDismiss: false,
      });
      alert1.present();
    } else {
      if (pmFlag == 1) {
        let plContent = document.getElementsByClassName("plContent");
        for (let i = 0; i < plContent.length; ++i) {
          let item = plContent[i];
          item.setAttribute("style", "visibility:visible;");
        }
        let plSaveButton = document.getElementsByClassName("plSaveButton");
        for (let i = 0; i < plSaveButton.length; ++i) {
          let item = plSaveButton[i];
          item.setAttribute("style", "visibility:visible;");
        }
        let plChart = document.getElementsByClassName("plChart");
        for (let i = 0; i < plChart.length; ++i) {
          let item = plChart[i];
          item.setAttribute("style", "visibility:hidden;height:0;");
        }
      } else {
        let plContent = document.getElementsByClassName("plContent");
        for (let i = 0; i < plContent.length; ++i) {
          let item = plContent[i];
          item.setAttribute("style", "visibility:hidden;height:0;");
        }
        let plSaveButton = document.getElementsByClassName("plSaveButton");
        for (let i = 0; i < plSaveButton.length; ++i) {
          let item = plSaveButton[i];
          item.setAttribute("style", "visibility:hidden;height:0;");
        }
        let plChart = document.getElementsByClassName("plChart");
        for (let i = 0; i < plChart.length; ++i) {
          let item = plChart[i];
          item.setAttribute("style", "visibility:visible;");
        }
      }
    }
  }

  createGroupLineChart() {
    this.hrzLines2 = new Chart(this.hrzLineChart2.nativeElement, {
      type: "line",
      data: {
        labels: [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUN",
          "JUL",
          "AUG",
          "SEP",
          "OCT",
          "NOV",
          "DEC",
        ],
        datasets: this.chartDatasets,
      },
      options: {
        legend: {
          display: false,
          position: "bottom",
          fullWidth: true,
          labels: {
            fontColor: "rgb(0, 0, 0)",
            padding: 20,
            boxWidth: 20,
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                max: 15,
                min: 0,
                stepSize: 1,
                beginAtZero: true,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                stepSize: 1,
                fontSize: 9,
              },
            },
          ],
        },
      },
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
      title: "Confirm",
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
