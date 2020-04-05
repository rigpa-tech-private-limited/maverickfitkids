import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SportsPopupPage } from './sports-popup';

@NgModule({
  declarations: [
    SportsPopupPage,
  ],
  imports: [
    IonicPageModule.forChild(SportsPopupPage),
  ],
})
export class SportsPopupPageModule {}
