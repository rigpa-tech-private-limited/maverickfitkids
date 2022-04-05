import { Component } from '@angular/core';
import { Platform, ModalController, IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AppConfig } from '../../config/config';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-to-be-list',
  templateUrl: 'to-be-list.html',
})
export class ToBeListPage {
  unregisterBackButtonAction: any;
  toBeList: any = [];
  responseData: any;
  userDetails: any;
  imgPreview = 'assets/imgs/no_image.png';
  introContent: any;
  intendCode: any = '';
  alreadySubmit: boolean = false;

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
          let loader = this.loadingCtrl.create({
            spinner: 'ios',
            content: ''
          });
          loader.present();
          this.dataService.getToBeList(this.userDetails).then((result) => {
            loader.dismiss();
            this.responseData = result;
            console.log(this.responseData);
            if (this.responseData.returnStatus != 0) {
              this.toBeList = this.responseData.toBeList;
              this.introContent = this.responseData.introContent;
              setTimeout(() => {
                if (this.toBeList) {
                  if (this.platform.is('ios')) {
                    let cusid_ele = document.getElementsByClassName('radio');
                    for (let i = 0; i < cusid_ele.length; ++i) {
                      let item = cusid_ele[i];
                      item.setAttribute("class", "radio radio-md");
                    }
                  }
                }
              }, 1000);
            } else if (this.responseData.returnStatus == 0) {
              this.alreadySubmit = true;
              console.log('returnStatus=>0');
              const alert = this.alertCtrl.create({
                message: this.responseData.returnMessage,
                buttons: [{
                  text: 'Ok',
                  handler: () => {
                    if (this.responseData.toBeList) {
                      this.toBeList = this.responseData.toBeList;
                      this.introContent = this.responseData.introContent;
                      if (this.toBeList) {
                        setTimeout(() => {
                          if (this.toBeList) {
                            if (this.platform.is('ios')) {
                              let cusid_ele = document.getElementsByClassName('radio');
                              for (let i = 0; i < cusid_ele.length; ++i) {
                                let item = cusid_ele[i];
                                item.setAttribute("class", "radio radio-md");
                              }
                            }
                          }
                        }, 1000);
                      }
                    } else {
                      this.goHome();
                    }
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
      });
  }

  fistupToBeIntend() {
    if (this.intendCode != '') {
      let loader = this.loadingCtrl.create({
        spinner: 'ios',
        content: ''
      });
      loader.present();
      this.dataService.saveStudentToBeList(this.userDetails, this.intendCode).then((result) => {
        this.responseData = result;
        loader.dismiss();
        console.log(this.responseData);
        if (this.responseData.returnStatus != 0) {
          console.log('success');
          this.openModal('ToBeFistupPage', '');
        } else {
          console.log('returnStatus=>0');
          const alert = this.alertCtrl.create({
            message: this.responseData.returnMessage,
            buttons: [{
              text: 'Ok',
              handler: () => {
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

  goHome() {
    this.navCtrl.setRoot("MenuPage");
  }

  selectIntend(index, intendCode) {
    console.log(index, intendCode);
    this.openModal('ToBeQuotePage', intendCode);
  }

  openModal(pageName, intendCode) {
    let modal = this.modalCtrl.create(pageName, ((pageName == 'ToBeQuotePage') ? { "intendCode": intendCode } : null), {
      cssClass: 'exercise-modal',
      enableBackdropDismiss: true
    });
    modal.present();
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
    setTimeout(() => {
      if (this.toBeList) {
        let cusid_ele = document.getElementsByClassName('radio');
        for (let i = 0; i < cusid_ele.length; ++i) {
          let item = cusid_ele[i];
          item.setAttribute("class", "radio radio-md");
        }
      }
    }, 1000);
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
}
