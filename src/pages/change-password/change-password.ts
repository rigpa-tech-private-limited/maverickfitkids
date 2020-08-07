import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AppConfig } from '../../config/config';
import { DataProvider } from '../../providers/data/data';
import { PasswordValidator } from '../../validators/password.validator';
import { DatabaseProvider } from '../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
  unregisterBackButtonAction: any;
  imgPreview = 'assets/imgs/no_image.png';
  validations_form_user: FormGroup;
  matching_passwords_group: FormGroup;
  validation_messages = {
    'oldpassword': [
      { type: 'required', message: "Old password is required." }
    ],
    'newpassword': [
      { type: 'required', message: "New password is required." }
    ],
    'confirmpassword': [
      { type: 'required', message: "Confirm password is required." }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Password mismatch' }
    ]
  };
  passwordData = {
    "oldpassword": "",
    "newpassword": "",
    "confirmpassword": "",
  }
  userDetails: any;
  responseData: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public platform: Platform,
    public storage: Storage,
    public databaseprovider: DatabaseProvider,
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
    this.matching_passwords_group = new FormGroup({
      newpassword: new FormControl('', Validators.required),
      confirmpassword: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    this.validations_form_user = this.formBuilder.group({
      oldpassword: new FormControl('', Validators.required),
      matching_passwords: this.matching_passwords_group
    });
  }

  changePassword() {
    if (this.validations_form_user.valid) {
      if (this.passwordData.oldpassword != '') {
        console.log("UserForm==>" + this.validations_form_user.valid);
        let loader = this.loadingCtrl.create({
          spinner: 'ios',
          content: ''
        });
        loader.present();
        this.dataService.validateoldpasswordforstudent(this.userDetails, this.passwordData.oldpassword).then((result) => {
          this.responseData = result;
          loader.dismiss();
          console.log(this.responseData);
          if (this.responseData.returnStatus != 0) {
            console.log('success');

            if (this.passwordData.oldpassword != '' && this.passwordData.newpassword != '') {

              let loader1 = this.loadingCtrl.create({
                spinner: 'ios',
                content: ''
              });
              loader1.present();
              this.dataService.saveChangePassword(this.userDetails, this.passwordData.oldpassword, this.passwordData.newpassword).then((result) => {
                this.responseData = result;
                loader1.dismiss();
                console.log(this.responseData);
                const alert = this.alertCtrl.create({
                  message: this.responseData.returnMessage,
                  buttons: [{
                    text: 'Ok',
                    handler: () => {
                      if (this.responseData.returnStatus != 0) {
                        console.log('success');
                        this.databaseprovider.updateUserPassword(this.userDetails.studentId, this.passwordData.newpassword)
                          .then(data => {
                            console.log('User Password updated to local db.');
                            this.goHome();
                          }).catch(e => {
                            console.log(e);
                            const alert = this.alertCtrl.create({
                              message: "Password not updated",
                              buttons: [{
                                text: 'Ok',
                                handler: () => { }
                              }],
                              enableBackdropDismiss: false
                            });
                            alert.present();
                          });
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
                    }
                  }],
                  enableBackdropDismiss: false
                });
                alert.present();
              }, (err) => {
                console.log(err);
                loader1.dismiss();
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

  goHome() {
    this.navCtrl.setRoot("UserDetailPage");
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
}
