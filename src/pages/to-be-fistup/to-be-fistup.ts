import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-to-be-fistup',
  templateUrl: 'to-be-fistup.html',
})
export class ToBeFistupPage {
  unregisterBackButtonAction: any;
  imgPreview = 'assets/imgs/no_image.png';
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public storage: Storage,
    public platform: Platform) {
  }

  closeModal(): void {
    this.viewCtrl.dismiss({ slideAction: 'close' });
    this.navCtrl.setRoot("MenuPage");
  }

  ionViewDidLoad() {
    this.storage.get('imgPreview')
      .then((res: any) => {
        if (res) {
          this.imgPreview = res;
        }
      });
    this.initializeBackButtonCustomHandler();
  }

  ionViewWillLeave() {
    console.log('ionicPage Leave-->');
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  initializeBackButtonCustomHandler(): void {
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
      console.log('Prevent Back Button Page Change-->');
      this.closeModal();
    });
  }
}
