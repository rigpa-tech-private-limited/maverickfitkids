import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-about-guide-popup',
  templateUrl: 'about-guide-popup.html',
})
export class AboutGuidePopupPage {

  unregisterBackButtonAction: any;
  constructor(public navCtrl: NavController,
    public platform: Platform, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  closeModal(): void {
    this.viewCtrl.dismiss({ slideAction: 'close' });
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
    console.log('AboutGuidePopupPage Leave-->');
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  initializeBackButtonCustomHandler(): void {
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
      console.log('Prevent Back Button Page Change-->');
      this.closeModal();
      this.navCtrl.setRoot("GuideExercisePage");
    });
  }
}
