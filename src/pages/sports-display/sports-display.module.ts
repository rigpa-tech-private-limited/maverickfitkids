import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SportsDisplayPage } from './sports-display';

@NgModule({
  declarations: [
    SportsDisplayPage,
  ],
  imports: [
    IonicPageModule.forChild(SportsDisplayPage),
  ],
})
export class SportsDisplayPageModule {}
