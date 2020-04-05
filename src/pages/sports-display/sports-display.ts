import { Component, ElementRef, ViewChild } from '@angular/core';
import { Platform, ModalController, IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../config/config';
import { DataProvider } from '../../providers/data/data';
import { DatabaseProvider } from '../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-sports-display',
  templateUrl: 'sports-display.html',
})
export class SportsDisplayPage {
  unregisterBackButtonAction: any;
  slides: any = null;
  currentSlide: any = 0;
  imgPreview = 'assets/imgs/no_image.png';
  responseData: any;
  userDetails: any;
  sportsLists: any;
  sportsList: any = {
    "sportsName": "",
    "path": "",
    "imageVideoName": "",
    "description": "",
    "duration": "",
    "rest": "",
    "sets": "",
    "loads": "",
    "reps": ""
  };
  @ViewChild('video') video: ElementRef;
  private myVideo: HTMLVideoElement;
  @ViewChild('musicaudio') musicaudio: ElementRef;
  private musicAudio: HTMLAudioElement;
  userList: any;
  isPlaying: boolean = false;
  music_icon: any = 'assets/imgs/music_icon_gray.png';
  constructor(public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public databaseprovider: DatabaseProvider,
    public platform: Platform,
    public dataService: DataProvider) {
    this.databaseprovider.getDatabaseState();
    this.storage.get('userDetails')
      .then((res: any) => {
        if (res) {
          this.userDetails = res;
          this.checkuserMusic();
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

  videoPlay() {
    //console.log(this.myVideo);
    let isVideoPlaying = this.myVideo.currentTime > 0 && !this.myVideo.paused && !this.myVideo.ended && this.myVideo.readyState > 2;
    console.log("isVideoPlaying", isVideoPlaying);
    if (!isVideoPlaying) {
      this.myVideo.play();
    }
  }

  videoPause() {
    //console.log(this.myVideo);
    let isVideoPlaying = this.myVideo.currentTime > 0 && !this.myVideo.paused && !this.myVideo.ended && this.myVideo.readyState > 2;
    console.log("isVideoPlaying", isVideoPlaying);
    if (isVideoPlaying) {
      this.myVideo.pause();
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
    this.slides = document.querySelectorAll<HTMLElement>("#slides .slider");

    this.sportsLists = this.navParams.get('sportsList');
    console.log(this.sportsLists);
    if (this.sportsLists) {
      if (this.sportsLists[0].path != null || this.sportsLists[0].path != "") {
        if (this.sportsLists[0].fileType == '2') {
          document.getElementsByClassName("gif-image")[0].removeAttribute("style");
          document.getElementsByClassName("gif-image")[0].setAttribute("style", "visibility:hidden;width:0;height:0;float:left;");
          document.getElementsByClassName("video-image")[0].removeAttribute("style");
          document.getElementsByClassName("video-image")[0].setAttribute("style", "visibility:visible;");
          this.sportsList.path = (this.sportsLists[0].path).replace('/maverick/Directory/Video/', AppConfig.SITE_URL + 'maverick/Directory/Video/');
          this.myVideo = this.video.nativeElement;
          this.myVideo.src = this.sportsList.path;
          this.videoPlay();
        } else {
          document.getElementsByClassName("video-image")[0].removeAttribute("style");
          document.getElementsByClassName("video-image")[0].setAttribute("style", "visibility: hidden;width:0;height:0;float:left;");
          document.getElementsByClassName("gif-image")[0].removeAttribute("style");
          document.getElementsByClassName("gif-image")[0].setAttribute("style", "visibility: visible;");
          this.sportsList.path = (this.sportsLists[0].path).replace('/maverick/Directory/Image/', AppConfig.SITE_URL + 'maverick/Directory/Image/');
        }

      } else {
        this.sportsList.path = "";
      }
      if (this.sportsLists[0].sportsName == "Athletics"){
        this.sportsList.sportsName = "Maverick Stretches";
      } else {
        this.sportsList.sportsName = this.sportsLists[0].sportsName;
      }
      if ((this.sportsLists[0].duration) != null && (this.sportsLists[0].duration) != "") {
        this.sportsList.duration = (this.sportsLists[0].duration);
      } else {
        this.sportsList.duration = "-";
      }
      if ((this.sportsLists[0].rest) != null && (this.sportsLists[0].rest) != "") {
        this.sportsList.rest = (this.sportsLists[0].rest);
      } else {
        this.sportsList.rest = "-";
      }
      if ((this.sportsLists[0].sets) != null && (this.sportsLists[0].sets) != "") {
        this.sportsList.sets = (this.sportsLists[0].sets);
      } else {
        this.sportsList.sets = "-";
      }
      if ((this.sportsLists[0].loads) != null && (this.sportsLists[0].loads) != "") {
        this.sportsList.loads = (this.sportsLists[0].loads);
      } else {
        this.sportsList.loads = "-";
      }
      if ((this.sportsLists[0].reps) != null && (this.sportsLists[0].reps) != "") {
        this.sportsList.reps = (this.sportsLists[0].reps);
      } else {
        this.sportsList.reps = "-";
      }
      this.sportsList.imageVideoName = this.sportsLists[0].imageVideoName;
      if ((this.sportsLists[0].description) != null && (this.sportsLists[0].description) != "") {
        this.sportsList.description = (this.sportsLists[0].description).replace(/(?:\r\n|\r|\n)/g, '<br>');
      } else {
        this.sportsList.description = "";
      }
    }
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
    this.sportsList.path = "";
    console.log((this.currentSlide + 1) + " == " + this.sportsLists.length);
    if ((this.currentSlide + 1) == (this.sportsLists.length)) {
      //this.currentSlide = 0;
      this.openModal('ExercisePopupPage');
    } else {
      console.log("Curr", this.currentSlide + 1);
      if (this.sportsLists[(this.currentSlide + 1)].path != null || this.sportsLists[(this.currentSlide + 1)].path != "") {
        if (this.sportsLists[(this.currentSlide + 1)].fileType == '2') {
          document.getElementsByClassName("gif-image")[0].removeAttribute("style");
          document.getElementsByClassName("gif-image")[0].setAttribute("style", "visibility: hidden;width:0;height:0;float:left;");
          document.getElementsByClassName("video-image")[0].removeAttribute("style");
          document.getElementsByClassName("video-image")[0].setAttribute("style", "visibility: visible;");
          this.sportsList.path = (this.sportsLists[(this.currentSlide + 1)].path).replace('/maverick/Directory/Video/', AppConfig.SITE_URL + 'maverick/Directory/Video/');
          this.myVideo = this.video.nativeElement;
          this.myVideo.src = this.sportsList.path;
          this.videoPlay();
        } else {
          document.getElementsByClassName("video-image")[0].removeAttribute("style");
          document.getElementsByClassName("video-image")[0].setAttribute("style", "visibility: hidden;width:0;height:0;float:left;");
          document.getElementsByClassName("gif-image")[0].removeAttribute("style");
          document.getElementsByClassName("gif-image")[0].setAttribute("style", "visibility: visible;");
          this.sportsList.path = (this.sportsLists[(this.currentSlide + 1)].path).replace('/maverick/Directory/Image/', AppConfig.SITE_URL + 'maverick/Directory/Image/');
        }
      } else {
        this.sportsList.path = "";
      }
      if (this.sportsLists[(this.currentSlide + 1)].sportsName == "Athletics") {
        this.sportsList.sportsName = "Maverick Stretches";
      } else {
        this.sportsList.sportsName = this.sportsLists[(this.currentSlide + 1)].sportsName;
      }
      if ((this.sportsLists[(this.currentSlide + 1)].duration) != null && (this.sportsLists[(this.currentSlide + 1)].duration) != "") {
        this.sportsList.duration = (this.sportsLists[(this.currentSlide + 1)].duration);
      } else {
        this.sportsList.duration = "-";
      }
      if ((this.sportsLists[(this.currentSlide + 1)].rest) != null && (this.sportsLists[(this.currentSlide + 1)].rest) != "") {
        this.sportsList.rest = (this.sportsLists[(this.currentSlide + 1)].rest);
      } else {
        this.sportsList.rest = "-";
      }
      if ((this.sportsLists[(this.currentSlide + 1)].sets) != null && (this.sportsLists[(this.currentSlide + 1)].sets) != "") {
        this.sportsList.sets = (this.sportsLists[(this.currentSlide + 1)].sets);
      } else {
        this.sportsList.sets = "-";
      }
      if ((this.sportsLists[(this.currentSlide + 1)].loads) != null && (this.sportsLists[(this.currentSlide + 1)].loads) != "") {
        this.sportsList.loads = (this.sportsLists[(this.currentSlide + 1)].loads);
      } else {
        this.sportsList.loads = "-";
      }
      if ((this.sportsLists[(this.currentSlide + 1)].reps) != null && (this.sportsLists[(this.currentSlide + 1)].reps) != "") {
        this.sportsList.reps = (this.sportsLists[(this.currentSlide + 1)].reps);
      } else {
        this.sportsList.reps = "-";
      }
      this.sportsList.imageVideoName = this.sportsLists[(this.currentSlide + 1)].imageVideoName;
      if ((this.sportsLists[(this.currentSlide + 1)].description) != null && (this.sportsLists[(this.currentSlide + 1)].description) != "") {
        this.sportsList.description = (this.sportsLists[(this.currentSlide + 1)].description).replace(/(?:\r\n|\r|\n)/g, '<br>');
      } else {
        this.sportsList.description = "";
      }
      this.goToSlide(this.currentSlide + 1);
    }
  }

  prevSlide() {
    this.sportsList.path = "";
    console.log((this.currentSlide - 1) + " == " + this.sportsLists.length);
    if ((this.currentSlide) == 0) {
      //this.currentSlide = 0;
      console.log("Home Slide");
    } else {
      console.log("Curr", this.currentSlide - 1);
      if (this.sportsLists[(this.currentSlide - 1)].path != null || this.sportsLists[(this.currentSlide - 1)].path != "") {
        if (this.sportsLists[(this.currentSlide - 1)].fileType == '2') {
          document.getElementsByClassName("gif-image")[0].removeAttribute("style");
          document.getElementsByClassName("gif-image")[0].setAttribute("style", "visibility: hidden;width:0;height:0;float:left;");
          document.getElementsByClassName("video-image")[0].removeAttribute("style");
          document.getElementsByClassName("video-image")[0].setAttribute("style", "visibility: visible;");
          this.sportsList.path = (this.sportsLists[(this.currentSlide - 1)].path).replace('/maverick/Directory/Video/', AppConfig.SITE_URL + 'maverick/Directory/Video/');
          this.myVideo = this.video.nativeElement;
          this.myVideo.src = this.sportsList.path;
          this.videoPlay();
        } else {
          document.getElementsByClassName("video-image")[0].removeAttribute("style");
          document.getElementsByClassName("video-image")[0].setAttribute("style", "visibility: hidden;width:0;height:0;float:left;");
          document.getElementsByClassName("gif-image")[0].removeAttribute("style");
          document.getElementsByClassName("gif-image")[0].setAttribute("style", "visibility: visible;");
          this.sportsList.path = (this.sportsLists[(this.currentSlide - 1)].path).replace('/maverick/Directory/Image/', AppConfig.SITE_URL + 'maverick/Directory/Image/');
        }
      } else {
        this.sportsList.path = "";
      }
      if (this.sportsLists[(this.currentSlide - 1)].sportsName == "Athletics") {
        this.sportsList.sportsName = "Maverick Stretches";
      } else {
        this.sportsList.sportsName = this.sportsLists[(this.currentSlide - 1)].sportsName;
      }
      if ((this.sportsLists[(this.currentSlide - 1)].duration) != null && (this.sportsLists[(this.currentSlide - 1)].duration) != "") {
        this.sportsList.duration = (this.sportsLists[(this.currentSlide - 1)].duration);
      } else {
        this.sportsList.duration = "-";
      }
      if ((this.sportsLists[(this.currentSlide - 1)].rest) != null && (this.sportsLists[(this.currentSlide - 1)].rest) != "") {
        this.sportsList.rest = (this.sportsLists[0].rest);
      } else {
        this.sportsList.rest = "-";
      }
      if ((this.sportsLists[(this.currentSlide - 1)].sets) != null && (this.sportsLists[(this.currentSlide - 1)].sets) != "") {
        this.sportsList.sets = (this.sportsLists[(this.currentSlide - 1)].sets);
      } else {
        this.sportsList.sets = "-";
      }
      if ((this.sportsLists[(this.currentSlide - 1)].loads) != null && (this.sportsLists[(this.currentSlide - 1)].loads) != "") {
        this.sportsList.loads = (this.sportsLists[(this.currentSlide - 1)].loads);
      } else {
        this.sportsList.loads = "-";
      }
      if ((this.sportsLists[(this.currentSlide - 1)].reps) != null && (this.sportsLists[(this.currentSlide - 1)].reps) != "") {
        this.sportsList.reps = (this.sportsLists[(this.currentSlide - 1)].reps);
      } else {
        this.sportsList.reps = "-";
      }
      this.sportsList.imageVideoName = this.sportsLists[(this.currentSlide - 1)].imageVideoName;
      if ((this.sportsLists[(this.currentSlide - 1)].description) != null && (this.sportsLists[(this.currentSlide - 1)].description) != "") {
        this.sportsList.description = (this.sportsLists[(this.currentSlide - 1)].description).replace(/(?:\r\n|\r|\n)/g, '<br>');
      } else {
        this.sportsList.description = "";
      }
      this.goToSlide(this.currentSlide - 1);
    }
  }

  goToSlide(n) {
    this.currentSlide = (n + this.sportsLists.length) % this.sportsLists.length;
  }

  openModal(pageName) {
    let modal = this.modalCtrl.create(pageName, null, {
      cssClass: 'exercise-modal',
      enableBackdropDismiss: false
    });
    modal.present();
    modal.onDidDismiss(data => {
      if (data.slideAction == 'finish') {
        // if (this.navCtrl.canGoBack()) {
        //   this.navCtrl.pop();
        // } else {
        this.dataService.markStarForStudent(this.userDetails, 11).then((result) => {
          this.responseData = result;
          console.log(this.responseData.starList);
          if (this.responseData.returnStatus != 0) {
            this.navCtrl.setRoot("StarRatingPage", { "starList": this.responseData.starList });
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
        // }
      } else if (data.slideAction == 'repeat') {
        this.initializeBackButtonCustomHandler();
        if (this.sportsLists[0].path != null || this.sportsLists[0].path != "") {
          if (this.sportsLists[0].fileType == '2') {
            document.getElementsByClassName("gif-image")[0].removeAttribute("style");
            document.getElementsByClassName("gif-image")[0].setAttribute("style", "visibility: hidden;width:0;height:0;float:left;");
            document.getElementsByClassName("video-image")[0].removeAttribute("style");
            document.getElementsByClassName("video-image")[0].setAttribute("style", "visibility: visible;");
            this.sportsList.path = (this.sportsLists[0].path).replace('/maverick/Directory/Video/', AppConfig.SITE_URL + 'maverick/Directory/Video/');
            this.myVideo = this.video.nativeElement;
            this.myVideo.src = this.sportsList.path;
            this.videoPlay();
          } else {
            document.getElementsByClassName("video-image")[0].removeAttribute("style");
            document.getElementsByClassName("video-image")[0].setAttribute("style", "visibility: hidden;width:0;height:0;float:left;");
            document.getElementsByClassName("gif-image")[0].removeAttribute("style");
            document.getElementsByClassName("gif-image")[0].setAttribute("style", "visibility: visible;");
            this.sportsList.path = (this.sportsLists[0].path).replace('/maverick/Directory/Image/', AppConfig.SITE_URL + 'maverick/Directory/Image/');
          }
        } else {
          this.sportsList.path = "";
        }
        if (this.sportsLists[0].sportsName == "Athletics") {
          this.sportsList.sportsName = "Maverick Stretches";
        } else {
          this.sportsList.sportsName = this.sportsLists[0].sportsName;
        }
        if ((this.sportsLists[0].duration) != null && (this.sportsLists[0].duration) != "") {
          this.sportsList.duration = (this.sportsLists[0].duration);
        } else {
          this.sportsList.duration = "-";
        }
        if ((this.sportsLists[0].rest) != null && (this.sportsLists[0].rest) != "") {
          this.sportsList.rest = (this.sportsLists[0].rest);
        } else {
          this.sportsList.rest = "-";
        }
        if ((this.sportsLists[0].sets) != null && (this.sportsLists[0].sets) != "") {
          this.sportsList.sets = (this.sportsLists[0].sets);
        } else {
          this.sportsList.sets = "-";
        }
        if ((this.sportsLists[0].loads) != null && (this.sportsLists[0].loads) != "") {
          this.sportsList.loads = (this.sportsLists[0].loads);
        } else {
          this.sportsList.loads = "-";
        }
        if ((this.sportsLists[0].reps) != null && (this.sportsLists[0].reps) != "") {
          this.sportsList.reps = (this.sportsLists[0].reps);
        } else {
          this.sportsList.reps = "-";
        }
        this.sportsList.imageVideoName = this.sportsLists[0].imageVideoName;
        if ((this.sportsLists[0].description) != null && (this.sportsLists[0].description) != "") {
          this.sportsList.description = (this.sportsLists[0].description).replace(/(?:\r\n|\r|\n)/g, '<br>');
        } else {
          this.sportsList.description = "";
        }
        this.goToSlide(this.currentSlide + 1);
      } else if (data.slideAction == 'close') {
        console.log("Close");
      }
    });
  }
  goHome() {
    this.navCtrl.setRoot("SportsSelectPage");
  }

  goPage(pmPage) {
    this.navCtrl.setRoot(pmPage);
  }

  playMusic() {
    console.log("playMusic clicked");
    this.toggleAudio();
  }
}
