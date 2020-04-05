import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SessionPopupPage } from './session-popup';

@NgModule({
  declarations: [
    SessionPopupPage,
  ],
  imports: [
    IonicPageModule.forChild(SessionPopupPage),
  ],
})
export class SessionPopupPageModule {}
