import { Component, ElementRef, ViewChild } from '@angular/core';
import { Platform, ModalController, IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../config/config';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-physical-literacy',
  templateUrl: 'physical-literacy.html',
})
export class PhysicalLiteracyPage {
  unregisterBackButtonAction: any;
  slides: any = null;
  currentSlide: any = 0;
  imgPreview = 'assets/imgs/no_image.png';
  isPlaying: boolean = false;
  isSpeaking: boolean = false;
  showVideoTag: boolean = true;
  responseData: any;
  userDetails: any;
  exerciseLists: any;
  exerciseList: any = { "insAudioPath": "", "audioPath": "", "exercisePath": "", "imageVideoName": "", "exerciseDescription": "", "tutorialTitle": "", "tutorialCode": "" };
  @ViewChild('video') video: ElementRef;
  private myVideo: HTMLVideoElement;
  tutorialData = {
    "tutorialCode": ""
  }
  tutorials: any = [];
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
          this.getPhysicalLiteracydetails();
        }
      });
  }

  onSelectTutorial(selectedval) {
    console.log('selectedval', selectedval);
    this.tutorialData.tutorialCode = selectedval;
    this.getPhysicalLiteracydetails();
  }

  getPhysicalLiteracydetails() {
    let loader = this.loadingCtrl.create({
      spinner: 'ios',
      content: ''
    });
    loader.present();
    this.dataService.getPhysicalLiteracydetails(this.userDetails).then((result) => {

      this.responseData = result;
      console.log(this.responseData);
      if (this.responseData.returnStatus != 0) {
        if (this.responseData.physicalLiteracyList) {
          loader.dismiss();
          this.exerciseLists = this.responseData.physicalLiteracyList;
          console.log(this.exerciseLists);
          if (this.exerciseLists) {
            if (this.exerciseLists.length > 1) {
              let previousIcon = document.getElementsByClassName('previousIcon');
              for (let i = 0; i < previousIcon.length; ++i) {
                let item = previousIcon[i];
                item.setAttribute("style", "opacity:0.3;");
              }
              let nextIcon = document.getElementsByClassName('nextIcon');
              for (let i = 0; i < nextIcon.length; ++i) {
                let item = nextIcon[i];
                item.setAttribute("style", "opacity:1;");
              }
            } else {
              let previousIcon = document.getElementsByClassName('previousIcon');
              for (let i = 0; i < previousIcon.length; ++i) {
                let item = previousIcon[i];
                item.setAttribute("style", "opacity:0.3;");
              }
              let nextIcon = document.getElementsByClassName('nextIcon');
              for (let i = 0; i < nextIcon.length; ++i) {
                let item = nextIcon[i];
                item.setAttribute("style", "opacity:0.3;");
              }
            }
            if (this.exerciseLists[0].fileType == '2') {
              if (this.exerciseLists[0].exercisePath != null || this.exerciseLists[0].exercisePath != "") {
                this.exerciseList.exercisePath = (this.exerciseLists[0].exercisePath).replace('/maverick/Directory/Video/', AppConfig.SITE_URL + 'maverick/Directory/Video/');
              } else {
                this.exerciseList.exercisePath = "";
              }
              this.myVideo = this.video.nativeElement;
              this.myVideo.src = this.exerciseList.exercisePath;
              this.showVideoTag = true;
              let cusid_ele = document.getElementsByClassName('excercise-video');
              for (let i = 0; i < cusid_ele.length; ++i) {
                let item = cusid_ele[i];
                item.setAttribute("style", "visibility:visible;");
              }
            } else {
              if (this.exerciseLists[0].exercisePath != null || this.exerciseLists[0].exercisePath != "") {
                this.exerciseList.exercisePath = (this.exerciseLists[0].exercisePath).replace('/maverick/Directory/Image/', AppConfig.SITE_URL + 'maverick/Directory/Image/');
              } else {
                this.exerciseList.exercisePath = "";
              }
              this.showVideoTag = false;
              this.myVideo = this.video.nativeElement;
              this.myVideo.src = this.exerciseList.exercisePath;
              let cusid_ele = document.getElementsByClassName('excercise-video');
              for (let i = 0; i < cusid_ele.length; ++i) {
                let item = cusid_ele[i];
                item.setAttribute("style", "visibility:hidden;height:0;");
              }
            }
            this.exerciseList.imageVideoName = this.exerciseLists[0].imageVideoName;
            if ((this.exerciseLists[0].exerciseDescription) != null && (this.exerciseLists[0].exerciseDescription) != "") {
              this.exerciseList.exerciseDescription = (this.exerciseLists[0].exerciseDescription).replace(/(?:\r\n|\r|\n)/g, '<br>');
            } else {
              this.exerciseList.exerciseDescription = "";
            }
            if (this.exerciseLists[0].tutorialTitle != null || this.exerciseLists[0].tutorialTitle != "") {
              this.exerciseList.tutorialTitle = (this.exerciseLists[0].tutorialTitle);
            } else {
              this.exerciseList.tutorialTitle = "";
            }
            if (this.exerciseLists[0].tutorialCode != null || this.exerciseLists[0].tutorialCode != "") {
              this.exerciseList.tutorialCode = (this.exerciseLists[0].tutorialCode);
            } else {
              this.exerciseList.tutorialCode = "";
            }
            if (this.exerciseLists[0].videoCode != null || this.exerciseLists[0].videoCode != "") {
              this.dataService.updatePhysicalLiteracycount(this.userDetails, this.exerciseLists[0].videoCode).then((result) => {
                console.log(result);
              }, (err) => {
                console.log(err);
              });
            }
            this.videoPlay();
          }
        }
      } else if (this.responseData.returnStatus == 0) {
        console.log('returnStatus=>0');
        loader.dismiss();
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
    this.slides = document.querySelectorAll<HTMLElement>("#slides .slider");
    var videos = document.getElementById('videos');
    videos.addEventListener('play', () => {
    }, false);
    videos.addEventListener('pause', () => {
    }, false);
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
    //this.exerciseList.exercisePath = "";
    console.log((this.currentSlide + 1) + " == " + this.exerciseLists.length);
    if ((this.currentSlide + 1) == (this.exerciseLists.length) || (this.currentSlide + 1) == (this.exerciseLists.length - 1)) {
      let nextIcon = document.getElementsByClassName('nextIcon');
      for (let i = 0; i < nextIcon.length; ++i) {
        let item = nextIcon[i];
        item.setAttribute("style", "opacity:0.3;");
      }
      let previousIcon = document.getElementsByClassName('previousIcon');
      for (let i = 0; i < previousIcon.length; ++i) {
        let item = previousIcon[i];
        item.setAttribute("style", "opacity:1;");
      }
    } else {
      let nextIcon = document.getElementsByClassName('nextIcon');
      for (let i = 0; i < nextIcon.length; ++i) {
        let item = nextIcon[i];
        item.setAttribute("style", "opacity:1;");
      }
      let previousIcon = document.getElementsByClassName('previousIcon');
      for (let i = 0; i < previousIcon.length; ++i) {
        let item = previousIcon[i];
        item.setAttribute("style", "opacity:1;");
      }
    }
    if ((this.currentSlide + 1) == (this.exerciseLists.length)) {
      //this.currentSlide = 0;
      this.storage.get('userDetails')
        .then((res: any) => {
          if (res) {
            if (res.className == "IX" || res.className == "X" || res.className == "XI" || res.className == "XII") {
              console.log('last slide');
            } else {
              this.openModal('ExercisePopupPage');
            }
          }
        });
    } else {
      console.log("Curr", this.currentSlide + 1);
      if (this.exerciseLists[(this.currentSlide + 1)].fileType == '2') {
        if (this.exerciseLists[(this.currentSlide + 1)].exercisePath != null && this.exerciseLists[(this.currentSlide + 1)].exercisePath != "") {
          this.exerciseList.exercisePath = (this.exerciseLists[(this.currentSlide + 1)].exercisePath).replace('/maverick/Directory/Video/', AppConfig.SITE_URL + 'maverick/Directory/Video/');
        } else {
          this.exerciseList.exercisePath = "";
        }
        this.myVideo = this.video.nativeElement;
        this.myVideo.src = this.exerciseList.exercisePath;
        this.showVideoTag = true;
        let cusid_ele = document.getElementsByClassName('excercise-video');
        for (let i = 0; i < cusid_ele.length; ++i) {
          let item = cusid_ele[i];
          item.setAttribute("style", "visibility:visible;");
        }
      } else {
        if (this.exerciseLists[(this.currentSlide + 1)].exercisePath != null || this.exerciseLists[(this.currentSlide + 1)].exercisePath != "") {
          this.exerciseList.exercisePath = (this.exerciseLists[(this.currentSlide + 1)].exercisePath).replace('/maverick/Directory/Image/', AppConfig.SITE_URL + 'maverick/Directory/Image/');
        } else {
          this.exerciseList.exercisePath = "";
        }
        this.showVideoTag = false;
        this.myVideo = this.video.nativeElement;
        this.myVideo.src = this.exerciseList.exercisePath;
        let cusid_ele = document.getElementsByClassName('excercise-video');
        for (let i = 0; i < cusid_ele.length; ++i) {
          let item = cusid_ele[i];
          item.setAttribute("style", "visibility:hidden;height:0;");
        }
      }
      this.exerciseList.imageVideoName = this.exerciseLists[(this.currentSlide + 1)].imageVideoName;
      console.log("desc=>", (this.exerciseLists[(this.currentSlide + 1)].exerciseDescription));
      if ((this.exerciseLists[(this.currentSlide + 1)].exerciseDescription) != null && (this.exerciseLists[(this.currentSlide + 1)].exerciseDescription) != "") {
        this.exerciseList.exerciseDescription = (this.exerciseLists[(this.currentSlide + 1)].exerciseDescription).replace(/(?:\r\n|\r|\n)/g, '<br>');
      } else {
        this.exerciseList.exerciseDescription = "";
      }
      if (this.exerciseLists[(this.currentSlide + 1)].tutorialTitle != null || this.exerciseLists[(this.currentSlide + 1)].tutorialTitle != "") {
        this.exerciseList.tutorialTitle = (this.exerciseLists[(this.currentSlide + 1)].tutorialTitle);
      } else {
        this.exerciseList.tutorialTitle = "";
      }
      if (this.exerciseLists[(this.currentSlide + 1)].tutorialCode != null || this.exerciseLists[(this.currentSlide + 1)].tutorialCode != "") {
        this.exerciseList.tutorialCode = (this.exerciseLists[(this.currentSlide + 1)].tutorialCode);
      } else {
        this.exerciseList.tutorialCode = "";
      }
      if (this.exerciseLists[(this.currentSlide + 1)].videoCode != null || this.exerciseLists[(this.currentSlide + 1)].videoCode != "") {
        this.dataService.updatePhysicalLiteracycount(this.userDetails, this.exerciseLists[(this.currentSlide + 1)].videoCode).then((result) => {
          console.log(result);
        }, (err) => {
          console.log(err);
        });
      } 
      this.goToSlide(this.currentSlide + 1);
      this.videoPlay();
    }
  }

  prevSlide() {
    //this.exerciseList.exercisePath = "";
    console.log((this.currentSlide - 1) + " == " + this.exerciseLists.length);
    if ((this.currentSlide) == 0 || (this.currentSlide) == 1) {
      let previousIcon = document.getElementsByClassName('previousIcon');
      for (let i = 0; i < previousIcon.length; ++i) {
        let item = previousIcon[i];
        item.setAttribute("style", "opacity:0.3;");
      }
      let nextIcon = document.getElementsByClassName('nextIcon');
      for (let i = 0; i < nextIcon.length; ++i) {
        let item = nextIcon[i];
        item.setAttribute("style", "opacity:1;");
      }
    } else {
      let previousIcon = document.getElementsByClassName('previousIcon');
      for (let i = 0; i < previousIcon.length; ++i) {
        let item = previousIcon[i];
        item.setAttribute("style", "opacity:1;");
      }
      let nextIcon = document.getElementsByClassName('nextIcon');
      for (let i = 0; i < nextIcon.length; ++i) {
        let item = nextIcon[i];
        item.setAttribute("style", "opacity:1;");
      }
    }
    if ((this.currentSlide) == 0) {
      console.log("Home Slide");
    } else {
      console.log("Curr", this.currentSlide - 1);
      if (this.exerciseLists[(this.currentSlide - 1)].fileType == '2') {
        if (this.exerciseLists[(this.currentSlide - 1)].exercisePath != null && this.exerciseLists[(this.currentSlide - 1)].exercisePath != "") {
          this.exerciseList.exercisePath = (this.exerciseLists[(this.currentSlide - 1)].exercisePath).replace('/maverick/Directory/Video/', AppConfig.SITE_URL + 'maverick/Directory/Video/');
        } else {
          this.exerciseList.exercisePath = "";
        }
        this.myVideo = this.video.nativeElement;
        this.myVideo.src = this.exerciseList.exercisePath;
        this.showVideoTag = true;
        let cusid_ele = document.getElementsByClassName('excercise-video');
        for (let i = 0; i < cusid_ele.length; ++i) {
          let item = cusid_ele[i];
          item.setAttribute("style", "visibility:visible;");
        }
      } else {
        if (this.exerciseLists[(this.currentSlide - 1)].exercisePath != null || this.exerciseLists[(this.currentSlide - 1)].exercisePath != "") {
          this.exerciseList.exercisePath = (this.exerciseLists[(this.currentSlide - 1)].exercisePath).replace('/maverick/Directory/Image/', AppConfig.SITE_URL + 'maverick/Directory/Image/');
        } else {
          this.exerciseList.exercisePath = "";
        }
        this.showVideoTag = false;
        this.myVideo = this.video.nativeElement;
        this.myVideo.src = this.exerciseList.exercisePath;
        let cusid_ele = document.getElementsByClassName('excercise-video');
        for (let i = 0; i < cusid_ele.length; ++i) {
          let item = cusid_ele[i];
          item.setAttribute("style", "visibility:hidden;height:0;");
        }
      }
      this.exerciseList.imageVideoName = this.exerciseLists[(this.currentSlide - 1)].imageVideoName;
      if ((this.exerciseLists[(this.currentSlide - 1)].exerciseDescription) != null && (this.exerciseLists[(this.currentSlide - 1)].exerciseDescription) != "") {
        this.exerciseList.exerciseDescription = (this.exerciseLists[(this.currentSlide - 1)].exerciseDescription).replace(/(?:\r\n|\r|\n)/g, '<br>');
      } else {
        this.exerciseList.exerciseDescription = "";
      }
      if (this.exerciseLists[(this.currentSlide - 1)].tutorialTitle != null || this.exerciseLists[(this.currentSlide - 1)].tutorialTitle != "") {
        this.exerciseList.tutorialTitle = (this.exerciseLists[(this.currentSlide - 1)].tutorialTitle);
      } else {
        this.exerciseList.tutorialTitle = "";
      }
      if (this.exerciseLists[(this.currentSlide - 1)].tutorialCode != null || this.exerciseLists[(this.currentSlide - 1)].tutorialCode != "") {
        this.exerciseList.tutorialCode = (this.exerciseLists[(this.currentSlide - 1)].tutorialCode);
      } else {
        this.exerciseList.tutorialCode = "";
      }

      if (this.exerciseLists[(this.currentSlide - 1)].videoCode != null || this.exerciseLists[(this.currentSlide - 1)].videoCode != "") {
        this.dataService.updatePhysicalLiteracycount(this.userDetails, this.exerciseLists[(this.currentSlide - 1)].videoCode).then((result) => {
          console.log(result);
        }, (err) => {
          console.log(err);
        });
      } 
      this.goToSlide(this.currentSlide - 1);
      this.videoPlay();
    }
  }

  goToSlide(n) {
    //this.slides[this.currentSlide].className = 'slider';
    this.currentSlide = (n + this.exerciseLists.length) % this.exerciseLists.length;
    //this.slides[this.currentSlide].className = 'slider showing';
  }

  openModal(pageName) {
    this.videoPause();
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
        this.dataService.markStarForStudent(this.userDetails, 12).then((result) => {
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
        if (this.exerciseLists[0].fileType == '2') {
          if (this.exerciseLists[0].exercisePath != null || this.exerciseLists[0].exercisePath != "") {
            this.exerciseList.exercisePath = (this.exerciseLists[0].exercisePath).replace('/maverick/Directory/Video/', AppConfig.SITE_URL + 'maverick/Directory/Video/');
          } else {
            this.exerciseList.exercisePath = "";
          }
          this.myVideo = this.video.nativeElement;
          this.myVideo.src = this.exerciseList.exercisePath;
          this.showVideoTag = true;
          let cusid_ele = document.getElementsByClassName('excercise-video');
          for (let i = 0; i < cusid_ele.length; ++i) {
            let item = cusid_ele[i];
            item.setAttribute("style", "visibility:visible;");
          }
        } else {
          if (this.exerciseLists[0].exercisePath != null || this.exerciseLists[0].exercisePath != "") {
            this.exerciseList.exercisePath = (this.exerciseLists[0].exercisePath).replace('/maverick/Directory/Image/', AppConfig.SITE_URL + 'maverick/Directory/Image/');
          } else {
            this.exerciseList.exercisePath = "";
          }
          this.showVideoTag = false;
          this.myVideo = this.video.nativeElement;
          this.myVideo.src = this.exerciseList.exercisePath;
          let cusid_ele = document.getElementsByClassName('excercise-video');
          for (let i = 0; i < cusid_ele.length; ++i) {
            let item = cusid_ele[i];
            item.setAttribute("style", "visibility:hidden;height:0;");
          }
        }
        this.exerciseList.imageVideoName = this.exerciseLists[0].imageVideoName;
        if ((this.exerciseLists[0].exerciseDescription) != null && (this.exerciseLists[0].exerciseDescription) != "") {
          this.exerciseList.exerciseDescription = (this.exerciseLists[0].exerciseDescription).replace(/(?:\r\n|\r|\n)/g, '<br>');
        } else {
          this.exerciseList.exerciseDescription = "";
        }
        if (this.exerciseLists[0].tutorialTitle != null || this.exerciseLists[0].tutorialTitle != "") {
          this.exerciseList.tutorialTitle = (this.exerciseLists[0].tutorialTitle);
        } else {
          this.exerciseList.tutorialTitle = "";
        }
        if (this.exerciseLists[0].tutorialCode != null || this.exerciseLists[0].tutorialCode != "") {
          this.exerciseList.tutorialCode = (this.exerciseLists[0].tutorialCode);
        } else {
          this.exerciseList.tutorialCode = "";
        }
        this.goToSlide(this.currentSlide + 1);
        this.videoPlay();
      } else if (data.slideAction == 'close') {
        console.log("Close");
      }
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
