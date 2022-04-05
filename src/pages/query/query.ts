import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AppConfig } from '../../config/config';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-query',
  templateUrl: 'query.html',
})
export class QueryPage {
  unregisterBackButtonAction: any;
  querylist: any = [];
  responseData: any;
  userDetails: any;
  queryinput: any;
  imgPreview = 'assets/imgs/no_image.png';

  constructor(public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public platform: Platform,
    public dataService: DataProvider) {
    this.storage.get('userDetails')
      .then((res: any) => {
        if (res) {
          this.userDetails = res;
          console.log(this.userDetails);
          let loader = this.loadingCtrl.create({
            spinner: 'ios',
            content: ''
          });
          loader.present();
          this.dataService.getStudentQueryDetails(this.userDetails).then((result) => {
            loader.dismiss();
            this.responseData = result;
            console.log(this.responseData);
            if (this.responseData.returnStatus != 0) {
              if (this.responseData.queryList) {
                this.querylist = (this.responseData.queryList);
                console.log(this.querylist);
                setTimeout(() => {
                  let cusid_ele1 = document.getElementsByClassName('user-avatar');
                  for (let j = 0; j < cusid_ele1.length; ++j) {
                    let item = cusid_ele1[j];
                    item.setAttribute("style", "background-image: url(" + this.imgPreview + ");");
                  }
                }, 1000);
              }
            } else if (this.responseData.returnStatus == 0) {
              console.log('returnStatus=>0');
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
      });
  }


  saveQueryDetails() {
    if (this.queryinput != '') {
      let loader = this.loadingCtrl.create({
        spinner: 'ios',
        content: ''
      });
      loader.present();
      this.dataService.saveStudentQueryDetails(this.userDetails, this.queryinput).then((result) => {
        this.responseData = result;
        loader.dismiss();
        console.log(this.responseData);
        if (this.responseData.returnStatus != 0) {
          console.log('success');
          this.navCtrl.setRoot("QueryPage");
        } else {
          console.log('returnStatus=>0'); const alert = this.alertCtrl.create({
            message: this.responseData.returnMessage,
            buttons: [{
              text: 'Ok',
              handler: () => {
              }
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
}
