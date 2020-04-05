import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransformPage } from './transform';

@NgModule({
  declarations: [
    TransformPage,
  ],
  imports: [
    IonicPageModule.forChild(TransformPage),
  ],
})
export class TransformPageModule {}
