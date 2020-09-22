import { Component } from '@angular/core';
import { Platform, NavController, NavParams, IonicPage, AlertController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Keyboard } from '@ionic-native/keyboard';
import { DataProvider } from '../../providers/data/data';
import { AppConfig } from '../../config/config';
import * as moment from "moment";
declare var window: any;

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  maxDate: any = new Date(new Date().setFullYear(new Date().getFullYear() - 3)).toISOString();
  isFormSubmitted: boolean = false;
  showFooter: boolean = true;
  unregisterBackButtonAction: any;
  validations_form_signup: FormGroup;
  responseData: any;
  signupData = { "student_name": "", "email": "", "mobile": "", "dob": "", "gender": "", "classname": "" };
  validation_messages_signup = {
    'student_name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'email': [
      { type: 'required', message: 'Email Address is required.' }
    ],
    'mobile': [
      { type: 'required', message: 'Mobile Number is required.' }
    ]
  };
  enable_btn: boolean = false;
  showInnerBtn: boolean = false;
  classResponseData: any;
  classes: any = AppConfig.CLASSES;
  constructor(public keyboard: Keyboard,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public platform: Platform,
    public dataService: DataProvider) { 
      this.dataService.getClass().then((result) => {
        console.log(result);
        this.classResponseData = result;
        if (this.classResponseData.returnStatus != 0) {
          this.classes = this.classResponseData.classList;
        }
      }, (err) => {
        console.log(err);
      });
    }

  ionViewWillLoad() {
    this.validations_form_signup = this.formBuilder.group({
      student_name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
      dob: new FormControl(''),
      gender: new FormControl(''),
      classname: new FormControl('')
    });
  }

  selectRadioBox(pmVar, optionVal) {
    console.log(pmVar, optionVal);
    this.signupData.gender = optionVal;
    setTimeout(() => {
      let radioIcon = document.getElementsByClassName('radio-icon');
      for (let i = 0; i < radioIcon.length; ++i) {
        let item = radioIcon[i];
        item.setAttribute("style", "border-color: #828282 !important;background-color: #fff !important;");
      }
      let radioBox = document.getElementsByClassName('radio-checked');
      for (let i = 0; i < radioBox.length; ++i) {
        let item = radioBox[i];
        item.setAttribute("style", "border-color: #031337 !important;background-color: #FFF !important;");
      }
      let radioInner = document.querySelectorAll('.radio-checked .radio-inner');
      for (let i = 0; i < radioInner.length; ++i) {
        let item = radioInner[i];
        item.setAttribute("style", "background-color: #031337 !important;");
      }
    }, 200);
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
      console.log('Prevent Back Button Page Change-->');
    });
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async signUp() {
    if (!this.isFormSubmitted) {
      if (this.signupData.student_name != '' && this.signupData.email != '' && this.signupData.mobile != '' && this.signupData.dob != '' && this.signupData.gender != '' && this.signupData.classname != '') {
        this.isFormSubmitted = true;
        this.signupData.dob = moment(this.signupData.dob).format('DD-MMM-YYYY');
        console.log("Signup Form Valid ==> " + this.validations_form_signup.valid);
        let loader = this.loadingCtrl.create({
          spinner: 'ios',
          content: ''
        });
        loader.present();
        this.dataService.studentSignup(this.signupData).then((result) => {
          this.responseData = result;
          loader.dismiss();
          console.log(this.responseData);
          this.isFormSubmitted = false;
          if (this.responseData.returnStatus != 0) {
            console.log('Register success');
          } else {
            console.log('Register fail');
          }
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
        }, (err) => {
          this.isFormSubmitted = false;
          console.log(err);
          loader.dismiss();
          const alert = this.alertCtrl.create({
            message: AppConfig.API_ERROR,
            buttons: [{
              text: 'Ok',
              handler: () => { }
            }],
            enableBackdropDismiss: false
          });
          alert.present();
        });
      } else {
        this.isFormSubmitted = false;
        const alert = this.alertCtrl.create({
          message: "Please fill all fields",
          buttons: [{
            text: 'Ok',
            handler: () => { }
          }],
          enableBackdropDismiss: false
        });
        alert.present();
      }
    }
  }

  goHome() {
    console.log("goHome");
    this.navCtrl.setRoot("RegisterPage");
  }
}
