import { Component } from '@angular/core';
import { Platform, ModalController, IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../config/config';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-sports-select',
  templateUrl: 'sports-select.html',
})
export class SportsSelectPage {
  unregisterBackButtonAction: any;
  imgPreview = 'assets/imgs/no_image.png';
  responseData: any;
  sportsName1: any = '';
  sportsName2: any = '';
  sportsName3: any = '';
  sportsName4: any = '';
  sportsName5: any = '';
  sportsName6: any = '';
  sportsName7: any = '';
  sportsName8: any = '';
  sportsCode1: any = '';
  sportsCode2: any = '';
  sportsCode3: any = '';
  sportsCode4: any = '';
  sportsCode5: any = '';
  sportsCode6: any = '';
  sportsCode7: any = '';
  sportsCode8: any = '';
  sportsImg1: any = 'assets/imgs/circles/0_empty.png';
  sportsImg2: any = 'assets/imgs/circles/0_empty.png';
  sportsImg3: any = 'assets/imgs/circles/0_empty.png';
  sportsImg4: any = 'assets/imgs/circles/0_empty.png';
  sportsImg5: any = 'assets/imgs/circles/0_empty.png';
  sportsImg6: any = 'assets/imgs/circles/0_empty.png';
  sportsImg7: any = 'assets/imgs/circles/0_empty.png';
  sportsImg8: any = 'assets/imgs/circles/0_empty.png';
  sportsList: any;
  constructor(public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public platform: Platform,
    public dataService: DataProvider) {
    let loader = this.loadingCtrl.create({
      spinner: 'ios',
      content: ''
    });
    loader.present();
    this.dataService.getSportsList().then((result) => {
      loader.dismiss();
      this.responseData = result;
      console.log(this.responseData);
      if (this.responseData.returnStatus != 0) {
        if (this.responseData.sportsNameList) {
          this.sportsList = this.responseData.sportsNameList;
          if (this.responseData.sportsNameList[0]) {
            this.sportsName1 = this.responseData.sportsNameList[0].sportsName;
            this.sportsCode1 = this.responseData.sportsNameList[0].sportsCode;
            this.sportsImg1 = 'assets/imgs/sports/' + this.sportsName1 + '.png';
          }
          if (this.responseData.sportsNameList[1]) {
            this.sportsName2 = this.responseData.sportsNameList[1].sportsName;
            this.sportsCode2 = this.responseData.sportsNameList[1].sportsCode;
            this.sportsImg2 = 'assets/imgs/sports/' + this.sportsName2 + '.png';
          }
          if (this.responseData.sportsNameList[2]) {
            this.sportsName3 = this.responseData.sportsNameList[2].sportsName;
            this.sportsCode3 = this.responseData.sportsNameList[2].sportsCode;
            this.sportsImg3 = 'assets/imgs/sports/' + this.sportsName3 + '.png';
          }
          if (this.responseData.sportsNameList[3]) {
            this.sportsName4 = this.responseData.sportsNameList[3].sportsName;
            this.sportsCode4 = this.responseData.sportsNameList[3].sportsCode;
            this.sportsImg4 = 'assets/imgs/sports/' + this.sportsName4 + '.png';
          }
          if (this.responseData.sportsNameList[4]) {
            this.sportsName5 = this.responseData.sportsNameList[4].sportsName;
            this.sportsCode5 = this.responseData.sportsNameList[4].sportsCode;
            this.sportsImg5 = 'assets/imgs/sports/' + this.sportsName5 + '.png';
          }
          if (this.responseData.sportsNameList[5]) {
            this.sportsName6 = this.responseData.sportsNameList[5].sportsName;
            this.sportsCode6 = this.responseData.sportsNameList[5].sportsCode;
            this.sportsImg6 = 'assets/imgs/sports/' + this.sportsName6 + '.png';
          }

          this.sportsName7 = '<span class="highlight-text">Maverick</span> Stretches';
          this.sportsCode7 = '0007';
          this.sportsImg7 = 'assets/imgs/sports/Stretch.png';

          if (this.responseData.sportsNameList[6]) {
            this.sportsName8 = this.responseData.sportsNameList[6].sportsName;
            this.sportsCode8 = this.responseData.sportsNameList[6].sportsCode;
            this.sportsImg8 = 'assets/imgs/sports/' + this.sportsName8 + '.png';
          }
        }
      } else if (this.responseData.returnStatus == 0) {
        console.log('returnStatus=>0');
        const alert = this.alertCtrl.create({
          message: this.responseData.returnMessage,
          buttons: [{
            text: 'Ok',
            handler: () => {
              this.navCtrl.setRoot("MenuPage");
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
    console.log('ionicPage Leave-->');
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  initializeBackButtonCustomHandler(): void {
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
      console.log('Prevent Back Button Page Change-->');
      this.goHome();
    });
  }

  goHome() {
    this.navCtrl.setRoot("MenuPage");
  }

  sportsSelect(pmCode) {
    let pmSportsCode = '';
    let implementationCode = '';
    let sportsFitnessCode = '';
    if (pmCode == '7') {
      pmSportsCode = '0007';
      implementationCode = "1";
      sportsFitnessCode = "4";
      let loader = this.loadingCtrl.create({
        spinner: 'ios',
        content: ''
      });
      loader.present();
      this.dataService.getStudentSportsDetails(pmSportsCode, implementationCode, sportsFitnessCode).then((result) => {
        this.responseData = result;
        console.log(this.responseData);
        if (this.responseData.returnStatus != 0) {
          //this.closeModal();
          if (this.responseData.sportsList) {
            loader.dismiss();
            this.navCtrl.setRoot("SportsDisplayPage", { "sportsList": this.responseData.sportsList });
          }
        } else if (this.responseData.returnStatus == 0) {
          console.log('returnStatus=>0');
          loader.dismiss();
          const alert = this.alertCtrl.create({
            message: this.responseData.returnMessage,
            buttons: [{
              text: 'Ok',
              handler: () => {
                //this.navCtrl.pop();
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
    } else {
      pmSportsCode = this.sportsList[pmCode].sportsCode;
      this.openModal('SportsPopupPage', pmSportsCode);
    }
    console.log(pmSportsCode);

  }

  openModal(pageName, pmSportsCode) {
    let modal = this.modalCtrl.create(pageName, { "sportsCode": pmSportsCode }, {
      cssClass: 'exercise-modal',
      enableBackdropDismiss: true
    });
    modal.present();
  }

  goPage(pmPage) {
    this.navCtrl.setRoot(pmPage);
  }
}
