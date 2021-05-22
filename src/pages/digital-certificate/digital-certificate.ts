import { Component } from "@angular/core";
import {
  Platform,
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  LoadingController,
} from "ionic-angular";
import { DataProvider } from "../../providers/data/data";
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: "page-digital-certificate",
  templateUrl: "digital-certificate.html",
})
export class DigitalCertificatePage {
  unregisterBackButtonAction: any;
  consistencyList: any = [];
  responseData: any;
  userDetails: any;
  imgPreview = "assets/imgs/no_image.png";
  monthYear: any = "";

  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public platform: Platform,
    public dataService: DataProvider
  ) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let d = new Date();
    this.monthYear = monthNames[d.getMonth()] + " " + d.getFullYear();
    this.storage.get("userDetails").then((res: any) => {
      if (res) {
        this.userDetails = res;
        console.log(this.userDetails);
      }
    });
  }

  goHome() {
    this.navCtrl.setRoot("ConsistencyPage");
  }

  sharePage() {
    console.log("share");
    this.navCtrl.setRoot("DigitalCertificateSharePage", {
      userDetails: this.userDetails,
    });
  }

  ionViewDidLoad() {
    this.storage.get("imgPreview").then((res: any) => {
      if (res) {
        this.imgPreview = res;
        console.log("Img=>", this.imgPreview);
        let cusid_ele = document.getElementsByClassName("profile-avatar");
        for (let i = 0; i < cusid_ele.length; ++i) {
          let item = cusid_ele[i];
          item.setAttribute(
            "style",
            "background-image: url(" + this.imgPreview + ");"
          );
        }
      }
    });
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
}
