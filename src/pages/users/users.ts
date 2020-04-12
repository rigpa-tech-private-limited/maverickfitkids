import { Component } from '@angular/core';
import { Platform, ModalController, IonicPage, NavController, AlertController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DatabaseProvider } from '../../providers/database/database';

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
  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public platform: Platform,
    public modalCtrl: ModalController,
    public databaseprovider: DatabaseProvider,
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



  async selectUser(pmUserId, index, enableflag, userStatus) {

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
          this.storage.set('loggedInUser', "yes");
          this.storage.set('userDetails', this.userList[0]);
          this.storage.set('imgPreview', this.userList[0].studentImage);
          this.navCtrl.setRoot("HomePage");
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