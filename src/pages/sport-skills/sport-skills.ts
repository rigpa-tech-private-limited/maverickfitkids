import { Component, ElementRef, ViewChild } from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import {
  Platform,
  ModalController,
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  LoadingController,
} from "ionic-angular";
import { Storage } from "@ionic/storage";
import { AppConfig } from "../../config/config";
import { DataProvider } from "../../providers/data/data";

@IonicPage()
@Component({
  selector: "page-sport-skills",
  templateUrl: "sport-skills.html",
  animations: [
    trigger("shift", [
      state(
        "previous",
        style({
          opacity: 0,
          transform: "translateX(-100%)",
          "-webkit-transform": "-webkit-translateX(-100%)",
        })
      ),
      state(
        "current",
        style({
          opacity: 1,
          transform: "translateX(0%)",
          "-webkit-transform": "-webkit-translateX(0%)",
        })
      ),
      state(
        "next",
        style({
          opacity: 0,
          transform: "translateX(100%)",
          "-webkit-transform": "-webkit-translateX(100%)",
        })
      ),
      transition("* => *", animate(".5s")),
    ]),
  ],
})
export class SportSkillsPage {
  unregisterBackButtonAction: any;
  @ViewChild("insaudio") insaudio: ElementRef;
  @ViewChild("musicaudio") musicaudio: ElementRef;
  slides: any = null;
  currentSlide: any = 0;
  imgPreview = "assets/imgs/no_image.png";
  isPlaying: boolean = false;
  isSpeaking: boolean = false;
  showVideoTag: boolean = true;
  responseData: any;
  userDetails: any;
  exerciseLists: any = [];
  audio: any;
  instruction_icon: any = "assets/imgs/instruction_icon_gray.png";
  music_icon: any = "assets/imgs/music_icon_gray.png";
  exerciseList: any = {
    insAudioPath: "",
    audioPath: "",
    exercisePath: "",
    imageVideoName: "",
    exerciseDescription: "",
  };
  @ViewChild("video") video: ElementRef;
  private myVideo: HTMLVideoElement;
  private insAudio: HTMLAudioElement;
  private musicAudio: HTMLAudioElement;
  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public dataService: DataProvider
  ) {
    this.storage.get("userDetails").then((res: any) => {
      if (res) {
        this.userDetails = res;
        console.log(this.userDetails);
        let loader = this.loadingCtrl.create({
          spinner: "ios",
          content: "",
        });
        loader.present();
        console.log("test");
        this.dataService.getStudentSportSkillsDetails(this.userDetails).then(
          (result) => {
            loader.dismiss();
            this.responseData = result;
            console.log(this.responseData);
            if (
              this.responseData.returnStatus != 0 &&
              this.responseData.skillsList != null
            ) {
              this.exerciseLists = this.responseData.skillsList;
              if (this.exerciseLists.length > 0) {
                let cusid_ele = document.getElementsByClassName(
                  "everyday-exercise-container"
                );
                for (let i = 0; i < cusid_ele.length; ++i) {
                  let item = cusid_ele[i];
                  item.setAttribute("style", "opacity: 1;");
                }
                if (
                  this.exerciseLists[0].insAudioPath != null &&
                  this.exerciseLists[0].insAudioPath != ""
                ) {
                  this.exerciseList.insAudioPath =
                    this.exerciseLists[0].insAudioPath.replace(
                      "/maverick/Directory/Music/",
                      AppConfig.SITE_URL + "maverick/Directory/Music/"
                    );
                  this.instruction_icon =
                    "assets/imgs/instruction_icon_play.png";
                } else {
                  this.exerciseList.insAudioPath = "";
                  this.instruction_icon =
                    "assets/imgs/instruction_icon_gray.png";
                }
                this.insAudio = this.insaudio.nativeElement;
                this.insAudio.src = this.exerciseList.insAudioPath;
                if (
                  this.exerciseLists[0].audioPath != null &&
                  this.exerciseLists[0].audioPath != ""
                ) {
                  this.exerciseList.audioPath =
                    this.exerciseLists[0].audioPath.replace(
                      "/maverick/Directory/Music/",
                      AppConfig.SITE_URL + "maverick/Directory/Music/"
                    );
                  this.music_icon = "assets/imgs/music_icon_play.png";
                } else {
                  console.log("1--", this.exerciseLists[0].audioPath);
                  this.exerciseList.audioPath = "";
                  this.music_icon = "assets/imgs/music_icon_gray.png";
                }
                console.log(this.music_icon);
                this.musicAudio = this.musicaudio.nativeElement;
                this.musicAudio.src = this.exerciseList.audioPath;

                if (this.exerciseLists[0].fileType == "2") {
                  if (
                    this.exerciseLists[0].exercisePath != null ||
                    this.exerciseLists[0].exercisePath != ""
                  ) {
                    this.exerciseList.exercisePath =
                      this.exerciseLists[0].exercisePath.replace(
                        "/maverick/Directory/Video/",
                        AppConfig.SITE_URL + "maverick/Directory/Video/"
                      );
                  } else {
                    this.exerciseList.exercisePath = "";
                  }
                  this.myVideo = this.video.nativeElement;
                  this.myVideo.src = this.exerciseList.exercisePath;
                  this.showVideoTag = true;
                  let cusid_ele =
                    document.getElementsByClassName("excercise-video");
                  for (let i = 0; i < cusid_ele.length; ++i) {
                    let item = cusid_ele[i];
                    item.setAttribute("style", "visibility:visible;");
                  }
                } else {
                  if (
                    this.exerciseLists[0].exercisePath != null ||
                    this.exerciseLists[0].exercisePath != ""
                  ) {
                    this.exerciseList.exercisePath =
                      this.exerciseLists[0].exercisePath.replace(
                        "/maverick/Directory/Image/",
                        AppConfig.SITE_URL + "maverick/Directory/Image/"
                      );
                  } else {
                    this.exerciseList.exercisePath = "";
                  }
                  this.showVideoTag = false;
                  this.myVideo = this.video.nativeElement;
                  this.myVideo.src = this.exerciseList.exercisePath;
                  let cusid_ele =
                    document.getElementsByClassName("excercise-video");
                  for (let i = 0; i < cusid_ele.length; ++i) {
                    let item = cusid_ele[i];
                    item.setAttribute("style", "visibility:hidden;height:0;");
                  }
                }
                this.exerciseList.imageVideoName =
                  this.exerciseLists[0].imageVideoName;
                if (this.exerciseLists[0].exerciseDescription != null) {
                  this.exerciseList.exerciseDescription =
                    this.exerciseLists[0].exerciseDescription.replace(
                      /(?:\r\n|\r|\n)/g,
                      "<br>"
                    );
                } else {
                  this.exerciseList.exerciseDescription = "";
                }
                this.videoPlay();
              }
            } else if (this.responseData.returnStatus == 0) {
              let cusid_ele = document.getElementsByClassName(
                "everyday-exercise-container"
              );
              for (let i = 0; i < cusid_ele.length; ++i) {
                let item = cusid_ele[i];
                item.setAttribute("style", "opacity: 0;");
              }
              console.log("returnStatus=>0");
              const alert = this.alertCtrl.create({
                message: this.responseData.returnMessage,
                buttons: [
                  {
                    text: "Ok",
                    handler: () => {
                      this.navCtrl.setRoot("MenuPage");
                    },
                  },
                ],
                enableBackdropDismiss: false,
              });
              alert.present();
            }
          },
          (err) => {
            console.log(err);
            loader.dismiss();
            const alert = this.alertCtrl.create({
              message: AppConfig.API_ERROR,
              buttons: [
                {
                  text: "Ok",
                  handler: () => {
                    this.navCtrl.setRoot("MenuPage");
                  },
                },
              ],
            });
            alert.present();
          }
        );
      }
    });
  }

  videoPause() {
    if (this.exerciseLists.length > 0) {
      //console.log(this.myVideo);
      let isVideoPlaying =
        this.myVideo.currentTime > 0 &&
        !this.myVideo.paused &&
        !this.myVideo.ended &&
        this.myVideo.readyState > 2;
      console.log("isVideoPlaying", isVideoPlaying);
      if (isVideoPlaying) {
        this.myVideo.pause();
      }
    }
  }

  videoPlay() {
    if (this.exerciseLists.length > 0) {
      //console.log(this.myVideo);
      let isVideoPlaying =
        this.myVideo.currentTime > 0 &&
        !this.myVideo.paused &&
        !this.myVideo.ended &&
        this.myVideo.readyState > 2;
      console.log("isVideoPlaying", isVideoPlaying);
      if (!isVideoPlaying) {
        this.myVideo.play();
      }
    }
  }

  toggleTTS() {
    if (this.exerciseLists.length > 0) {
      if (
        this.exerciseList.insAudioPath != null &&
        this.exerciseList.insAudioPath != ""
      ) {
        if (this.isSpeaking) {
          this.stopSpeak();
        } else {
          this.startSpeak();
        }
      }
      console.log("isSpeaking", this.isSpeaking);
    }
  }

  startSpeak() {
    if (this.exerciseLists.length > 0) {
      //this.videoPause();
      this.stopAudio();
      console.log(this.exerciseList.insAudioPath);
      this.instruction_icon = "assets/imgs/instruction_icon_pause.png";
      this.isSpeaking = true;
      this.insAudio.play();
    }
  }

  stopSpeak() {
    if (this.exerciseLists.length > 0) {
      if (this.insAudio) {
        this.insAudio.pause();
        this.insAudio.currentTime = 0;
      }
      this.isSpeaking = false;
      if (
        this.exerciseList.insAudioPath != null &&
        this.exerciseList.insAudioPath != ""
      ) {
        this.instruction_icon = "assets/imgs/instruction_icon_play.png";
      }
    }
  }

  toggleAudio() {
    if (this.exerciseLists.length > 0) {
      if (
        this.exerciseList.audioPath != null &&
        this.exerciseList.audioPath != ""
      ) {
        if (this.isPlaying) {
          this.stopAudio();
        } else {
          this.startAudio();
        }
      }
      console.log("isPlaying", this.isPlaying);
    }
  }

  startAudio() {
    if (this.exerciseLists.length > 0) {
      //this.videoPause();
      this.stopSpeak();
      console.log(this.exerciseList.audioPath);
      this.music_icon = "assets/imgs/music_icon_pause.png";
      this.isPlaying = true;
      this.musicAudio.play();
    }
  }

  stopAudio() {
    if (this.exerciseLists.length > 0) {
      if (this.musicAudio) {
        this.musicAudio.pause();
        this.musicAudio.currentTime = 0;
      }
      this.isPlaying = false;
      if (
        this.exerciseList.audioPath != null &&
        this.exerciseList.audioPath != ""
      ) {
        this.music_icon = "assets/imgs/music_icon_play.png";
      }
    }
  }

  ionViewDidLoad() {
    this.storage.get("imgPreview").then((res: any) => {
      if (res) {
        this.imgPreview = res;
        console.log("Img=>", this.imgPreview);
        let cusid_ele = document.getElementsByClassName("profile-avatar");
        for (let i = 0; i < cusid_ele.length; ++i) {
          let item = cusid_ele[i];
          item.setAttribute(
            "style",
            "background-image: url(" + this.imgPreview + ");"
          );
        }
      }
    });
    this.slides = document.querySelectorAll<HTMLElement>("#slides .slider");
    var videos = document.getElementById("videos");
    videos.addEventListener(
      "play",
      () => {
        //this.stopAudio();
        //this.stopSpeak();
      },
      false
    );
    videos.addEventListener(
      "pause",
      () => {
        // this.stopAudio();
        // this.stopSpeak();
      },
      false
    );
    document
      .getElementsByClassName("videos-prev-btn")[0]
      .removeAttribute("style");
    document
      .getElementsByClassName("videos-prev-btn")[0]
      .setAttribute("style", "opacity:0.3;");
    document
      .getElementsByClassName("videos-next-btn")[0]
      .removeAttribute("style");
    document
      .getElementsByClassName("videos-next-btn")[0]
      .setAttribute("style", "opacity:1;");
    document
      .getElementsByClassName("videos-prev-btn")[1]
      .removeAttribute("style");
    document
      .getElementsByClassName("videos-prev-btn")[1]
      .setAttribute("style", "opacity:0.3;");
    document
      .getElementsByClassName("videos-next-btn")[1]
      .removeAttribute("style");
    document
      .getElementsByClassName("videos-next-btn")[1]
      .setAttribute("style", "opacity:1;");
    this.initializeBackButtonCustomHandler();
  }

  ionViewWillLeave() {
    console.log("HomePage Leave-->");
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  initializeBackButtonCustomHandler(): void {
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(
      () => {
        console.log("Prevent Back Button Page Change-->");
        this.goHome();
      }
    );
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  prevSlide() {
    if (this.exerciseLists.length > 0) {
      this.stopAudio();
      this.stopSpeak();
      this.videoPause();
      this.exerciseList.exercisePath = "";
      console.log(this.currentSlide - 1 + " == " + this.exerciseLists.length);
      if (this.currentSlide == 0) {
        console.log("Home Slide");
      } else {
        console.log("Curr", this.currentSlide - 1);
        if (this.currentSlide - 1 == 0) {
          document
            .getElementsByClassName("videos-prev-btn")[0]
            .removeAttribute("style");
          document
            .getElementsByClassName("videos-prev-btn")[0]
            .setAttribute("style", "opacity:0.3;");
          document
            .getElementsByClassName("videos-next-btn")[0]
            .removeAttribute("style");
          document
            .getElementsByClassName("videos-next-btn")[0]
            .setAttribute("style", "opacity:1;");
          document
            .getElementsByClassName("videos-prev-btn")[1]
            .removeAttribute("style");
          document
            .getElementsByClassName("videos-prev-btn")[1]
            .setAttribute("style", "opacity:0.3;");
          document
            .getElementsByClassName("videos-next-btn")[1]
            .removeAttribute("style");
          document
            .getElementsByClassName("videos-next-btn")[1]
            .setAttribute("style", "opacity:1;");
        } else {
          document
            .getElementsByClassName("videos-prev-btn")[0]
            .removeAttribute("style");
          document
            .getElementsByClassName("videos-prev-btn")[0]
            .setAttribute("style", "opacity:1;");
          document
            .getElementsByClassName("videos-next-btn")[0]
            .removeAttribute("style");
          document
            .getElementsByClassName("videos-next-btn")[0]
            .setAttribute("style", "opacity:1;");
          document
            .getElementsByClassName("videos-prev-btn")[1]
            .removeAttribute("style");
          document
            .getElementsByClassName("videos-prev-btn")[1]
            .setAttribute("style", "opacity:1;");
          document
            .getElementsByClassName("videos-next-btn")[1]
            .removeAttribute("style");
          document
            .getElementsByClassName("videos-next-btn")[1]
            .setAttribute("style", "opacity:1;");
        }
        if (
          this.exerciseLists[this.currentSlide - 1].insAudioPath != null &&
          this.exerciseLists[this.currentSlide - 1].insAudioPath != ""
        ) {
          this.exerciseList.insAudioPath = this.exerciseLists[
            this.currentSlide - 1
          ].insAudioPath.replace(
            "/maverick/Directory/Music/",
            AppConfig.SITE_URL + "maverick/Directory/Music/"
          );
          this.instruction_icon = "assets/imgs/instruction_icon_play.png";
        } else {
          this.exerciseList.insAudioPath = "";
          this.instruction_icon = "assets/imgs/instruction_icon_gray.png";
        }
        this.insAudio = this.insaudio.nativeElement;
        this.insAudio.src = this.exerciseList.insAudioPath;
        if (
          this.exerciseLists[this.currentSlide - 1].audioPath != null &&
          this.exerciseLists[this.currentSlide - 1].audioPath != ""
        ) {
          this.exerciseList.audioPath = this.exerciseLists[
            this.currentSlide - 1
          ].audioPath.replace(
            "/maverick/Directory/Music/",
            AppConfig.SITE_URL + "maverick/Directory/Music/"
          );
          this.music_icon = "assets/imgs/music_icon_play.png";
        } else {
          console.log("1--", this.exerciseLists[0].audioPath);
          this.exerciseList.audioPath = "";
          this.music_icon = "assets/imgs/music_icon_gray.png";
        }
        console.log(this.music_icon);
        this.musicAudio = this.musicaudio.nativeElement;
        this.musicAudio.src = this.exerciseList.audioPath;
        if (this.exerciseLists[this.currentSlide - 1].fileType == "2") {
          if (
            this.exerciseLists[this.currentSlide - 1].exercisePath != null ||
            this.exerciseLists[this.currentSlide - 1].exercisePath != ""
          ) {
            this.exerciseList.exercisePath = this.exerciseLists[
              this.currentSlide - 1
            ].exercisePath.replace(
              "/maverick/Directory/Video/",
              AppConfig.SITE_URL + "maverick/Directory/Video/"
            );
          } else {
            this.exerciseList.exercisePath = "";
          }
          this.myVideo = this.video.nativeElement;
          this.myVideo.src = this.exerciseList.exercisePath;
          this.showVideoTag = true;
          let cusid_ele = document.getElementsByClassName("excercise-video");
          for (let i = 0; i < cusid_ele.length; ++i) {
            let item = cusid_ele[i];
            item.setAttribute("style", "visibility:visible;");
          }
        } else {
          if (
            this.exerciseLists[this.currentSlide - 1].exercisePath != null ||
            this.exerciseLists[this.currentSlide - 1].exercisePath != ""
          ) {
            this.exerciseList.exercisePath = this.exerciseLists[
              this.currentSlide - 1
            ].exercisePath.replace(
              "/maverick/Directory/Image/",
              AppConfig.SITE_URL + "maverick/Directory/Image/"
            );
          } else {
            this.exerciseList.exercisePath = "";
          }
          this.showVideoTag = false;
          this.myVideo = this.video.nativeElement;
          this.myVideo.src = this.exerciseList.exercisePath;
          let cusid_ele = document.getElementsByClassName("excercise-video");
          for (let i = 0; i < cusid_ele.length; ++i) {
            let item = cusid_ele[i];
            item.setAttribute("style", "visibility:hidden;height:0;");
          }
        }
        this.exerciseList.imageVideoName =
          this.exerciseLists[this.currentSlide - 1].imageVideoName;
        if (
          this.exerciseLists[this.currentSlide - 1].exerciseDescription != null
        ) {
          this.exerciseList.exerciseDescription = this.exerciseLists[
            this.currentSlide - 1
          ].exerciseDescription.replace(/(?:\r\n|\r|\n)/g, "<br>");
        } else {
          this.exerciseList.exerciseDescription = "";
        }
        this.goToSlide(this.currentSlide - 1);
        this.videoPlay();
      }
    }
  }

  nextSlide() {
    if (this.exerciseLists.length > 0) {
      this.stopAudio();
      this.stopSpeak();
      this.videoPause();
      this.exerciseList.exercisePath = "";
      console.log(this.currentSlide + 1 + " == " + this.exerciseLists.length);
      if (this.currentSlide + 1 == this.exerciseLists.length) {
        //this.currentSlide = 0;
        this.openModal("ExercisePopupPage");
      } else {
        console.log("Curr", this.currentSlide + 1);
        if (this.currentSlide + 1 == this.exerciseLists.length - 1) {
          console.log("Last slide");
        } else {
          document
            .getElementsByClassName("videos-prev-btn")[0]
            .removeAttribute("style");
          document
            .getElementsByClassName("videos-prev-btn")[0]
            .setAttribute("style", "opacity:1;");
          document
            .getElementsByClassName("videos-next-btn")[0]
            .removeAttribute("style");
          document
            .getElementsByClassName("videos-next-btn")[0]
            .setAttribute("style", "opacity:1;");
          document
            .getElementsByClassName("videos-prev-btn")[1]
            .removeAttribute("style");
          document
            .getElementsByClassName("videos-prev-btn")[1]
            .setAttribute("style", "opacity:1;");
          document
            .getElementsByClassName("videos-next-btn")[1]
            .removeAttribute("style");
          document
            .getElementsByClassName("videos-next-btn")[1]
            .setAttribute("style", "opacity:1;");
        }
        if (
          this.exerciseLists[this.currentSlide + 1].insAudioPath != null &&
          this.exerciseLists[this.currentSlide + 1].insAudioPath != ""
        ) {
          this.exerciseList.insAudioPath = this.exerciseLists[
            this.currentSlide + 1
          ].insAudioPath.replace(
            "/maverick/Directory/Music/",
            AppConfig.SITE_URL + "maverick/Directory/Music/"
          );
          this.instruction_icon = "assets/imgs/instruction_icon_play.png";
        } else {
          this.exerciseList.insAudioPath = "";
          this.instruction_icon = "assets/imgs/instruction_icon_gray.png";
        }
        this.insAudio = this.insaudio.nativeElement;
        this.insAudio.src = this.exerciseList.insAudioPath;
        if (
          this.exerciseLists[this.currentSlide + 1].audioPath != null &&
          this.exerciseLists[this.currentSlide + 1].audioPath != ""
        ) {
          this.exerciseList.audioPath = this.exerciseLists[
            this.currentSlide + 1
          ].audioPath.replace(
            "/maverick/Directory/Music/",
            AppConfig.SITE_URL + "maverick/Directory/Music/"
          );
          this.music_icon = "assets/imgs/music_icon_play.png";
        } else {
          console.log("1--", this.exerciseLists[0].audioPath);
          this.exerciseList.audioPath = "";
          this.music_icon = "assets/imgs/music_icon_gray.png";
        }
        console.log(this.music_icon);
        this.musicAudio = this.musicaudio.nativeElement;
        this.musicAudio.src = this.exerciseList.audioPath;
        if (this.exerciseLists[this.currentSlide + 1].fileType == "2") {
          if (
            this.exerciseLists[this.currentSlide + 1].exercisePath != null ||
            this.exerciseLists[this.currentSlide + 1].exercisePath != ""
          ) {
            this.exerciseList.exercisePath = this.exerciseLists[
              this.currentSlide + 1
            ].exercisePath.replace(
              "/maverick/Directory/Video/",
              AppConfig.SITE_URL + "maverick/Directory/Video/"
            );
          } else {
            this.exerciseList.exercisePath = "";
          }
          this.myVideo = this.video.nativeElement;
          this.myVideo.src = this.exerciseList.exercisePath;
          this.showVideoTag = true;
          let cusid_ele = document.getElementsByClassName("excercise-video");
          for (let i = 0; i < cusid_ele.length; ++i) {
            let item = cusid_ele[i];
            item.setAttribute("style", "visibility:visible;");
          }
        } else {
          if (
            this.exerciseLists[this.currentSlide + 1].exercisePath != null ||
            this.exerciseLists[this.currentSlide + 1].exercisePath != ""
          ) {
            this.exerciseList.exercisePath = this.exerciseLists[
              this.currentSlide + 1
            ].exercisePath.replace(
              "/maverick/Directory/Image/",
              AppConfig.SITE_URL + "maverick/Directory/Image/"
            );
          } else {
            this.exerciseList.exercisePath = "";
          }
          this.showVideoTag = false;
          this.myVideo = this.video.nativeElement;
          this.myVideo.src = this.exerciseList.exercisePath;
          let cusid_ele = document.getElementsByClassName("excercise-video");
          for (let i = 0; i < cusid_ele.length; ++i) {
            let item = cusid_ele[i];
            item.setAttribute("style", "visibility:hidden;height:0;");
          }
        }
        this.exerciseList.imageVideoName =
          this.exerciseLists[this.currentSlide + 1].imageVideoName;
        if (
          this.exerciseLists[this.currentSlide + 1].exerciseDescription != null
        ) {
          this.exerciseList.exerciseDescription = this.exerciseLists[
            this.currentSlide + 1
          ].exerciseDescription.replace(/(?:\r\n|\r|\n)/g, "<br>");
        } else {
          this.exerciseList.exerciseDescription = "";
        }
        this.goToSlide(this.currentSlide + 1);
        this.videoPlay();
      }
    }
  }

  goToSlide(n) {
    if (this.exerciseLists.length > 0) {
      this.currentSlide =
        (n + this.exerciseLists.length) % this.exerciseLists.length;
    }
  }

  openModal(pageName) {
    if (this.exerciseLists.length > 0) {
      this.videoPause();
      let modal = this.modalCtrl.create(pageName, null, {
        cssClass: "exercise-modal",
        enableBackdropDismiss: false,
      });
      modal.present();
      modal.onDidDismiss((data) => {
        if (data.slideAction == "finish") {
          this.dataService.markStarForStudent(this.userDetails, 11).then(
            (result) => {
              this.responseData = result;
              console.log(this.responseData.starList);
              if (this.responseData.returnStatus != 0) {
                this.navCtrl.setRoot("StarRatingPage", {
                  starList: this.responseData.starList,
                });
              } else if (this.responseData.returnStatus == 0) {
                console.log("returnStatus=>0");
                const alert = this.alertCtrl.create({
                  message: this.responseData.returnMessage,
                  buttons: [
                    {
                      text: "Ok",
                      handler: () => {},
                    },
                  ],
                });
                alert.present();
              }
            },
            (err) => {
              console.log(err);
              const alert = this.alertCtrl.create({
                message: AppConfig.API_ERROR,
                buttons: [
                  {
                    text: "Ok",
                    handler: () => {},
                  },
                ],
              });
              alert.present();
            }
          );
        } else if (data.slideAction == "repeat") {
          document
            .getElementsByClassName("videos-prev-btn")[0]
            .removeAttribute("style");
          document
            .getElementsByClassName("videos-prev-btn")[0]
            .setAttribute("style", "opacity:0.3;");
          document
            .getElementsByClassName("videos-next-btn")[0]
            .removeAttribute("style");
          document
            .getElementsByClassName("videos-next-btn")[0]
            .setAttribute("style", "opacity:1;");
          document
            .getElementsByClassName("videos-prev-btn")[1]
            .removeAttribute("style");
          document
            .getElementsByClassName("videos-prev-btn")[1]
            .setAttribute("style", "opacity:0.3;");
          document
            .getElementsByClassName("videos-next-btn")[1]
            .removeAttribute("style");
          document
            .getElementsByClassName("videos-next-btn")[1]
            .setAttribute("style", "opacity:1;");
          this.initializeBackButtonCustomHandler();
          if (
            this.exerciseLists[0].insAudioPath != null &&
            this.exerciseLists[0].insAudioPath != ""
          ) {
            this.exerciseList.insAudioPath =
              this.exerciseLists[0].insAudioPath.replace(
                "/maverick/Directory/Music/",
                AppConfig.SITE_URL + "maverick/Directory/Music/"
              );
            this.instruction_icon = "assets/imgs/instruction_icon_play.png";
          } else {
            this.exerciseList.insAudioPath = "";
            this.instruction_icon = "assets/imgs/instruction_icon_gray.png";
          }
          this.insAudio = this.insaudio.nativeElement;
          this.insAudio.src = this.exerciseList.insAudioPath;
          if (
            this.exerciseLists[0].audioPath != null &&
            this.exerciseLists[0].audioPath != ""
          ) {
            this.exerciseList.audioPath =
              this.exerciseLists[0].audioPath.replace(
                "/maverick/Directory/Music/",
                AppConfig.SITE_URL + "maverick/Directory/Music/"
              );
            this.music_icon = "assets/imgs/music_icon_play.png";
          } else {
            this.exerciseList.audioPath = "";
            this.music_icon = "assets/imgs/music_icon_gray.png";
          }
          this.musicAudio = this.musicaudio.nativeElement;
          this.musicAudio.src = this.exerciseList.audioPath;
          if (this.exerciseLists[0].fileType == "2") {
            if (
              this.exerciseLists[0].exercisePath != null ||
              this.exerciseLists[0].exercisePath != ""
            ) {
              this.exerciseList.exercisePath =
                this.exerciseLists[0].exercisePath.replace(
                  "/maverick/Directory/Video/",
                  AppConfig.SITE_URL + "maverick/Directory/Video/"
                );
            } else {
              this.exerciseList.exercisePath = "";
            }
            this.myVideo = this.video.nativeElement;
            this.myVideo.src = this.exerciseList.exercisePath;
            this.showVideoTag = true;
            let cusid_ele = document.getElementsByClassName("excercise-video");
            for (let i = 0; i < cusid_ele.length; ++i) {
              let item = cusid_ele[i];
              item.setAttribute("style", "visibility:visible;");
            }
          } else {
            if (
              this.exerciseLists[0].exercisePath != null ||
              this.exerciseLists[0].exercisePath != ""
            ) {
              this.exerciseList.exercisePath =
                this.exerciseLists[0].exercisePath.replace(
                  "/maverick/Directory/Image/",
                  AppConfig.SITE_URL + "maverick/Directory/Image/"
                );
            } else {
              this.exerciseList.exercisePath = "";
            }
            this.showVideoTag = false;
            this.myVideo = this.video.nativeElement;
            this.myVideo.src = this.exerciseList.exercisePath;
            let cusid_ele = document.getElementsByClassName("excercise-video");
            for (let i = 0; i < cusid_ele.length; ++i) {
              let item = cusid_ele[i];
              item.setAttribute("style", "visibility:hidden;height:0;");
            }
          }
          this.exerciseList.imageVideoName =
            this.exerciseLists[0].imageVideoName;
          if (this.exerciseLists[0].exerciseDescription != null) {
            this.exerciseList.exerciseDescription =
              this.exerciseLists[0].exerciseDescription.replace(
                /(?:\r\n|\r|\n)/g,
                "<br>"
              );
          } else {
            this.exerciseList.exerciseDescription = "";
          }
          this.goToSlide(this.currentSlide + 1);
          this.videoPlay();
        }
      });
    }
  }
  goHome() {
    if (this.exerciseLists.length > 0) {
      this.videoPause();
    }
    this.navCtrl.setRoot("MenuPage");
  }

  goPage(pmPage) {
    if (this.exerciseLists.length > 0) {
      this.videoPause();
    }
    this.navCtrl.setRoot(pmPage);
  }
}
