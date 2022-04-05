import { Component } from '@angular/core';
import { Platform, NavController, NavParams, IonicPage, AlertController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Keyboard } from '@ionic-native/keyboard';
import { DataProvider } from '../../providers/data/data';
import { AppConfig } from '../../config/config';
import { Storage } from '@ionic/storage';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { DatabaseProvider } from '../../providers/database/database';

declare var window: any;

@IonicPage()
@Component({
  selector: 'page-add-user-register',
  templateUrl: 'add-user-register.html',
})
export class AddUserRegisterPage {
  isFormSubmitted: boolean = false;
  showFooter: boolean = true;
  unregisterBackButtonAction: any;
  showedAlert: boolean;
  confirmAlert: any;
  validations_form_existing_user: FormGroup;
  responseData: any;
  loginData = { "existing_student_name": "", "existing_student_mfk_id": "", "new_student_name": "", "school_access_code": "" };
  validation_messages_existing_user = {
    'existing_student_name': [
      { type: 'required', message: 'Student name is required.' }
    ],
    'existing_student_mfk_id': [
      { type: 'required', message: 'MFK code is required.' }
    ]
  };
  validations_form_new_user: FormGroup;
  validation_messages_new_user = {
    'new_student_name': [
      { type: 'required', message: 'Student name is required.' }
    ],
    'school_access_code': [
      { type: 'required', message: 'School access code is required.' }
    ]
  };
  enable_btn: boolean = false;
  showInnerBtn: boolean = false;
  currentStudentName: any;
  usersList: any;
  userList: any;
  responseData1: any;
  constructor(public keyboard: Keyboard,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public platform: Platform,
    public dataService: DataProvider,
    public databaseprovider: DatabaseProvider,
    public androidPermissions: AndroidPermissions,
    public storage: Storage) {
    this.databaseprovider.getDatabaseState();
    if (this.navParams.get('currentStudentName')) {
      this.currentStudentName = this.navParams.get('currentStudentName');
      console.log(this.currentStudentName);
    }
    if (this.navParams.get('usersList')) {
      this.usersList = this.navParams.get('usersList');
      console.log(this.usersList);
    }
  }

  ionViewWillLoad() {
    this.validations_form_existing_user = this.formBuilder.group({
      existing_student_name: new FormControl('', Validators.required),
      existing_student_mfk_id: new FormControl('', Validators.required)
    });

    this.validations_form_new_user = this.formBuilder.group({
      new_student_name: new FormControl('', Validators.required),
      school_access_code: new FormControl('', Validators.required)
    });
  }

  ionViewDidLoad() {
    console.log('Header=>' + document.getElementById('header-container').offsetHeight + 'px' + 'Footer=>' + document.getElementById('footer-container').offsetHeight + 'px');

    let self = this;
    let headerHeight = document.getElementById('header-container').offsetHeight;
    let footerHeight = document.getElementById('footer-container').offsetHeight;
    //document.getElementsByClassName("user-register-page")[0].setAttribute("style", "padding-bottom: " + footerHeight + "px");

    window.addEventListener('keyboardWillShow', (event) => {
      // Describe your logic which will be run each time when keyboard is about to be shown.
      console.log(event.keyboardHeight);
      console.log("keyboardWillShow");
      console.log('Header2=>' + headerHeight + 'px' + 'Footer=>' + footerHeight + 'px');
      self.showFooter = false;
      self.showInnerBtn = true;
      console.log(self.showInnerBtn);
      document.getElementsByClassName("scroll-content")[0].removeAttribute("style");
      document.getElementsByClassName("scroll-content")[0].setAttribute("style", "margin-top:0px; margin-bottom: 0px; padding-bottom: " + footerHeight + "px;");
    });
    window.addEventListener('keyboardWillHide', () => {
      // Describe your logic which will be run each time when keyboard is about to be closed.
      console.log("keyboardWillHide");
      console.log('Header2=>' + headerHeight + 'px' + 'Footer=>' + footerHeight + 'px');
      self.showFooter = true;
      self.showInnerBtn = false;
      console.log(self.showInnerBtn);
      document.getElementsByClassName("scroll-content")[0].removeAttribute("style");
      document.getElementsByClassName("scroll-content")[0].setAttribute("style", "margin-top: " + headerHeight + "px; margin-bottom: " + footerHeight + "px;");
    });
    this.initializeBackButtonCustomHandler();
  }

  ionViewWillLeave() {
    console.log('HomePage Leave-->');
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  initializeBackButtonCustomHandler(): void {
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
      this.goHome();
    });
  }

  onKeyupExistingUser() {
    console.log("ExistingUser==>" + this.validations_form_existing_user.valid);
    if (this.validations_form_existing_user.valid) {
      this.enable_btn = true;
    } else {
      this.enable_btn = false;
    }
    this.loginData.new_student_name = null;
    this.loginData.school_access_code = null;
    this.validations_form_new_user.reset({ new_student_name: this.loginData.new_student_name, school_access_code: this.loginData.school_access_code });
  }

  onKeyupNewUser() {
    console.log("NewUser==>" + this.validations_form_new_user.valid);
    if (this.validations_form_new_user.valid) {
      this.enable_btn = true;
    } else {
      this.enable_btn = false;
    }
    this.loginData.existing_student_name = null;
    this.loginData.existing_student_mfk_id = null;
    this.validations_form_existing_user.reset({ existing_student_name: this.loginData.existing_student_name, existing_student_mfk_id: this.loginData.existing_student_mfk_id });
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  signIn() {
    if (!this.isFormSubmitted) {
      this.isFormSubmitted = true;
      if (this.loginData.existing_student_name != '' && this.loginData.existing_student_mfk_id != '') {
        if (this.loginData.existing_student_name != this.currentStudentName) {
          var listStudentname = this.loginData.existing_student_name;
          var isPresent = this.usersList.some(function(el) { return el.studentName === listStudentname });
          console.log(this.loginData.existing_student_name, listStudentname, isPresent);
          if (!isPresent) {
            console.log("ExistingUser==>" + this.validations_form_existing_user.valid);
            let loader = this.loadingCtrl.create({
              spinner: 'ios',
              content: ''
            });
            loader.present();
            this.dataService.studentLogin(this.loginData).then((result) => {
              this.responseData = result;
              loader.dismiss();
              console.log(this.responseData);
              this.isFormSubmitted = false;
              if (this.responseData.returnStatus != 0) {
                this.responseData.password = this.loginData.existing_student_mfk_id;
                console.log('Register success');
                // this.storage.set('loggedInUser', "yes");
                // this.storage.set('userDetails', this.responseData);
                this.dataService.getStudentStar(this.responseData).then(async (result) => {
                  this.responseData1 = result;
                  console.log(this.responseData1);
                  if (this.responseData1.returnStatus != 0) {
                    this.responseData.starCount = this.responseData1.starCount;
                  } else {
                    this.responseData.starCount = "0";
                  }
                  this.userList = await this.databaseprovider.selectUserById(this.responseData.studentId).then(res => res);
                  if (this.userList.length == 0) {
                    this.databaseprovider.addUser(this.responseData)
                      .then(data => {
                        console.log('Users added to local db.');
                        this.databaseprovider.updateOtherUserLockStatus(this.responseData.studentId)
                          .then(data => {
                            console.log('User status updated to local db.');
                          }).catch(e => {
                            console.log(e);
                          });
                      }).catch(e => {
                        console.log(e);
                      });
                  } else {
                    this.databaseprovider.updateUser(this.responseData)
                      .then(data => {
                        console.log('Users updated to local db.');
                        this.databaseprovider.updateOtherUserLockStatus(this.responseData.studentId)
                          .then(data => {
                            console.log('User status updated to local db.');
                          }).catch(e => {
                            console.log(e);
                          });
                      }).catch(e => {
                        console.log(e);
                      });
                  }
                  this.navCtrl.push("AddUserConfirmPage", { "userType": "old", "responseData": this.responseData });
                });
              } else {
                console.log('Register fail');
                const alert = this.alertCtrl.create({
                  message: AppConfig.ERROR_MESSAGES.register,
                  buttons: [{
                    text: 'Ok',
                    handler: () => {
                      this.loginData.new_student_name = null;
                      this.loginData.school_access_code = null;
                      this.validations_form_new_user.reset({ new_student_name: this.loginData.new_student_name, school_access_code: this.loginData.school_access_code });
                      this.loginData.existing_student_name = null;
                      this.loginData.existing_student_mfk_id = null;
                      this.validations_form_existing_user.reset({ existing_student_name: this.loginData.existing_student_name, existing_student_mfk_id: this.loginData.existing_student_mfk_id });
                    }
                  }]
                });
                alert.present();
              }
            }, (err) => {
              this.isFormSubmitted = false;
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
            const alert = this.alertCtrl.create({
              message: "This user is already added",
              buttons: [{
                text: 'Ok',
                handler: () => {
                  this.navCtrl.setRoot("UsersPage");
                }
              }]
            });
            alert.present();
          }
        } else {
          const alert = this.alertCtrl.create({
            message: "Same user not allowed",
            buttons: [{
              text: 'Ok',
              handler: () => {
                this.navCtrl.setRoot("UsersPage");
              }
            }]
          });
          alert.present();
        }
      }
    }

    /*if (this.validations_form_new_user.valid) {
      if (this.loginData.new_student_name != '' && this.loginData.school_access_code != '') {
        console.log("NewUser==>" + this.validations_form_new_user.valid);
        let loader = this.loadingCtrl.create({
          spinner: 'ios',
          content: ''
        });
        loader.present();
        this.dataService.validatePromotionCode(this.loginData).then((result) => {
          this.responseData = result;
          loader.dismiss();
          console.log(this.responseData);
          if (this.responseData.returnStatus != 0) {
            this.responseData.studentName = this.loginData.new_student_name;
            this.responseData.promotecode = this.loginData.school_access_code;
            console.log('Register success');
            console.log(this.responseData);
            //this.storage.set('loggedInUser', "yes");
            this.navCtrl.push("AddUserConfirmPage", { "userType": "new", "responseData": this.responseData });
          } else {
            console.log('Register fail');
            const alert = this.alertCtrl.create({
              message: AppConfig.ERROR_MESSAGES.register,
              buttons: [{
                text: 'Ok',
                handler: () => {
                  this.loginData.new_student_name = null;
                  this.loginData.school_access_code = null;
                  this.validations_form_new_user.reset({ new_student_name: this.loginData.new_student_name, school_access_code: this.loginData.school_access_code });
                  this.loginData.existing_student_name = null;
                  this.loginData.existing_student_mfk_id = null;
                  this.validations_form_existing_user.reset({ existing_student_name: this.loginData.existing_student_name, existing_student_mfk_id: this.loginData.existing_student_mfk_id });
                }
              }]
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
    }*/

  }

  goRegisterPage() {
    console.log("goRegisterPage");
    this.navCtrl.setRoot("AddUserSignupPage");
  }

  goHome() {
    console.log("goHome");
    this.navCtrl.setRoot("UsersPage");
  }
  openExternalLink(pmLink, fromPage) {
    if (this.platform.is('ios')) {
    this.navCtrl.setRoot('ParentGatePage', { "externalLink": pmLink, "fromPage": fromPage });
    } else {
      window.open(pmLink, '_system', 'location=yes');
      return false;
    }
  }
}
