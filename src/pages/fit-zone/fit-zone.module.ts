import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FitZonePage } from './fit-zone';

@NgModule({
  declarations: [
    FitZonePage,
  ],
  imports: [
    IonicPageModule.forChild(FitZonePage),
  ],
})
export class FitZonePageModule {}
