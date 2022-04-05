import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-star-rating',
  templateUrl: 'star-rating.html',
})
export class StarRatingPage {
  unregisterBackButtonAction: any;
  responseData: any;
  userDetails: any;
  starList: any;
  studentName: any = "";
  imgPreview = 'assets/imgs/no_image.png';
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public storage: Storage) {
    if (this.navParams.get('starList')) {
      this.starList = this.navParams.get('starList');
    }
    this.storage.get('userDetails')
      .then((res: any) => {
        if (res) {
          this.studentName = res.studentName;
        }
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
