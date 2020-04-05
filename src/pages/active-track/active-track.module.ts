import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActiveTrackPage } from './active-track';

@NgModule({
  declarations: [
    ActiveTrackPage,
  ],
  imports: [
    IonicPageModule.forChild(ActiveTrackPage),
  ],
})
export class ActiveTrackPageModule {}
