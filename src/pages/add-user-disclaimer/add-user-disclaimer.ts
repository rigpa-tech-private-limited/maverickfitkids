import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AppConfig } from '../../config/config';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-add-user-disclaimer',
  templateUrl: 'add-user-disclaimer.html',
})
export class AddUserDisclaimerPage {
  unregisterBackButtonAction: any;
  showedAlert: boolean;
  confirmAlert: any;
  disclaimerContent: any;
  responseData: any;
  studentId: any;
  storedIds: any;
  arrStudentImgs: any = [];
  constructor(public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public platform: Platform,
    public dataService: DataProvider) {
    let loader = this.loadingCtrl.create({
      spinner: 'ios',
      content: ''
    });
    loader.present();
    this.dataService.getDisclaimer().then((result) => {
      loader.dismiss();
      this.responseData = result;
      console.log(this.responseData);
      if (this.responseData.returnStatus != 0) {
        this.disclaimerContent = this.responseData.disclaimerContent;
      } else if (this.responseData.returnStatus == 0) {
        console.log('returnStatus=>0');
        const alert = this.alertCtrl.create({
          message: this.responseData.returnMessage,
          buttons: [{
            text: 'Ok',
            handler: () => {
              //this.navCtrl.pop();
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
  ionViewDidLoad() {
    this.initializeBackButtonCustomHandler();
  }

  ionViewWillLeave() {
    console.log('HomePage Leave-->');
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }
  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  }

  async logOff() {
    this.storedIds = await this.storage.get('studentIds') || [];
    console.log(this.storedIds);
    if (this.storedIds) {
      this.arrStudentImgs = [];
      var index = 0;
      //const waitFor = (ms) => new Promise(r => setTimeout(r, ms))
      const start = async () => {
        await this.asyncForEach(this.storedIds, async (element) => {
          //await waitFor(50)
          console.log("Ids-", index, element);
          //let elementStdId = element;
          await this.storage.get(element)
            .then(async (res: any) => {
              if (res) {
                var obj = {};
                obj[element] = res;
                //ary.push(obj);
                await this.arrStudentImgs.push(obj);
                console.log("If -> Image", element, res);
              } else {
                console.log("Else -> Image not");
              }
            });
          index++;
        })
        console.log('Done')
        console.log("arrStudentImgs-", this.arrStudentImgs);
      }
      start();
    }
  }
  initializeBackButtonCustomHandler(): void {
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
      console.log('Prevent Back Button Page Change-->');
      this.logOff();
      this.goHome();
    });
  }

  goHome() {
    this.navCtrl.setRoot("UsersPage");
  }

}
