import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SportsSelectPage } from './sports-select';

@NgModule({
  declarations: [
    SportsSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(SportsSelectPage),
  ],
})
export class SportsSelectPageModule {}
