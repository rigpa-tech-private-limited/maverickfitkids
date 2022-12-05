import { Component } from "@angular/core";
import {
  Platform,
  IonicPage,
  NavController,
  NavParams,
  ViewController,
} from "ionic-angular";
@IonicPage()
@Component({
  selector: "page-about",
  templateUrl: "about.html",
})
export class AboutPage {
  unregisterBackButtonAction: any;
  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {}

  closeModal(): void {
    this.viewCtrl.dismiss({ slideAction: "close" });
  }

  repeatSlide() {
    this.viewCtrl.dismiss({ slideAction: "repeat" });
  }

  finishSlide() {
    this.viewCtrl.dismiss({ slideAction: "finish" });
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
        this.closeModal();
      }
    );
  }

  openExternalLink(pmLink, fromPage) {
    if (this.platform.is("ios")) {
      this.navCtrl.setRoot("ParentGatePage", {
        externalLink: pmLink,
        fromPage: fromPage,
      });
    } else {
      window.open(pmLink, "_system", "location=yes");
      return false;
    }
  }
}
