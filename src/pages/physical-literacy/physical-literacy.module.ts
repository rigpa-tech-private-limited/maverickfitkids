import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhysicalLiteracyPage } from './physical-literacy';

@NgModule({
  declarations: [
    PhysicalLiteracyPage,
  ],
  imports: [
    IonicPageModule.forChild(PhysicalLiteracyPage),
  ],
})
export class PhysicalLiteracyPageModule {}
