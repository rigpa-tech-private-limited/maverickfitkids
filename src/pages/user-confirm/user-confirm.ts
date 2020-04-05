import { Component } from '@angular/core';
import { Platform, NavController, IonicPage, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Keyboard } from '@ionic-native/keyboard';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../config/config';
import { DataProvider } from '../../providers/data/data';
import { DatePipe } from '@angular/common';
import { DatabaseProvider } from '../../providers/database/database';
import { FileChooser } from '@ionic-native/file-chooser';
import { File, FileEntry, IFile } from "@ionic-native/file";
import { FilePath } from "@ionic-native/file-path";
declare var window: any;
import { DomSanitizer } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-user-confirm',
  templateUrl: 'user-confirm.html',
})
export class UserConfirmPage {

  unregisterBackButtonAction: any;
  showedAlert: boolean;
  confirmAlert: any;
  validExistingUserForm: boolean = false;
  validNewUserForm: boolean = false;
  showFooter: boolean = true;
  enable_btn: boolean = false;
  error_email: boolean = false;
  error_phone: boolean = false;
  mail_shown_status: boolean = false;
  phone_shown_status: boolean = false;
  new_user_confirm_form: boolean = true;
  new_user_confirm_form_proceed: boolean = false;
  existing_user_confirm_form: boolean = false;
  regData = { avatar: '', email: '', password: '', fullname: '' };
  imgPreview: any = 'assets/imgs/no_image.png';
  user_type: any;
  responseData: any;
  resData: any;
  classResponseData: any;
  emailResponseData: any;
  phoneResponseData: any;
  classes: any = AppConfig.CLASSES;
  student_class: any;
  validations_form_new_user_confirm: FormGroup;
  validation_messages_new_user_confirm = {
    'parentname': [
      { type: 'required', message: "Parent's name is required." }
    ],
    'parentemail': [
      { type: 'required', message: "Parent's email is required." },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'parentmobile': [
      { type: 'required', message: "Parent's mobile number is required." },
      { type: 'pattern', message: 'Enter a valid mobile number.' },
      { type: 'minlength', message: "Parent's mobile number must be 10 characters long." }
    ],
    'dob': [
      { type: 'required', message: "DOB is required." }
    ],
    'classcode': [
      { type: 'required', message: "Class is required." }
    ],
    'gender': [
      { type: 'required', message: "Gender is required." }
    ],
    'section': [
      { type: 'required', message: "Section is required." }
    ],
  };
  loginData = {
    "promotecode": "",
    "studentname": "",
    "school": { "name": "", "code": "" },
    "class": { "className": "", "classCode": "" },
    "dob": "",
    "gender": "M",
    "optionType": "1",
    "parentname": "",
    "parentemail": "",
    "parentmobile": "",
    "section": "",
    "image": "",
    "imagepath": "student_image",
    "ext": "jpeg"
  };
  date: any = new Date().toISOString();
  currentYear: any;
  minYear: any;
  storedIds: any;
  updatedIds: any;
  studentImgs: any;
  studentId: any;
  arrStudentImgs: any = [];
  userList: any;
  constructor(public keyboard: Keyboard, private camera: Camera,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public dataService: DataProvider,
    public databaseprovider: DatabaseProvider,
    public formBuilder: FormBuilder,
    private imagePicker: ImagePicker,
    private base64: Base64,
    public storage: Storage,
    public platform: Platform,
    private sanitizer: DomSanitizer,
    private fileChooser: FileChooser,
    public datepipe: DatePipe, private filePath: FilePath, private file: File) {
    this.user_type = this.navParams.get('userType');
    this.responseData = this.navParams.get('responseData');
    console.log('responseData', this.responseData);
    if (this.responseData != null) {
      this.loginData.promotecode = this.responseData.promotecode;
      this.loginData.studentname = this.responseData.studentName;
      this.loginData.school.name = this.responseData.registeredSchoolName;
      this.loginData.school.code = this.responseData.registeredSchoolCode;
    }
    if (this.user_type == "new") {
      this.new_user_confirm_form = true;
      this.new_user_confirm_form_proceed = false;
      this.existing_user_confirm_form = false;
    } else {
      this.new_user_confirm_form = false;
      this.new_user_confirm_form_proceed = false;
      this.existing_user_confirm_form = true;
    }
    let loader = this.loadingCtrl.create({
      spinner: 'ios',
      content: ''
    });
    loader.present();
    this.dataService.getClass().then((result) => {
      console.log(result);
      loader.dismiss();
      this.classResponseData = result;
      if (this.classResponseData.returnStatus != 0) {
        this.classes = this.classResponseData.classList;
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
    this.validations_form_new_user_confirm = this.formBuilder.group({
      parentname: new FormControl('', Validators.required),
      parentemail: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('([a-zA-Z0-9\_\.\-]+)\@([a-zA-Z0-9\_\.\-]+)([\.])([a-zA-Z]+)')
      ])),
      parentmobile: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('^[0-9]+$'),
      ])),
      class: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      section: new FormControl('', Validators.required)
    });
    this.currentYear = (new Date()).getFullYear();
    this.minYear = (this.currentYear - 30);
    console.log(this.currentYear, this.minYear);
    let d = new Date();
    let pastYear = d.getFullYear() - 3;
    let maxDate = d.setFullYear(pastYear);
    let maxDateFormat = this.datepipe.transform(maxDate, 'yyyy-MM-dd');
    this.currentYear = maxDateFormat;
  }

  ionViewDidLoad() {
    console.log('Header=>' + document.getElementById('header-container').offsetHeight + 'px' + 'Footer=>' + document.getElementById('footer-container').offsetHeight + 'px');
    let self = this;
    let headerHeight = document.getElementById('header-container').offsetHeight;
    let footerHeight = document.getElementById('footer-container').offsetHeight;
    //document.getElementsByClassName("user-confirm-page")[0].setAttribute("style", "padding-bottom: " + footerHeight + "px");
    window.addEventListener('keyboardWillShow', (event) => {
      // Describe your logic which will be run each time when keyboard is about to be shown.
      console.log(event.keyboardHeight);
      console.log("keyboardWillShow");
      self.showFooter = false;
      document.getElementsByClassName("scroll-content")[0].removeAttribute("style");
      document.getElementsByClassName("scroll-content")[0].setAttribute("style", "margin-top:0px; margin-bottom: 0px; padding-bottom: " + footerHeight + "px;");
    });
    window.addEventListener('keyboardWillHide', () => {
      // Describe your logic which will be run each time when keyboard is about to be closed.
      console.log("keyboardWillHide");
      self.showFooter = true;
      document.getElementsByClassName("scroll-content")[0].removeAttribute("style");
      document.getElementsByClassName("scroll-content")[0].setAttribute("style", "margin-top: " + headerHeight + "px; margin-bottom: " + footerHeight + "px;");
    });
    //document.getElementsByClassName("radio-ios")[0].removeAttribute("class");
    let cusid_ele = document.getElementsByClassName('radio');
    for (let i = 0; i < cusid_ele.length; ++i) {
      let item = cusid_ele[i];
      item.setAttribute("class", "radio radio-md");
    }
    this.checkuserImg();
    this.initializeBackButtonCustomHandler();
  }

  ionViewWillLeave() {
    console.log('HomePage Leave-->');
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  async checkuserImg() {
    this.userList = await this.databaseprovider.selectUserById(this.responseData.studentId).then(res => res);
    console.log(this.userList)
    if (this.userList.length > 0) {
      if (this.userList[0].studentImage != "") {
        this.storage.set('imgPreview', this.userList[0].studentImage);
        this.imgPreview = this.userList[0].studentImage;
      }
    } else {
      let studentImage = 'assets/imgs/no_image.png';
      if (this.responseData.studentImage) {
        studentImage = this.responseData.studentImage;
      }
      this.storage.set('imgPreview', studentImage);
      this.databaseprovider.updateUserImage(this.responseData.studentId, studentImage)
        .then(data => {
          console.log('User status updated to local db.');
        }).catch(e => {
          console.log(e);
        });
    }
  }

  initializeBackButtonCustomHandler(): void {
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
      console.log('Prevent Back Button Page Change-->');
      if (!this.showedAlert) {
        this.showedAlert = true;
        this.confirmAlert = this.alertCtrl.create({
          title: 'Log off',
          message: 'Do you want to log off?',
          buttons: [{
            text: 'No',
            role: 'cancel',
            handler: () => {
              console.log('Application exit prevented!');
            }
          }, {
            text: 'Yes',
            handler: () => {
              this.storage.clear();
              this.navCtrl.setRoot("RegisterPage");
            }
          }]
        });
        this.confirmAlert.present();
      } else {
        this.showedAlert = false;
        this.confirmAlert.dismiss().catch(() => { })
      }
    });
  }

  goHome() {
    this.navCtrl.setRoot("RegisterPage");
  }

  goPage() {
    if (this.imgPreview != '' && this.imgPreview != 'assets/imgs/no_image.png') {
      this.navCtrl.setRoot("DisclaimerPage");
    } else {
      const alert = this.alertCtrl.create({
        message: 'Please upload your profile picture',
        buttons: [{
          text: 'Ok',
          handler: () => { }
        }]
      });
      alert.present();
    }
  }

  selectGender(value) {
    console.log(value);
    this.loginData.gender = value;
  }

  goNewUserConfirm() {
    if (this.imgPreview != '' && this.imgPreview != 'assets/imgs/no_image.png') {
      let loader = this.loadingCtrl.create({
        spinner: 'ios',
        content: ''
      });
      loader.present();
      this.dataService.validateGuestMail(this.loginData.parentemail).then((result) => {
        loader.dismiss();
        this.emailResponseData = result;
        if (this.emailResponseData.returnStatus != 0) {
          console.log('Valid Email');
          this.error_email = false;
          this.mail_shown_status = true;
          this.showNewUserConfirmForm();
        } else {
          console.log('Not Valid Email');
          this.error_email = true;
          this.mail_shown_status = false;
          this.showNewUserConfirmForm();
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

      this.dataService.validateGuestMobile(this.loginData.parentmobile).then((result) => {
        this.phoneResponseData = result;
        if (this.phoneResponseData.returnStatus != 0) {
          console.log('Valid Mobile');
          this.error_phone = false;
          this.phone_shown_status = true;
          this.showNewUserConfirmForm();
        } else {
          console.log('Not Valid Mobile');
          this.error_phone = true;
          this.phone_shown_status = false;
          this.showNewUserConfirmForm();
        }
      }, (err) => {
        console.log(err);
      });
    } else {
      const alert = this.alertCtrl.create({
        message: 'Please upload your profile picture',
        buttons: [{
          text: 'Ok',
          handler: () => { }
        }]
      });
      alert.present();
    }
  }

  saveGuestDetails() {

    let loader = this.loadingCtrl.create({
      spinner: 'ios',
      content: ''
    });
    loader.present();
    let date = new Date();
    let latest_date = this.datepipe.transform(date, 'dd-MMM-yyyy');
    this.loginData.dob = latest_date;
    this.loginData.image = this.imgPreview;
    this.loginData.imagepath = this.loginData.studentname + '_img';
    console.log(this.loginData.dob);
    this.dataService.saveGuestDetails(this.loginData).then(async (result) => {
      this.resData = result;
      this.userList = await this.databaseprovider.selectUserById(this.resData.studentId).then(res => res);
      if (this.userList.length == 0) {
        this.databaseprovider.addUserImage(this.resData.studentId, this.imgPreview)
          .then(data => {
            console.log('Users added to local db.');
          }).catch(e => {
            console.log(e);
          });
      }
      loader.dismiss();
      const alert = this.alertCtrl.create({
        message: this.resData.returnMessage,
        buttons: [{
          text: 'Ok',
          handler: () => {
            if (this.resData.returnStatus != 0) {
              this.storage.clear();
              this.navCtrl.setRoot("RegisterPage");
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

  showNewUserConfirmForm() {
    console.log('Mail Shown==>' + this.mail_shown_status, 'Phone Shown==>' + this.phone_shown_status);
    if (this.mail_shown_status && this.phone_shown_status) {
      this.new_user_confirm_form = false;
      this.new_user_confirm_form_proceed = true;
      console.log(this.loginData);
    }
  }

  goNewUserCorrect() {
    this.new_user_confirm_form = true;
    this.new_user_confirm_form_proceed = false;
  }


  async getPhoto() {
    const alert = this.alertCtrl.create({
      message: "As this app allows multiple users, photo is used to indicate the user.",
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.getPhotoFromDevice();
        }
      }]
    });
    alert.present();
  }

  getPhotoFromDevice() {
    this.validExistingUserForm = true;
    this.validNewUserForm = true;
    const options = {
      quality: 10
      , destinationType: this.camera.DestinationType.DATA_URL
      , mediaType: this.camera.MediaType.PICTURE
      , sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.camera.getPicture(options).then(imagePath => {
      let txtForImage = `data:image/jpeg;base64,` + imagePath;
      this.imgPreview = txtForImage;
      this.storage.set('imgPreview', this.imgPreview);
      this.databaseprovider.updateUserImage(this.responseData.studentId, this.imgPreview)
        .then(data => {
          console.log('User status updated to local db.');
          this.validExistingUserForm = false;
          this.validNewUserForm = false;
          this.dataService.addPhoto(this.responseData, this.imgPreview).then((result) => {
            console.log(result);
          }, (err) => {
            console.log(err);
          });
          //this.navCtrl.setRoot("UsersPage");
        }).catch(e => {
          console.log(e);
        });
      this.storage.set(this.responseData.studentId, this.imgPreview);
      console.log("imgPreview", this.imgPreview);
    }).catch(error => {
      console.error(error);
    });
  }
}
