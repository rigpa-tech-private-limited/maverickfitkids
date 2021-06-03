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
import { AppConfig } from "../../config/config";

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
  digitalCertificateStatus = false;
  selectMonth:any;
  currYear:any;
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
    
    if (this.navParams.get('selectMonth')) {
      this.selectMonth = this.navParams.get('selectMonth');
    }
    if (this.navParams.get('currYear')) {
      this.currYear = this.navParams.get('currYear');
      let monthNumString = this.selectMonth;
      let monthNumber: number  = +monthNumString;
      this.monthYear = monthNames[monthNumber-1] + " " + this.currYear;
    }
    this.storage.get("userDetails").then((res: any) => {
      if (res) {
        this.userDetails = res;
        console.log(this.userDetails);
        this.storage.get('imgPreview')
        .then((res: any) => {
          if (res) {
            this.imgPreview = res;
            console.log("Img=>", this.imgPreview);
            let cusid_ele = document.getElementsByClassName('dg-batch-photo');
            for (let i = 0; i < cusid_ele.length; ++i) {
              let item = cusid_ele[i];
              item.setAttribute("style", "background-image: url(" + this.imgPreview + ");");
            }
          }
        });
        this.getStudentdigitalCertificateStatus(this.selectMonth,this.currYear);
      }
    });
  }

  getStudentdigitalCertificateStatus(pmMonth,pmYear) {
    let loader = this.loadingCtrl.create({
      spinner: 'ios',
      content: ''
    });
    loader.present();
    this.dataService.getStudentdigitalCertificateStatus(this.userDetails, pmMonth, pmYear).then((result) => {
      loader.dismiss();
      this.responseData = result;
      console.log(this.responseData);
      if (this.responseData.returnStatus == "1") {
        this.digitalCertificateStatus = true;
      } else if (this.responseData.returnStatus == "0") {
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

  goHome() {
    this.navCtrl.setRoot("ConsistencyPage");
  }

  sharePage() {
    console.log("share");
    if(this.digitalCertificateStatus){
      this.navCtrl.setRoot("DigitalCertificateSharePage", {
        userDetails: this.userDetails,
        "selectMonth": this.selectMonth, 
        "currYear": this.currYear,
        "imgPreview": this.imgPreview
      });
    }
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
