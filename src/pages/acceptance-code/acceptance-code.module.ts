import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcceptanceCodePage } from './acceptance-code';

@NgModule({
  declarations: [
    AcceptanceCodePage,
  ],
  imports: [
    IonicPageModule.forChild(AcceptanceCodePage),
  ],
})
export class AcceptanceCodePageModule {}
