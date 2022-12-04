import { Component, ViewChild } from "@angular/core";
import { Platform, IonicPage, NavController, NavParams } from "ionic-angular";
import { DataProvider } from "../../providers/data/data";
declare var window: any;

@IonicPage()
@Component({
  selector: "page-parent-gate",
  templateUrl: "parent-gate.html",
})
export class ParentGatePage {
  @ViewChild("slides") slides: any;
  unregisterBackButtonAction: any;

  hasAnswered: boolean = false;
  score: number = 0;

  slideOptions: any;
  questions: any;
  fromPage: any;
  externalLink: any;

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public navParams: NavParams,
    public dataService: DataProvider
  ) {
    if (this.navParams.get("fromPage")) {
      this.fromPage = this.navParams.get("fromPage");
    }
    if (this.navParams.get("externalLink")) {
      this.externalLink = this.navParams.get("externalLink");
    }
  }

  ionViewDidLoad() {
    this.initializeBackButtonCustomHandler();
    this.slides.lockSwipes(true);

    this.dataService.loadQuestions().then((data: any) => {
      data.map((question) => {
        let originalOrder = question.answers;
        question.answers = this.randomizeAnswers(originalOrder);
        return question;
      });

      this.questions = this.randomizeAnswers(data);
      this.questions = this.questions.slice(0, 3);
      console.log("this.questions", this.questions);
    });
  }

  nextSlide() {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }

  selectAnswer(answer, question, index) {
    console.log(answer, question, index);
    this.hasAnswered = true;
    answer.selected = true;
    question.flashCardFlipped = true;
    if (answer.correct) {
      question.flashCardState = "1";
    } else {
      question.flashCardState = "-1";
    }
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
    setTimeout(() => {
      this.hasAnswered = false;
      answer.selected = false;
      question.flashCardFlipped = false;
      if (answer.correct) {
        console.log("answer correct");
        window.open(this.externalLink, "_system", "location=yes");
        this.navCtrl.setRoot(this.fromPage);
        return false;
      } else {
        if (index == this.questions.length - 1) {
          console.log("last slide");
          // this.slides.lockSwipes(false);
          // this.slides.slideTo(1, 1000);
          // this.slides.lockSwipes(true);
          this.navCtrl.setRoot(this.fromPage);
        } else {
          this.nextSlide();
        }
        console.log("answer incorrect");
      }
    }, 1000);
  }

  randomizeAnswers(rawAnswers: any[]): any[] {
    for (let i = rawAnswers.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = rawAnswers[i];
      rawAnswers[i] = rawAnswers[j];
      rawAnswers[j] = temp;
    }

    return rawAnswers;
  }

  ionViewWillLeave() {
    console.log("HomePage Leave-->");
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  initializeBackButtonCustomHandler(): void {
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(
      () => {
        console.log("Prevent Back Button Page Change-->");
        this.navCtrl.setRoot(this.fromPage);
      }
    );
  }
}
