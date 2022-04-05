import { Component } from '@angular/core';
import { Platform, ModalController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-guides',
  templateUrl: 'guides.html'
})

export class GuidesPage {
  unregisterBackButtonAction: any;
  imgPreview = 'assets/imgs/no_image.png';
  constructor(public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public storage: Storage) {

  }

  selectType() {
    this.openModal('GuidePopupPage');
  }

  openModal(pageName) {
    let modal = this.modalCtrl.create(pageName, null, {
      cssClass: 'exercise-modal',
      enableBackdropDismiss: true
    });
    modal.present();
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
