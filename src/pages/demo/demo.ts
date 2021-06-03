import { Component, ElementRef, ViewChild } from '@angular/core';
import { Platform, ModalController, IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../config/config';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-demo',
  templateUrl: 'demo.html',
})
export class DemoPage {
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
    this.myVideo = this.video.nativeElement;
    this.myVideo.src = AppConfig.SITE_URL + 'maverick/Demo/Student_app_Demo.mov';
  }

  ionViewWillLeave() {
    console.log('ionicPage Leave-->');
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
    this.videoPause();
  }

  initializeBackButtonCustomHandler(): void {
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
      console.log('Prevent Back Button Page Change-->');
      this.goBack();
    });
  }

  goBack() {
    this.videoPause();
    this.navCtrl.setRoot("UsersPage");
  }

}
