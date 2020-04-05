import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ToBeListPage } from './to-be-list';

@NgModule({
  declarations: [
    ToBeListPage,
  ],
  imports: [
    IonicPageModule.forChild(ToBeListPage),
  ],
})
export class ToBeListPageModule {}
