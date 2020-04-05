import { Component } from '@angular/core';
import { Platform, ModalController, IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AppConfig } from '../../config/config';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-fitzone-add-popup',
  templateUrl: 'fitzone-add-popup.html',
})
export class FitzoneAddPopupPage {
  unregisterBackButtonAction: any;
  validations_form_user: FormGroup;
  validation_messages = {
    'mfkID': [
      { type: 'required', message: "Friend's MFK ID is required." }
    ]
  };
  mfkID: any;
  userDetails: any;
  responseData: any;
  imgPreview = 'assets/imgs/no_image.png';
  MFKverified: boolean = false;
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
        }
      });
  }

  ionViewWillLoad() {
    this.validations_form_user = this.formBuilder.group({
      mfkID: new FormControl('', Validators.required),
    });
  }

  verifyMFKID() {
    if (this.validations_form_user.valid) {
      if (this.mfkID != '') {
        console.log("UserForm==>" + this.validations_form_user.valid);
        let loader = this.loadingCtrl.create({
          spinner: 'ios',
          content: ''
        });
        loader.present();
        this.dataService.verifyStudentFriendRequest(this.userDetails, this.mfkID).then((result) => {
          this.responseData = result;
          loader.dismiss();
          console.log(this.responseData);
          if (this.responseData.returnStatus != 0) {
            console.log('success');
            this.MFKverified = true;
            this.imgPreview = AppConfig.SITE_URL + 'maverick/StudentImages/' + this.responseData.friendStudentImage;
          } else {
            console.log('returnStatus=>0');
            const alert = this.alertCtrl.create({
              message: this.responseData.returnMessage,
              buttons: [{
                text: 'Ok',
                handler: () => { }
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
  }

  SendRequest() {
    if (this.mfkID != '') {
      console.log("UserForm==>" + this.validations_form_user.valid);
      let loader = this.loadingCtrl.create({
        spinner: 'ios',
        content: ''
      });
      loader.present();
      this.dataService.sendFriendRequest(this.userDetails, this.mfkID).then((result) => {
        this.responseData = result;
        loader.dismiss();
        console.log(this.responseData);
        const alert = this.alertCtrl.create({
          message: this.responseData.returnMessage,
          buttons: [{
            text: 'Ok',
            handler: () => {
              if (this.responseData.returnStatus != 0) {
                console.log('success');
                this.closeModal();
                this.navCtrl.setRoot("FitZonePage");
              } else {
                console.log('returnStatus=>0');
              }
            }
          }],
          enableBackdropDismiss: false
        });
        alert.present();

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
    });
  }
}
