import { Component } from '@angular/core';
import { Platform, ModalController, IonicPage, NavController, AlertController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DatabaseProvider } from '../../providers/database/database';
import { DataProvider } from '../../providers/data/data';
import { Camera } from '@ionic-native/camera';
@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {
  unregisterBackButtonAction: any;
  responseData: any;
  userDetails: any = "";
  showedAlert: boolean;
  confirmAlert: any;
  starList: any;
  studentName: any = "";
  imgPreview = 'assets/imgs/no_image.png';
  lockunlock1: boolean = false;
  lockunlock2: boolean = false;
  lockunlock3: boolean = false;
  lockunlock4: boolean = false;
  redDotVisible1: boolean = false;
  redDotVisible2: boolean = false;
  redDotVisible3: boolean = false;
  redDotVisible4: boolean = false;
  usersList: any;
  userList: any;
  userId1: any = '0';
  userId2: any = '0';
  userId3: any = '0';
  userId4: any = '0';
  userStar1: any = '0';
  userStar2: any = '0';
  userStar3: any = '0';
  userStar4: any = '0';
  userName1: any = 'Add user';
  userName2: any = 'Add user';
  userName3: any = 'Add user';
  userName4: any = 'Add user';
  userImg1: any = '../assets/imgs/add_user.png';
  userImg2: any = '../assets/imgs/add_user.png';
  userImg3: any = '../assets/imgs/add_user.png';
  userImg4: any = '../assets/imgs/add_user.png';
  userStatus1: any = '0';
  userStatus2: any = '0';
  userStatus3: any = '0';
  userStatus4: any = '0';
  userLockStatus1: any = '0';
  userLockStatus2: any = '0';
  userLockStatus3: any = '0';
  userLockStatus4: any = '0';
  loader1: any;
  showUsersList: boolean = false;
  responseData1: any;
  loginData = { "existing_student_name": "", "existing_student_mfk_id": "", "new_student_name": "", "school_access_code": "" };
  selectedUserIndex: any;
  consistencyList: any = [];
  responseDataConsis: any;
  userDetailsConsis: any;
  totalStarCount: any;
  maxStarCount: any;
  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public platform: Platform,
    public dataService: DataProvider,
    public modalCtrl: ModalController,
    public databaseprovider: DatabaseProvider,
    private camera: Camera,
    public storage: Storage) {
    this.databaseprovider.getDatabaseState();
    this.loader1 = this.loadingCtrl.create({
      spinner: 'ios',
      content: ''
    });
    this.loader1.present();
    this.starList = this.navParams.get('starList');
    this.storage.get('userDetails')
      .then((res: any) => {
        if (res) {
          this.userDetails = res;
          console.log(this.userDetails);
          this.studentName = res.studentName;
        }
      });
    //this.getAllUsers();
  }

  ionViewDidEnter() {
    document.getElementsByClassName("add-user-list")[0].removeAttribute("style");
    document.getElementsByClassName("add-user-list")[0].setAttribute("style", "visibility:hidden;width:0;height:0;float:left;");
    console.log("ionViewDidEnter");
    this.getAllUsers();
  }

  async getAllUsers() {
    this.showUsersList = true;
    this.usersList = await this.databaseprovider.getUserDetails().then(res => res);
    console.log(this.usersList);
    if (this.usersList.length > 0) {
      this.usersList.forEach((element, index) => {
        if (index == 0) {
          this.userId1 = element.studentId;
          this.userName1 = element.studentName;
          if (element.studentName == this.studentName) {
            this.redDotVisible1 = true;
          }
          this.userStar1 = element.starcount;
          if (element.studentImage != "") {
            this.userImg1 = element.studentImage;
            let cusid_ele = document.getElementsByClassName('profile-avatar1');
            for (let i = 0; i < cusid_ele.length; ++i) {
              let item = cusid_ele[i];
              item.setAttribute("style", "background-image: url(" + this.userImg1 + ");");
            }
          }
          this.userStatus1 = element.status;
          this.userLockStatus1 = element.lockStatus;
          if (element.lockStatus == "1") {
            this.selectedUserIndex = 0;
            this.redDotVisible1 = true;
            // if (this.platform.is('ios')) {
            //   setTimeout(() => {
            //     let cusid_ele = document.getElementsByClassName('toggle');
            //     cusid_ele[0].setAttribute("class", "toggle toggle-md toggle-checked");
            //   }, 1000);
            // }
          } else {
            this.redDotVisible1 = false;
            // if (this.platform.is('ios')) {
            //   setTimeout(() => {
            //     let cusid_ele = document.getElementsByClassName('toggle');
            //     cusid_ele[0].setAttribute("class", "toggle toggle-md");
            //   }, 1000);
            // }
          }
        }
        if (index == 1) {
          this.userId2 = element.studentId;
          this.userName2 = element.studentName;
          if (element.studentName == this.studentName) {
            this.redDotVisible2 = true;
          }
          this.userStar2 = element.starcount;
          if (element.studentImage != "") {
            this.userImg2 = element.studentImage;
            let cusid_ele = document.getElementsByClassName('profile-avatar2');
            for (let i = 0; i < cusid_ele.length; ++i) {
              let item = cusid_ele[i];
              item.setAttribute("style", "background-image: url(" + this.userImg2 + ");");
            }
          }
          this.userStatus2 = element.status;
          this.userLockStatus2 = element.lockStatus;
          if (element.lockStatus == "1") {
            this.selectedUserIndex = 1;
            this.redDotVisible2 = true;
            // if (this.platform.is('ios')) {
            //   setTimeout(() => {
            //     let cusid_ele = document.getElementsByClassName('toggle');
            //     cusid_ele[1].setAttribute("class", "toggle toggle-md toggle-checked");
            //   }, 1000);
            // }
          } else {
            this.redDotVisible2 = false;
            // if (this.platform.is('ios')) {
            //   setTimeout(() => {
            //     let cusid_ele = document.getElementsByClassName('toggle');
            //     cusid_ele[1].setAttribute("class", "toggle toggle-md");
            //   }, 1000);
            // }
          }
        }
        if (index == 2) {
          this.userId3 = element.studentId;
          this.userName3 = element.studentName;
          if (element.studentName == this.studentName) {
            this.redDotVisible3 = true;
          }
          this.userStar3 = element.starcount;
          if (element.studentImage != "") {
            this.userImg3 = element.studentImage;
            let cusid_ele = document.getElementsByClassName('profile-avatar3');
            for (let i = 0; i < cusid_ele.length; ++i) {
              let item = cusid_ele[i];
              item.setAttribute("style", "background-image: url(" + this.userImg3 + ");");
            }
          }
          this.userStatus3 = element.status;
          this.userLockStatus3 = element.lockStatus;
          if (element.lockStatus == "1") {
            this.selectedUserIndex = 2;
            this.redDotVisible3 = true;
            // if (this.platform.is('ios')) {
            //   setTimeout(() => {
            //     let cusid_ele = document.getElementsByClassName('toggle');
            //     cusid_ele[2].setAttribute("class", "toggle toggle-md toggle-checked");
            //   }, 1000);
            // }
          } else {
            this.redDotVisible3 = false;
            // if (this.platform.is('ios')) {
            //   setTimeout(() => {
            //     let cusid_ele = document.getElementsByClassName('toggle');
            //     cusid_ele[2].setAttribute("class", "toggle toggle-md");
            //   }, 1000);
            // }
          }
        }
        if (index == 3) {
          this.userId4 = element.studentId;
          this.userName4 = element.studentName;
          if (element.studentName == this.studentName) {
            this.redDotVisible4 = true;
          }
          this.userStar4 = element.starcount;
          if (element.studentImage != "") {
            this.userImg4 = element.studentImage;
            let cusid_ele = document.getElementsByClassName('profile-avatar4');
            for (let i = 0; i < cusid_ele.length; ++i) {
              let item = cusid_ele[i];
              item.setAttribute("style", "background-image: url(" + this.userImg4 + ");");
            }
          }
          this.userStatus4 = element.status;
          this.userLockStatus4 = element.lockStatus;
          if (element.lockStatus == "1") {
            this.selectedUserIndex = 3;
            this.redDotVisible4 = true;
            // if (this.platform.is('ios')) {
            //   setTimeout(() => {
            //     let cusid_ele = document.getElementsByClassName('toggle');
            //     cusid_ele[3].setAttribute("class", "toggle toggle-md toggle-checked");
            //   }, 1000);
            // }
          } else {
            this.redDotVisible4 = false;
            // if (this.platform.is('ios')) {
            //   setTimeout(() => {
            //     let cusid_ele = document.getElementsByClassName('toggle');
            //     cusid_ele[3].setAttribute("class", "toggle toggle-md");
            //   }, 1000);
            // }
          }
        }
        if (index == (this.usersList.length - 1)) {
          document.getElementsByClassName("add-user-list")[0].removeAttribute("style");
          document.getElementsByClassName("add-user-list")[0].setAttribute("style", "visibility:visible;");
          this.loader1.dismiss();
          this.showUsersList = true;
        }
      });
    } else {
      document.getElementsByClassName("add-user-list")[0].removeAttribute("style");
      document.getElementsByClassName("add-user-list")[0].setAttribute("style", "visibility:visible;");
      this.loader1.dismiss();
      this.showUsersList = true;
    }
  }

  async goHome() {
    if (this.userDetails != "") {
      console.log(this.usersList);
      this.userList = await this.databaseprovider.selectUserById(this.userDetails.studentId).then(res => res);
      console.log(this.userList, this.userList[0].status, this.userList[0].lockStatus);
      if (this.usersList.length > 0 && this.userList[0].status == "1" && this.userList[0].lockStatus == "1") {
        this.navCtrl.setRoot("HomePage");
      } else {
        if (!this.showedAlert && this.platform.is('android')) {
          this.showedAlert = true;
          this.confirmAlert = this.alertCtrl.create({
            title: 'Exit',
            message: 'Do you want to exit?',
            buttons: [{
              text: 'No',
              role: 'cancel',
              handler: () => {
                console.log('Application exit prevented!');
              }
            }, {
              text: 'Yes',
              handler: () => {
                //this.storage.clear();
                this.platform.exitApp(); // Close this application
              }
            }]
          });
          this.confirmAlert.present();
        } else {
          this.showedAlert = false;
          this.confirmAlert.dismiss().catch(() => { })
        }
      }
    } else {
      if (!this.showedAlert && this.platform.is('android')) {
        this.showedAlert = true;
        this.confirmAlert = this.alertCtrl.create({
          title: 'Exit',
          message: 'Do you want to exit?',
          buttons: [{
            text: 'No',
            role: 'cancel',
            handler: () => {
              console.log('Application exit prevented!');
            }
          }, {
            text: 'Yes',
            handler: () => {
              //this.storage.clear();
              this.platform.exitApp(); // Close this application
            }
          }]
        });
        this.confirmAlert.present();
      } else {
        this.showedAlert = false;
        this.confirmAlert.dismiss().catch(() => { })
      }
    }
  }

  goPage(pmPage) {
    this.navCtrl.setRoot(pmPage);
  }

  async getPhoto(pmIndex) {
    console.log(pmIndex);
    const alert = this.alertCtrl.create({
      message: "As this app allows multiple users, photo is used to indicate the user.",
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.getPhotoFromDevice(pmIndex);
        }
      }]
    });
    alert.present();
  }

  getPhotoFromDevice(pmIndex) {
    const options = {
      quality: 10
      , destinationType: this.camera.DestinationType.DATA_URL
      , mediaType: this.camera.MediaType.PICTURE
      // Optional , correctOrientation: true
      , sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
      // Optional , saveToPhotoAlbum: true
    };
    console.log(pmIndex, this.usersList[pmIndex]);
    this.camera.getPicture(options).then(imagePath => {
      let txtForImage = `data:image/jpeg;base64,` + imagePath;
      this.imgPreview = txtForImage;
      this.dataService.addPhoto(this.usersList[pmIndex], this.imgPreview).then((result) => {
        console.log(result);
        this.responseData = result;
        if (this.responseData.returnStatus != 0) {
          this.databaseprovider.updateUserImage(this.usersList[pmIndex].studentId, this.imgPreview)
            .then(data => {
              console.log('User status updated to local db.');
              const alert = this.alertCtrl.create({
                message: this.responseData.returnMessage,
                buttons: [{
                  text: 'Ok',
                  handler: () => {
                    this.navCtrl.setRoot("UsersPage");
                  }
                }],
                enableBackdropDismiss: false
              });
              alert.present();
            }).catch(e => {
              console.log(e);
            });
        }
      }, (err) => {
        console.log(err);
      });
    })
      .catch(error => {
        console.error(error);
      });
  }

  async selectUser(pmUserId, index, enableflag, userStatus) {
    console.log(pmUserId, index, enableflag, userStatus);
    if (pmUserId == "0") {
      if (this.usersList) {
        this.navCtrl.setRoot("AddUserRegisterPage", { "currentStudentName": this.studentName, "usersList": this.usersList });
      } else {
        this.navCtrl.setRoot("AddUserRegisterPage", { "currentStudentName": "Add user", "usersList": [] });
      }
    } else {
      console.log(pmUserId, "--", index);
      let lockunlock: any = '0';
      if (index == 1) {
        lockunlock = this.lockunlock1;
      }
      if (index == 2) {
        lockunlock = this.lockunlock2;
      }
      if (index == 3) {
        lockunlock = this.lockunlock3;
      }
      if (index == 4) {
        lockunlock = this.lockunlock4;
      }
      if (enableflag && userStatus == '1') {
        this.userList = await this.databaseprovider.selectUserById(pmUserId).then(res => res);
        console.log(this.userList);
        if (this.userList) {
          this.loginData.existing_student_name = this.userList[0].studentName;
          this.loginData.existing_student_mfk_id = this.userList[0].password;
          this.loginData.new_student_name = null;
          this.loginData.school_access_code = null;
          let loader = this.loadingCtrl.create({
            spinner: 'ios',
            content: ''
          });
          loader.present();
          this.dataService.studentLogin(this.loginData).then((result) => {
            this.responseData = result;
            loader.dismiss();
            console.log(this.responseData);
            if (this.responseData.returnStatus != 0) {
              this.responseData.password = this.loginData.existing_student_mfk_id;
              console.log('Register success');
              this.dataService.getStudentStar(this.responseData).then(async (result) => {
                this.responseData1 = result;
                console.log(this.responseData1);
                if (this.responseData1.returnStatus != 0) {
                  this.responseData.starCount = this.responseData1.starCount;
                } else {
                  this.responseData.starCount = "0";
                }
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
                this.storage.set('loggedInUser', "yes");
                this.storage.set('userDetails', this.userList[0]);
                this.storage.set('imgPreview', this.userList[0].studentImage);
                this.navCtrl.setRoot("HomePage");
              });
            } else {
              console.log('Register fail');
            }
          }, (err) => {
            console.log(err);
            loader.dismiss();
          });
        }
      } else {
        console.log("Locked");
      }
    }
  }

  enableActiveUser(userId, userStatus, index) {
    console.log('index==>', index);
    if (userStatus == '1') {
      let statusValue: any = '0';
      if (index == 1) {
        if (this.redDotVisible1) {
          this.redDotVisible1 = true;
          this.redDotVisible2 = false;
          this.redDotVisible3 = false;
          this.redDotVisible4 = false;
          statusValue = "1";
        }
      }
      if (index == 2) {
        if (this.redDotVisible2) {
          this.redDotVisible1 = false;
          this.redDotVisible2 = true;
          this.redDotVisible3 = false;
          this.redDotVisible4 = false;
          statusValue = "1";
        }
      }
      if (index == 3) {
        if (this.redDotVisible3) {
          this.redDotVisible1 = false;
          this.redDotVisible2 = false;
          this.redDotVisible3 = true;
          this.redDotVisible4 = false;
          statusValue = "1";
        }
      }
      if (index == 4) {
        if (this.redDotVisible4) {
          this.redDotVisible1 = false;
          this.redDotVisible2 = false;
          this.redDotVisible3 = false;
          this.redDotVisible4 = true;
          statusValue = "1";
        }
      }
      this.databaseprovider.updateUserLockStatus(userId, statusValue)
        .then(data => {
          console.log('User status updated to local db.');
          this.navCtrl.setRoot("UsersPage");
          this.selectedUserIndex = index;
        }).catch(e => {
          console.log(e);
        });
    }
  }

  updateUserStatus(userId, userStatus) {
    let statusValue: any = '0';
    // if (index == 1) {
    //   lockunlock = this.lockunlock1;
    // }
    // if (index == 2) {
    //   lockunlock = this.lockunlock2;
    // }
    // if (index == 3) {
    //   lockunlock = this.lockunlock3;
    // }
    // if (index == 4) {
    //   lockunlock = this.lockunlock4;
    // }
    if (userStatus == '1') {
      statusValue = "2";

      const confirmAlert = this.alertCtrl.create({
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
            this.databaseprovider.updateUserStatus(userId, statusValue)
              .then(data => {
                console.log('User status updated to local db.');
                this.databaseprovider.updateUserLockStatus(userId, '0')
                  .then(data => {
                    console.log('User status updated to local db.');
                    this.navCtrl.setRoot("UsersPage");
                  }).catch(e => {
                    console.log(e);
                  });
              }).catch(e => {
                console.log(e);
              });
          }
        }]
      });
      confirmAlert.present();
    } else if (userStatus == '2') {
      statusValue = "1";
      this.openModal('UserPopupPage', userId, statusValue);
    }
  }

  openModal(pageName, userId, statusValue) {
    let modal = this.modalCtrl.create(pageName, { "userId": userId, "statusValue": statusValue }, {
      cssClass: 'exercise-modal',
      enableBackdropDismiss: true
    });
    modal.present();
  }

  async sharePage(pmSelectedIndex) {
    console.log("share");
    if (this.usersList.length > 0) {
      this.userDetailsConsis = this.usersList[pmSelectedIndex];
      console.log(this.userDetailsConsis);
      let loader = this.loadingCtrl.create({
        spinner: 'ios',
        content: ''
      });
      loader.present();
      this.dataService.getWeeklyStudentConsistency(this.userDetailsConsis).then((result) => {
        loader.dismiss();
        this.responseDataConsis = result;
        console.log(this.responseDataConsis);
        if (this.responseDataConsis.returnStatus != 0) {
          if (this.responseDataConsis.consistencyList) {
            this.consistencyList = (this.responseDataConsis.consistencyList);
            this.totalStarCount = this.responseDataConsis.totalStar;

            var maxObj = this.consistencyList.reduce(function(max, obj) {
              return obj.star > max.star ? obj : max;
            });

            this.maxStarCount = (maxObj.star);
            if (maxObj.star > 0) {
              this.consistencyList.forEach(element => {
                let percent = (element.star / maxObj.star) * 100;
                element.percent = (percent <= 100 ? percent : 100);
                element.top = ((100 - percent) >= 0 ? (100 - percent) : 0);
                console.log(element.star, percent);
              });
            }
            console.log(this.consistencyList);
            if (this.consistencyList.length > 0) {
              this.navCtrl.setRoot("ConsistencySharePage", { "consistencyList": this.consistencyList, "maxStarCount": this.maxStarCount, "userDetails": this.userDetailsConsis, "totalStarCount": this.totalStarCount, "fromPage": "users" });
            }
          }
        } else if (this.responseDataConsis.returnStatus == 0) {
          console.log('returnStatus=>0');
        }
      }, (err) => {
        console.log(err);
        loader.dismiss();
      });
    }
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
