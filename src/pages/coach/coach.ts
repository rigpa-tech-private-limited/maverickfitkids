import { Component, ElementRef, ViewChild } from '@angular/core';
import { Platform, ModalController, IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../config/config';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-coach',
  templateUrl: 'coach.html'
})
export class CoachPage {
  unregisterBackButtonAction: any;
  imgPreview = 'assets/imgs/no_image.png';
  responseData: any;
  userDetails: any;
  coachVideoPath: any;
  @ViewChild('video') video: ElementRef;
  private myVideo: HTMLVideoElement;
  constructor(public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
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
          this.dataService.getCoachVideo(this.userDetails).then((result) => {
            loader.dismiss();
            this.responseData = result;
            console.log(this.responseData);
            if (this.responseData.returnStatus != 0) {
              this.coachVideoPath = AppConfig.SITE_URL + this.responseData.videoPath;
              this.myVideo = this.video.nativeElement;
              this.myVideo.src = this.coachVideoPath;
              this.videoPlay();
            } else if (this.responseData.returnStatus == 0) {
              console.log('returnStatus=>0');
              const alert = this.alertCtrl.create({
                message: this.responseData.returnMessage,
                buttons: [{
                  text: 'Ok',
                  handler: () => {
                    this.navCtrl.setRoot("MenuPage");
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
      });
  }

  videoPlay() {
    //console.log(this.myVideo);
    let isVideoPlaying = this.myVideo.currentTime > 0 && !this.myVideo.paused && !this.myVideo.ended && this.myVideo.readyState > 2;
    console.log("isVideoPlaying", isVideoPlaying);
    if (!isVideoPlaying) {
      this.myVideo.play();
    }
  }

  videoPause() {
    console.log(this.myVideo);
    let isVideoPlaying = this.myVideo.currentTime > 0 && !this.myVideo.paused && !this.myVideo.ended && this.myVideo.readyState > 2;
    console.log(isVideoPlaying);
    if (isVideoPlaying) {
      this.myVideo.pause();
    }
  }

  toggleVideo() {
    console.log("Paused==>" + this.myVideo.paused);
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

    var videos = document.getElementById('videos');
    videos.addEventListener('play', () => {
    }, false);
    videos.addEventListener('pause', () => {
    }, false);
    this.initializeBackButtonCustomHandler();
  }

  ionViewWillLeave() {
    console.log('ionicPage Leave-->');
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
    this.videoPause();
  }

  initializeBackButtonCustomHandler(): void {
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
      console.log('Prevent Back Button Page Change-->');
      this.goHome();
    });
  }

  goHome() {
    this.videoPause();
    this.navCtrl.setRoot("MenuPage");
  }

  goPage(pmPage) {
    this.videoPause();
    this.navCtrl.setRoot(pmPage);
  }
}
