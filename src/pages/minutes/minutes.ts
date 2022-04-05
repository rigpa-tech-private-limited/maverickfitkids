import { Component, ElementRef, ViewChild } from '@angular/core';
import { Platform, ModalController, IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../config/config';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-minutes',
  templateUrl: 'minutes.html',
})
export class MinutesPage {
  unregisterBackButtonAction: any;
  currentSlide: any = 0;
  imgPreview = 'assets/imgs/no_image.png';
  responseData: any;
  coachVideoPathStr: any;
  coachVideoPathDesc: any;
  coachVideoPathArr: any;
  @ViewChild('video') video: ElementRef;
  private myVideo: HTMLVideoElement;
  videoList: any;
  videotitle: any;
  userDetails: any;
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
          this.dataService.getMinuteVideoNew(this.userDetails).then((result) => {
            loader.dismiss();
            this.responseData = result;
            console.log(this.responseData);
            if (this.responseData.returnStatus != 0) {
              this.videoList = this.responseData.videoList;
              if (this.videoList) {
                if (this.videoList[0].videoPath != null || this.videoList[0].videoPath != "") {
                  this.coachVideoPathStr = this.videoList[0].videoPath.replace('/maverick/Directory/Video/', AppConfig.SITE_URL + 'maverick/Directory/Video/');
                } else {
                  this.coachVideoPathStr = "";
                }
                if (this.videoList[0].description != null || this.videoList[0].description != "") {
                  this.coachVideoPathDesc = this.videoList[0].description;
                } else {
                  this.coachVideoPathDesc = "";
                }
                if (this.videoList[0].title != null || this.videoList[0].title != "") {
                  this.videotitle = this.videoList[0].title;
                } else {
                  this.videotitle = "";
                }

                this.myVideo = this.video.nativeElement;
                this.myVideo.src = this.coachVideoPathStr;
                this.videoPlay();
              }
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

  onSelectVideo(selectedval) {
    console.log('selectedval', selectedval);
    this.videotitle = selectedval;
    let videosArr = this.videoList.find(x => x.title == this.videotitle);
    if (videosArr.videoPath != null || videosArr.videoPath != "") {
      this.coachVideoPathStr = videosArr.videoPath.replace('/maverick/Directory/Video/', AppConfig.SITE_URL + 'maverick/Directory/Video/');
    } else {
      this.coachVideoPathStr = "";
    }
    if (videosArr.description != null || videosArr.description != "") {
      this.coachVideoPathDesc = videosArr.description;
    } else {
      this.coachVideoPathDesc = "";
    }
    this.myVideo = this.video.nativeElement;
    this.myVideo.src = this.coachVideoPathStr;
    this.videoPlay();
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
    // document.getElementsByClassName("videos-prev-btn")[0].removeAttribute("style");
    // document.getElementsByClassName("videos-prev-btn")[0].setAttribute("style", "opacity:0.3;");
    // document.getElementsByClassName("videos-next-btn")[0].removeAttribute("style");
    // document.getElementsByClassName("videos-next-btn")[0].setAttribute("style", "opacity:1;");

    // document.getElementsByClassName("videos-prev-btn")[1].removeAttribute("style");
    // document.getElementsByClassName("videos-prev-btn")[1].setAttribute("style", "opacity:0.3;");
    // document.getElementsByClassName("videos-next-btn")[1].removeAttribute("style");
    // document.getElementsByClassName("videos-next-btn")[1].setAttribute("style", "opacity:1;");

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
  nextSlide() {
    console.log((this.currentSlide + 1) + " == " + this.coachVideoPathArr.length);
    if ((this.currentSlide + 1) == (this.coachVideoPathArr.length)) {
      console.log("last slide");
    } else {
      console.log("Curr", this.currentSlide + 1);
      if ((this.currentSlide + 1) == (this.coachVideoPathArr.length - 1)) {
        document.getElementsByClassName("videos-next-btn")[0].removeAttribute("style");
        document.getElementsByClassName("videos-next-btn")[0].setAttribute("style", "opacity:0.3;");
        document.getElementsByClassName("videos-prev-btn")[0].removeAttribute("style");
        document.getElementsByClassName("videos-prev-btn")[0].setAttribute("style", "opacity:1;");
        document.getElementsByClassName("videos-next-btn")[1].removeAttribute("style");
        document.getElementsByClassName("videos-next-btn")[1].setAttribute("style", "opacity:0.3;");
        document.getElementsByClassName("videos-prev-btn")[1].removeAttribute("style");
        document.getElementsByClassName("videos-prev-btn")[1].setAttribute("style", "opacity:1;");
      } else {
        document.getElementsByClassName("videos-prev-btn")[0].removeAttribute("style");
        document.getElementsByClassName("videos-prev-btn")[0].setAttribute("style", "opacity:1;");
        document.getElementsByClassName("videos-next-btn")[0].removeAttribute("style");
        document.getElementsByClassName("videos-next-btn")[0].setAttribute("style", "opacity:1;");
        document.getElementsByClassName("videos-prev-btn")[1].removeAttribute("style");
        document.getElementsByClassName("videos-prev-btn")[1].setAttribute("style", "opacity:1;");
        document.getElementsByClassName("videos-next-btn")[1].removeAttribute("style");
        document.getElementsByClassName("videos-next-btn")[1].setAttribute("style", "opacity:1;");
      }
      if (this.coachVideoPathArr[(this.currentSlide + 1)] != null || this.coachVideoPathArr[(this.currentSlide + 1)] != "") {
        this.coachVideoPathStr = this.coachVideoPathArr[(this.currentSlide + 1)].replace('/maverick/Directory/Video/', AppConfig.SITE_URL + 'maverick/Directory/Video/');
      } else {
        this.coachVideoPathStr = "";
      }
      this.myVideo = this.video.nativeElement;
      this.myVideo.src = this.coachVideoPathStr;
      this.goToSlide(this.currentSlide + 1);
      this.videoPlay();
    }
  }

  prevSlide() {
    console.log((this.currentSlide - 1) + " == " + this.coachVideoPathArr.length);
    if ((this.currentSlide) == 0) {
      console.log("Home Slide");
    } else {
      console.log("Curr", this.currentSlide - 1);
      if ((this.currentSlide - 1) == 0) {
        document.getElementsByClassName("videos-prev-btn")[0].removeAttribute("style");
        document.getElementsByClassName("videos-prev-btn")[0].setAttribute("style", "opacity:0.3;");
        document.getElementsByClassName("videos-next-btn")[0].removeAttribute("style");
        document.getElementsByClassName("videos-next-btn")[0].setAttribute("style", "opacity:1;");
        document.getElementsByClassName("videos-prev-btn")[1].removeAttribute("style");
        document.getElementsByClassName("videos-prev-btn")[1].setAttribute("style", "opacity:0.3;");
        document.getElementsByClassName("videos-next-btn")[1].removeAttribute("style");
        document.getElementsByClassName("videos-next-btn")[1].setAttribute("style", "opacity:1;");
      } else {
        document.getElementsByClassName("videos-prev-btn")[0].removeAttribute("style");
        document.getElementsByClassName("videos-prev-btn")[0].setAttribute("style", "opacity:1;");
        document.getElementsByClassName("videos-next-btn")[0].removeAttribute("style");
        document.getElementsByClassName("videos-next-btn")[0].setAttribute("style", "opacity:1;");
        document.getElementsByClassName("videos-prev-btn")[1].removeAttribute("style");
        document.getElementsByClassName("videos-prev-btn")[1].setAttribute("style", "opacity:1;");
        document.getElementsByClassName("videos-next-btn")[1].removeAttribute("style");
        document.getElementsByClassName("videos-next-btn")[1].setAttribute("style", "opacity:1;");
      }
      if (this.coachVideoPathArr[(this.currentSlide - 1)] != null || this.coachVideoPathArr[(this.currentSlide - 1)] != "") {
        this.coachVideoPathStr = this.coachVideoPathArr[(this.currentSlide - 1)].replace('/maverick/Directory/Video/', AppConfig.SITE_URL + 'maverick/Directory/Video/');
      } else {
        this.coachVideoPathStr = "";
      }
      this.myVideo = this.video.nativeElement;
      this.myVideo.src = this.coachVideoPathStr;
      this.goToSlide(this.currentSlide - 1);
      this.videoPlay();
    }
  }

  goToSlide(n) {
    this.currentSlide = (n + this.coachVideoPathArr.length) % this.coachVideoPathArr.length;
  }

  openModal(pageName) {
    this.videoPause();
    let modal = this.modalCtrl.create(pageName, null, {
      cssClass: 'exercise-modal',
      enableBackdropDismiss: false
    });
    modal.present();
    modal.onDidDismiss(data => {
      if (data.slideAction == 'close') {
        console.log("Close");
      }
    });
  }

  goHome() {
    this.videoPause();
    this.navCtrl.setRoot("MenuPage");
  }

  showAbout() {
    this.openModal('MaverickMinutePopupPage');
  }

  goPage(pmPage) {
    this.videoPause();
    this.navCtrl.setRoot(pmPage);
  }

}
