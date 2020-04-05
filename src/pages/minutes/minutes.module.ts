import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MinutesPage } from './minutes';

@NgModule({
  declarations: [
    MinutesPage,
  ],
  imports: [
    IonicPageModule.forChild(MinutesPage),
  ],
})
export class MinutesPageModule {}
