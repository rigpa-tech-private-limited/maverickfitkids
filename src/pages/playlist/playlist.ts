import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AppConfig } from '../../config/config';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
import { IOSFilePicker } from '@ionic-native/file-picker';
import { FileChooser } from '@ionic-native/file-chooser';
import { Base64 } from '@ionic-native/base64';
import { DatabaseProvider } from '../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-playlist',
  templateUrl: 'playlist.html',
})
export class PlaylistPage {
  isIOS: boolean = false;
  unregisterBackButtonAction: any;
  insightContent: any = { "imagePath": "", "description": "" };
  responseData: any;
  userDetails: any;
  showImage: boolean = false;
  showText: boolean = false;
  imgPreview = 'assets/imgs/no_image.png';
  loader: any;
  constructor(public alertCtrl: AlertController,
    private filePicker: IOSFilePicker,
    private fileChooser: FileChooser,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private base64: Base64,
    public storage: Storage,
    public databaseprovider: DatabaseProvider,
    public platform: Platform,
    public dataService: DataProvider) {
    this.databaseprovider.getDatabaseState();
    this.storage.get('userDetails')
      .then((res: any) => {
        if (res) {
          this.userDetails = res;
          console.log(this.userDetails);
        }
      });
    if (this.platform.is('ios')) {
      this.isIOS = true;
    }
  }

  public onFileFromStorageChosen(filesEvent: any) {
    // if (this.platform.is('ios')) {
    //   this.filePicker.pickFile()
    //     .then(uri => console.log(uri))
    //     .catch(err => console.log('Error', err));
    // } else {
    //   this.fileChooser.open()
    //     .then(uri => {
    //       console.log(uri)
    //       this.base64.encodeFile(uri).then((base64File: string) => {
    //         console.log(base64File);
    //       }, (err) => {
    //         console.log(err);
    //       });
    //     })
    //     .catch(e => console.log(e));
    // }
    console.log(filesEvent);
    this.loader = this.loadingCtrl.create({
      spinner: 'ios',
      content: ''
    });
    this.loader.present();
    this.processFileFromStorage(filesEvent);
  }

  public processFileFromStorage(event: any) {
    let file = event.target.files[0];
    //you can read various properties of the file (like mimetype and size) from the file object.
    console.log(file);
    this.readfile(file);
  }

  //this one reads the contents of the file as a URL that contains its data:

  public readfile(file: any): void {
    let reader = new FileReader();
    reader.onload = (e) => {
      let dataUrl = reader.result;
      this.loader.dismiss();
      if (file.type == 'audio/mp3' || file.type == 'audio/mpeg' || file.type == 'audio/ogg') {
        this.databaseprovider.updateUserPlaylist(this.userDetails.studentId, dataUrl)
          .then(data => {
            console.log('User music updated to local db.');
            const alert = this.alertCtrl.create({
              message: 'Playlist music file uploaded successfully',
              buttons: [{
                text: 'Ok',
                handler: () => {
                  this.navCtrl.setRoot("UserDetailPage");
                }
              }]
            });
            alert.present();
            //this.loader.dismiss();
          }).catch(e => {
            console.log(e);
          });
      } else {
        const alert = this.alertCtrl.create({
          message: 'Invalid music file',
          buttons: [{
            text: 'Ok',
            handler: () => { }
          }]
        });
        alert.present();
      }
      console.log(dataUrl);
    };
    reader.readAsDataURL(file);
  }

  goHome() {
    this.navCtrl.setRoot("UserDetailPage");
  }

  showImageOrText(pmFlag) {
    if (pmFlag == 1) {
      this.showText = true;
      this.showImage = false;
    } else {
      this.showImage = true;
      this.showText = false;
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
