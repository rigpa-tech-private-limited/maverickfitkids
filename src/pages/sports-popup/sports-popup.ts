import { Component } from '@angular/core';
import { Platform, ModalController, IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AppConfig } from '../../config/config';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-sports-popup',
  templateUrl: 'sports-popup.html',
})
export class SportsPopupPage {
  unregisterBackButtonAction: any;
  validations_form_select_type: FormGroup;
  validation_messages = {
    'implementation': [
      { type: 'required', message: "Implementation Type is required." }
    ], 'fitness': [
      { type: 'required', message: "Fitness Level is required." }
    ]
  };
  sportsData = {
    "sportsCode": "",
    "fitness": "",
    "implementation": "",
  }
  userDetails: any;
  sportsFitness: any = [];
  implementations: any = [];
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

    if (this.navParams.get('sportsCode')) {
      this.sportsData.sportsCode = this.navParams.get('sportsCode');
    }
    let loader = this.loadingCtrl.create({
      spinner: 'ios',
      content: ''
    });
    loader.present();
    this.dataService.getSportsImplementationType().then((result) => {
      this.responseData = result;
      console.log(this.responseData);
      if (this.responseData.returnStatus != 0) {
        this.implementations = this.responseData.implementationList;

        this.dataService.getSportsFitnessLevel().then((result) => {
          loader.dismiss();
          this.responseData = result;
          console.log(this.responseData);
          if (this.responseData.returnStatus != 0) {
            this.sportsFitness = this.responseData.sportsFitnessList;
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
  ionViewWillLoad() {
    this.validations_form_select_type = this.formBuilder.group({
      fitness: new FormControl('', Validators.required),
      implementation: new FormControl('', Validators.required),
    });
  }

  getSportsDetails() {
    let loader = this.loadingCtrl.create({
      spinner: 'ios',
      content: ''
    });
    loader.present();
    this.dataService.getStudentSportsDetails(this.sportsData.sportsCode, this.sportsData.fitness, this.sportsData.implementation).then((result) => {
      this.responseData = result;
      console.log(this.responseData);
      if (this.responseData.returnStatus != 0) {
        this.closeModal();
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
      this.navCtrl.setRoot("SportsSelectPage");
    });
  }
}
