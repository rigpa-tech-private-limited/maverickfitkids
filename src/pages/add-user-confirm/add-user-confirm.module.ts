import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddUserConfirmPage } from './add-user-confirm';

@NgModule({
  declarations: [
    AddUserConfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(AddUserConfirmPage),
  ],
})
export class AddUserConfirmPageModule {}
