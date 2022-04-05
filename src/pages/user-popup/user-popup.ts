import { Component } from '@angular/core';
import { Platform, ModalController, IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DataProvider } from '../../providers/data/data';
import { DatabaseProvider } from '../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-user-popup',
  templateUrl: 'user-popup.html',
})
export class UserPopupPage {
  unregisterBackButtonAction: any;
  validations_form_user: FormGroup;
  validation_messages = {
    'username': [
      { type: 'required', message: "Username is required." }
    ],
    'password': [
      { type: 'required', message: "Password is required." }
    ]
  };
  loginData = {
    "username": "",
    "password": "",
  }
  userDetails: any;
  responseData: any;
  userId: any;
  statusValue: any;
  userData: any;
  userloginData = { "existing_student_name": "", "existing_student_mfk_id": "", "new_student_name": "", "school_access_code": "" };
  constructor(public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public platform: Platform,
    public storage: Storage,
    public dataService: DataProvider,
    public databaseprovider: DatabaseProvider,
    public viewCtrl: ViewController) {
    if (this.navParams.get('userId')) {
      this.userId = this.navParams.get('userId');
      console.log(this.userId);
    }
    if (this.navParams.get('statusValue')) {
      this.statusValue = this.navParams.get('statusValue');
      console.log(this.statusValue);
    }

  }
  ionViewWillLoad() {
    this.validations_form_user = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  async checkUserDetails() {
    if (this.loginData.username != '' && this.loginData.password != '') {
      this.userloginData.existing_student_name = this.loginData.username;
      this.userloginData.existing_student_mfk_id = this.loginData.password;
      this.userloginData.new_student_name = null;
      this.userloginData.school_access_code = null;
      let loader = this.loadingCtrl.create({
        spinner: 'ios',
        content: ''
      });
      loader.present();
      this.dataService.studentLogin(this.userloginData).then(async (result) => {
        this.responseData = result;
        loader.dismiss();
        console.log(this.responseData);
        if (this.responseData.returnStatus != 0) {
          console.log('Register success');
          this.databaseprovider.updateUserPassword(this.userId, this.loginData.password)
            .then(data => {
              console.log('User Password updated to local db.');
              this.databaseprovider.updateUserStatus(this.userId, this.statusValue)
                .then(data => {
                  console.log('User status updated to local db.');
                  if (this.statusValue == '2') {
                    this.databaseprovider.updateUserLockStatus(this.userId, '0')
                      .then(data => {
                        console.log('User status updated to local db.');
                        this.navCtrl.setRoot("UsersPage");
                      }).catch(e => {
                        console.log(e);
                      });
                  } else {
                    this.navCtrl.setRoot("UsersPage");
                  }
                }).catch(e => {
                  console.log(e);
                });
            }).catch(e => {
              console.log(e);
            });
        } else {
          console.log('Register fail');
          const alert = this.alertCtrl.create({
            message: "Wrong Username or Password",
            buttons: [{
              text: 'Ok',
              handler: () => { }
            }]
          });
          alert.present();
        }
      }, (err) => {
        console.log(err);
        loader.dismiss();
        const alert = this.alertCtrl.create({
          message: "Wrong Username or Password",
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

  closeModal(): void {
    this.viewCtrl.dismiss({ slideAction: 'close' });
    this.navCtrl.setRoot("UsersPage");
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
      this.navCtrl.setRoot("UsersPage");
    });
  }
}
