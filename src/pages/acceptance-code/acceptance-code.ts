import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AppConfig } from '../../config/config';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-acceptance-code',
  templateUrl: 'acceptance-code.html',
})
export class AcceptanceCodePage {
  unregisterBackButtonAction: any;
  responseData: any;
  userDetails: any;
  starList: any;
  fromPage: any;
  showReuslt: boolean = false;
  imgPreview = 'assets/imgs/no_image.png';
  validations_form_acceptance_code: FormGroup;
  validation_messages_acceptance_code = {
    'acceptance_code': [
      { type: 'required', message: 'Acceptance code is required.' }
    ]
  };
  acceptance_code: any;
  constructor(public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public storage: Storage,
    public platform: Platform,
    public dataService: DataProvider) {

    if (this.navParams.get('fromPage')) {
      this.fromPage = this.navParams.get('fromPage');
    }

    if (this.navParams.get('starList')) {
      this.starList = this.navParams.get('starList');
    }
    this.storage.get('userDetails')
      .then((res: any) => {
        if (res) {
          this.userDetails = res;
          console.log(this.userDetails);
        }
      });
  }

  validateTodayAcceptanceCode() {
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
          this.dataService.validateTodayAcceptanceCode(this.userDetails, this.acceptance_code).then((result) => {
            loader.dismiss();
            this.responseData = result;
            console.log(this.responseData);
            if (this.responseData.returnStatus != 0) {
              this.navCtrl.setRoot("StarRatingPage", { "starList": this.starList });
            } else if (this.responseData.returnStatus == 0) {
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
      });
  }

  ionViewWillLoad() {
    this.validations_form_acceptance_code = this.formBuilder.group({
      acceptance_code: new FormControl('', Validators.required)
    });
  }

  goHome() {
    this.navCtrl.setRoot("MenuPage");
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
  
  goPage(pmPage) {
    this.navCtrl.setRoot(pmPage);
  }
}
