import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParentGatePage } from './parent-gate';
import { FlashCardModule } from '../../components/flash-card/flash-card-module';

@NgModule({
  declarations: [
    ParentGatePage,
  ],
  imports: [
    IonicPageModule.forChild(ParentGatePage),
    FlashCardModule
  ],
})
export class ParentGatePageModule {}
