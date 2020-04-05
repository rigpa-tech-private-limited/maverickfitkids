import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserPopupPage } from './user-popup';

@NgModule({
  declarations: [
    UserPopupPage,
  ],
  imports: [
    IonicPageModule.forChild(UserPopupPage),
  ],
})
export class UserPopupPageModule {}
