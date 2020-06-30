import { Component, ElementRef, ViewChild } from '@angular/core';
import { Platform, ModalController, IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AppConfig } from '../../config/config';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
import { DatabaseProvider } from '../../providers/database/database';
@IonicPage()
@Component({
  selector: 'page-sessions',
  templateUrl: 'sessions.html',
})

export class SessionsPage {
  unregisterBackButtonAction: any;
  sessionsContent: any;
  sessionDescription: any;
  responseData: any;
  userDetails: any;
  imgPreview = 'assets/imgs/no_image.png';
  sessionCode: any;
  image1: any;
  image2: any;
  image3: any;
  image4: any;
  image5: any;
  @ViewChild('musicaudio') musicaudio: ElementRef;
  private musicAudio: HTMLAudioElement;
  userList: any;
  isPlaying: boolean = false;
  music_icon: any = 'assets/imgs/music_icon_gray.png';
  constructor(public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public platform: Platform,
    public databaseprovider: DatabaseProvider,
    public dataService: DataProvider) {
    this.storage.get('userDetails')
      .then((res: any) => {
        if (res) {
          this.userDetails = res;
          console.log(this.userDetails);
          this.checkuserMusic();
          this.dataService.validateStudentFeedBack(this.userDetails).then((result) => {
            this.responseData = result;
            console.log(this.responseData);
            if (this.responseData.returnStatus != 0) {
              let loader1 = this.loadingCtrl.create({
                spinner: 'ios',
                content: ''
              });
              loader1.present();
              this.dataService.getStudentSessionDetails(this.userDetails).then(async (result) => {
                loader1.dismiss();
                this.responseData = result;
                //console.log(this.responseData.unitTemplateContent);
                if (this.responseData.returnStatus != 0) {
                  this.image1 = this.responseData.image1;
                  this.image2 = this.responseData.image2;
                  this.image3 = this.responseData.image3;
                  this.image4 = this.responseData.image4;
                  this.image5 = this.responseData.image5;
                  const regImg = new RegExp('(' + (AppConfig.SITE_URL).slice(0, -1) + ')?/maverick/Directory/Image/', 'g');
                  const regVideo = new RegExp('(' + (AppConfig.SITE_URL).slice(0, -1) + ')?/maverick/Directory/Video/', 'g');
                  const regMusic = new RegExp('(' + (AppConfig.SITE_URL).slice(0, -1) + ')?/maverick/Directory/Music/', 'g');
                  const videoTag = new RegExp('<video ', 'g');
                  const audioTag = new RegExp('<audio ', 'g');
                  this.sessionsContent = await ((((((this.responseData.unitTemplateContent).replace(regImg, AppConfig.SITE_URL + 'maverick/Directory/Image/'))).replace(regMusic, AppConfig.SITE_URL + 'maverick/Directory/Music/')).replace(regVideo, AppConfig.SITE_URL + 'maverick/Directory/Video/')).replace(videoTag, '<video controlsList="nodownload" playsinline poster="assets/imgs/video_preview.jpeg" ')).replace(audioTag, '<audio controlsList="nodownload" ');

                  //console.log(this.sessionsContent);
                  var strMessage1 = document.getElementById("sessions-content");
                  strMessage1.innerHTML = this.sessionsContent;
                  // this.sessionsContent = this.sessionsContent.replace(/<video /g, '<video controlsList="nodownload" ');
                  // this.sessionsContent = this.sessionsContent.replace(/<audio /g, '<audio controlsList="nodownload" ');
                  this.sessionDescription = this.responseData.description;
                  if (this.platform.is('ios')) {
                    setTimeout(() => {
                      let cusid_ele = document.getElementsByTagName('video');
                      for (let i = 0; i < cusid_ele.length; ++i) {
                        let item = cusid_ele[i];
                        item.play();
                      }
                    }, 1000);
                  }
                } else if (this.responseData.returnStatus == 0) {
                  console.log('returnStatus=>0');
                  const alert = this.alertCtrl.create({
                    message: this.responseData.returnMessage,
                    buttons: [{
                      text: 'Ok',
                      handler: () => {
                        this.goHome();
                      }
                    }],
                    enableBackdropDismiss: false
                  });
                  alert.present();
                }
              }, (err) => {
                console.log(err);
                loader1.dismiss();
                const alert = this.alertCtrl.create({
                  message: AppConfig.API_ERROR,
                  buttons: [{
                    text: 'Ok',
                    handler: () => {
                      this.goHome();
                    }
                  }]
                });
                alert.present();
              });
            } else if (this.responseData.returnStatus == 0) {
              console.log('returnStatus=>0');

              let modal = this.modalCtrl.create("SessionPopupPage", { "sessioncode": this.responseData.sessionCode }, {
                cssClass: 'exercise-modal',
                enableBackdropDismiss: true
              });
              modal.present();

            }
          }, (err) => {
            console.log(err);
            const alert = this.alertCtrl.create({
              message: AppConfig.API_ERROR,
              buttons: [{
                text: 'Ok',
                handler: () => {
                  this.goHome();
                }
              }]
            });
            alert.present();
          });

        }
      });
  }
  async checkuserMusic() {
    this.userList = await this.databaseprovider.selectUserById(this.userDetails.studentId).then(res => res);
    if (this.userList) {
      if (this.userList[0].playlist) {
        this.musicAudio = this.musicaudio.nativeElement;
        this.musicAudio.src = this.userList[0].playlist;
        this.music_icon = 'assets/imgs/music_icon_play.png';
      } else {
        this.music_icon = 'assets/imgs/music_icon_gray.png';
      }
    }
  }

  toggleAudio() {
    if (this.isPlaying) {
      this.stopAudio();
    } else {
      this.startAudio();
    }
    console.log("isPlaying", this.isPlaying);
  }

  startAudio() {
    this.isPlaying = true;
    this.musicAudio.play();
    this.music_icon = 'assets/imgs/music_icon_pause.png';
  }

  stopAudio() {
    if (this.musicAudio) {
      this.musicAudio.pause();
      this.musicAudio.currentTime = 0;
    }
    this.isPlaying = false;
    this.music_icon = 'assets/imgs/music_icon_play.png';
  }

  goHome() {
    this.navCtrl.setRoot("HomePage");
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
  finishSessions() {
    this.dataService.markStarForStudent(this.userDetails, 10).then((result) => {
      this.responseData = result;
      console.log(this.responseData.starList);
      if (this.responseData.returnStatus != 0) {
        // this.navCtrl.setRoot("StarRatingPage", { "starList": this.responseData.starList });
        this.navCtrl.setRoot("AcceptanceCodePage", { "starList": this.responseData.starList,"fromPage":"sessions" });
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

  playMusic() {
    console.log("playMusic clicked");
    this.toggleAudio();
  }
}
