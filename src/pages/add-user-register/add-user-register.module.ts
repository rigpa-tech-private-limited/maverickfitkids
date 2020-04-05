import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddUserRegisterPage } from './add-user-register';

@NgModule({
  declarations: [
    AddUserRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(AddUserRegisterPage),
  ],
})
export class AddUserRegisterPageModule {}
