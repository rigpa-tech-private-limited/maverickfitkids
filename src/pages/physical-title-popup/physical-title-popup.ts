import { Component } from '@angular/core';
import { Platform, ModalController, IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AppConfig } from '../../config/config';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-physical-title-popup',
  templateUrl: 'physical-title-popup.html',
})
export class PhysicalTitlePopupPage {
  unregisterBackButtonAction: any;
  validations_form_select_type: FormGroup;
  validation_messages = {
    'tutorialCode': [
      { type: 'required', message: "Tutorial Code is required." }
    ]
  };
  tutorialData = {
    "tutorialCode": ""
  }
  userDetails: any;
  tutorials: any = [];
  responseData: any;
  constructor(public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public platform: Platform,
    public storage: Storage,
    public dataService: DataProvider,
    public viewCtrl: ViewController) {
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
          this.dataService.getPhysicalLiteracytitle(this.userDetails).then((result) => {
            loader.dismiss();
            this.responseData = result;
            console.log(this.responseData);
            if (this.responseData.returnStatus != 0) {
              this.tutorials = this.responseData.physicalLiteracyTitleList;
            } else if (this.responseData.returnStatus == 0) {
              console.log('returnStatus=>0');
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
        }
      });
  }

  ionViewWillLoad() {
    this.validations_form_select_type = this.formBuilder.group({
      tutorialCode: new FormControl('', Validators.required)
    });
  }

  getPhysicalLiteracydetails() {
    let loader = this.loadingCtrl.create({
      spinner: 'ios',
      content: ''
    });
    loader.present();
    this.dataService.getPhysicalLiteracydetails(this.userDetails, this.tutorialData.tutorialCode).then((result) => {

      this.responseData = result;
      console.log(this.responseData);
      if (this.responseData.returnStatus != 0) {
        this.closeModal();
        if (this.responseData.physicalLiteracyList) {
          loader.dismiss();
          this.navCtrl.setRoot("PhysicalLiteracyPage", { "physicalLiteracyList": this.responseData.physicalLiteracyList });
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
  }

  closeModal(): void {
    this.viewCtrl.dismiss({ slideAction: 'close' });
  }

  repeatSlide() {
    this.viewCtrl.dismiss({ slideAction: 'repeat' });
  }

  finishSlide() {
    this.viewCtrl.dismiss({ slideAction: 'finish' });
  }

  ionViewDidLoad() {
    this.initializeBackButtonCustomHandler();
  }

  ionViewWillLeave() {
    console.log('HomePage Leave-->');
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  initializeBackButtonCustomHandler(): void {
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
      console.log('Prevent Back Button Page Change-->');
      this.closeModal();
      this.navCtrl.setRoot("SettingsPage");
    });
  }
}
