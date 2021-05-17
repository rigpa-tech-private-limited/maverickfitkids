import { Component } from '@angular/core';
import { Platform, ModalController, IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../config/config';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-fit-fest',
  templateUrl: 'fit-fest.html',
})
export class FitFestPage {
  unregisterBackButtonAction: any;
  fitfestList: any;
  fitfestListtesting: any;
  preFitfestList: any;
  preFitfestListtesting: any;
  responseData: any;
  userDetails: any;
  showAboutTest: boolean = false;
  showTestResults: boolean = false;
  showCurrentResult: boolean = true;
  beforeIII: boolean = false;
  imgPreview = 'assets/imgs/no_image.png';
  studentName: any;
  studentClass: any;
  studentSection: any;
  schoolName: any;
  dob: any;
  studentAge: any;
  locAge: any;
  perRank: any;
  objAge: any;
  objDescription: any;
  locDescription: any;
  objperRank: any;
  fitfestDate: any;
  locperRank: any;
  gmqDesc: any;


  constructor(public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public platform: Platform,
    public dataService: DataProvider) {
    this.storage.get('userDetails')
      .then((res: any) => {
        if (res) {
          this.userDetails = res;
          console.log(this.userDetails);
          this.studentName = ((this.userDetails.studentName != null) ? this.userDetails.studentName : "");
          this.studentClass = ((this.userDetails.className != null) ? this.userDetails.className : "");
          this.studentSection = ((this.userDetails.sectionName != null) ? this.userDetails.sectionName : "");
          this.schoolName = ((this.userDetails.schoolName != null) ? this.userDetails.schoolName : "");
          this.dob = ((this.userDetails.dob != null) ? this.userDetails.dob : "");
          this.studentAge = ((this.userDetails.studentAge != null) ? this.userDetails.studentAge : "");
          if (res.className == "Pre KG" || res.className == "LKG" || res.className == "UKG" || res.className == "I" || res.className == "II") {

            let loader = this.loadingCtrl.create({
              spinner: 'ios',
              content: ''
            });
            loader.present();
            this.dataService.getStudentFitFestDetailsforbeforeIII(this.userDetails).then((result) => {
              loader.dismiss();
              this.responseData = result;
              console.log(this.responseData);
              if (this.responseData.returnStatus != 0) {
                if (this.responseData.fitfestbeforeIIIList) {
                  this.beforeIII = true;
                  this.locAge = ((this.responseData.fitfestbeforeIIIList[0].locAge != null) ? this.responseData.fitfestbeforeIIIList[0].locAge : "");
                  this.perRank = ((this.responseData.fitfestbeforeIIIList[0].perRank != null) ? this.responseData.fitfestbeforeIIIList[0].perRank : "");
                  this.objAge = ((this.responseData.fitfestbeforeIIIList[0].objAge != null) ? this.responseData.fitfestbeforeIIIList[0].objAge : "");
                  this.objDescription = ((this.responseData.fitfestbeforeIIIList[0].objDescription != null) ? this.responseData.fitfestbeforeIIIList[0].objDescription : "");
                  this.locDescription = ((this.responseData.fitfestbeforeIIIList[0].locDescription != null) ? this.responseData.fitfestbeforeIIIList[0].locDescription : "");
                  this.objperRank = ((this.responseData.fitfestbeforeIIIList[0].objperRank != null) ? this.responseData.fitfestbeforeIIIList[0].objperRank : "");
                  this.fitfestDate = ((this.responseData.fitfestbeforeIIIList[0].fitfestDate != null) ? this.responseData.fitfestbeforeIIIList[0].fitfestDate : "");
                  this.locperRank = ((this.responseData.fitfestbeforeIIIList[0].locperRank != null) ? this.responseData.fitfestbeforeIIIList[0].locperRank : "");
                  this.gmqDesc = ((this.responseData.fitfestbeforeIIIList[0].gmqDesc != null) ? this.responseData.fitfestbeforeIIIList[0].gmqDesc : "");
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
          if (res.className == "III" || res.className == "IV" || res.className == "V" || res.className == "VI" || res.className == "VII" || res.className == "VIII" || res.className == "IX" || res.className == "X" || res.className == "XI" || res.className == "XII") {
            this.beforeIII = false;
            let loader = this.loadingCtrl.create({
              spinner: 'ios',
              content: ''
            });
            loader.present();
            this.dataService.getStudentFitFestDetailsforIIItoXII(this.userDetails).then((result) => {
              loader.dismiss();
              this.responseData = result;
              console.log(this.responseData);
              if (this.responseData.returnStatus != 0) {
                if (this.responseData.fitfestList.length == 0 && this.responseData.preFitfestList.length == 0) {
                  console.log("if");
                  this.showAboutTest = true;
                  this.showTestResults = false;
                } else {
                  this.openModal('FitfestPopupPage');
                  this.fitfestList = this.responseData.fitfestList;
                  this.preFitfestList = this.responseData.preFitfestList;
                  this.fitfestListtesting = this.responseData.fitfestListtesting;
                  this.preFitfestListtesting = this.responseData.preFitfestListtesting;
                  console.log(this.fitfestList);
                  this.showAboutTest = false;
                  this.showTestResults = true;
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
        }
      });
  }

  goHome() {
    this.navCtrl.setRoot("UserDetailPage");
  }

  showAboutOrResult(pmFlag) {
    if (pmFlag == 1) {
      this.showAboutTest = false;
      this.showTestResults = true;
    } else {
      this.showAboutTest = true;
      this.showTestResults = false;
    }
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

  openModal(pageName) {
    let modal = this.modalCtrl.create(pageName, null, {
      cssClass: 'exercise-modal',
      enableBackdropDismiss: false
    });
    modal.present();
    modal.onDidDismiss(data => {
      if (data.slideAction == 'close') {
        console.log("Close");
      }
    });
  }

  showPreviousResult(pmFlag){
    if(pmFlag==1){
      this.showCurrentResult = false;
    } else {
      this.showCurrentResult = true;
    }
  }
}
