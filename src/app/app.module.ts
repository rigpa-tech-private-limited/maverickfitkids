import { Config } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Keyboard } from '@ionic-native/keyboard';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { MyApp } from './app.component';
import { ValidatorsModule } from '../validators/validators.module';
import { AuthServiceProvider } from '../providers/auth/auth';
import { DataProvider } from '../providers/data/data';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP } from '@ionic-native/http';
import { DocumentViewer } from '@ionic-native/document-viewer';
import {
  ModalEnterDirect, ModalLeaveDirect
  , ModalEnterFadeIn, ModalLeaveFadeOut
  , ModalEnterZoomIn, ModalLeaveZoomIn
  , ModalEnterZoomOut, ModalLeaveZoomOut
} from '../classes/ionic-modal-transition-pack';
import { StreamingMedia } from '@ionic-native/streaming-media';
import { NativeAudio } from '@ionic-native/native-audio';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { SafeHtmlPipe } from '../pipes/safe-html/safe-html';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { SQLite } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../providers/database/database';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from "@ionic-native/file-path";
import { File } from "@ionic-native/file";
import { Camera } from '@ionic-native/camera';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { IOSFilePicker } from '@ionic-native/file-picker';

@NgModule({
  declarations: [
    MyApp, SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      scrollPadding: true,
      scrollAssist: true,
      autoFocusAssist: true,
      platforms: {
        ios: {
          swipeBackEnabled: false
        },
      }
    }),
    ValidatorsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    ImagePicker,
    Base64,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthServiceProvider,
    DataProvider,
    AndroidPermissions,
    StreamingMedia,
    NativeAudio,
    HTTP,
    TextToSpeech,
    DocumentViewer,
    DatePipe,
    DatabaseProvider,
    SQLitePorter,
    SQLite,
    FileChooser,
    File,
    FilePath,
    Camera,
    InAppBrowser,
    IOSFilePicker
  ]
})
export class AppModule {
  constructor(public config: Config) {
    this.setCustomTransitions();
  }

  private setCustomTransitions() {
    this.config.setTransition('ModalEnterDirect', ModalEnterDirect);
    this.config.setTransition('ModalLeaveDirect', ModalLeaveDirect);

    this.config.setTransition('ModalEnterFadeIn', ModalEnterFadeIn);
    this.config.setTransition('ModalLeaveFadeOut', ModalLeaveFadeOut);

    this.config.setTransition('ModalEnterZoomIn', ModalEnterZoomIn);
    this.config.setTransition('ModalLeaveZoomIn', ModalLeaveZoomIn);

    this.config.setTransition('ModalEnterZoomOut', ModalEnterZoomOut);
    this.config.setTransition('ModalLeaveZoomOut', ModalLeaveZoomOut);
  }
}
