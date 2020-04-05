import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserConfirmPage } from './user-confirm';

@NgModule({
  declarations: [
    UserConfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(UserConfirmPage),
  ],
})
export class UserConfirmPageModule {}
