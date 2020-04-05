import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StarRatingPage } from './star-rating';

@NgModule({
  declarations: [
    StarRatingPage,
  ],
  imports: [
    IonicPageModule.forChild(StarRatingPage),
  ],
})
export class StarRatingPageModule {}
