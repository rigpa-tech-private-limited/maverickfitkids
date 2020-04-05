import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuidePopupPage } from './guide-popup';

@NgModule({
  declarations: [
    GuidePopupPage,
  ],
  imports: [
    IonicPageModule.forChild(GuidePopupPage),
  ],
})
export class GuidePopupPageModule {}
