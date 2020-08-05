import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReviewPopupPage } from './review-popup';

@NgModule({
  declarations: [
    ReviewPopupPage,
  ],
  imports: [
    IonicPageModule.forChild(ReviewPopupPage),
  ],
})
export class ReviewPopupPageModule {}
