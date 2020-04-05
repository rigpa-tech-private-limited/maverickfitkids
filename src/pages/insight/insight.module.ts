import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InsightPage } from './insight';

@NgModule({
  declarations: [
    InsightPage,
  ],
  imports: [
    IonicPageModule.forChild(InsightPage),
  ],
})
export class InsightPageModule {}
