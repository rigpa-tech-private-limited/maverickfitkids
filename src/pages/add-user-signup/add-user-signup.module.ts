import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddUserSignupPage } from './add-user-signup';

@NgModule({
  declarations: [
    AddUserSignupPage,
  ],
  imports: [
    IonicPageModule.forChild(AddUserSignupPage),
  ],
})
export class AddUserSignupPageModule {}
