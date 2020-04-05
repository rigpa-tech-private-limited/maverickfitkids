import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserDeletePage } from './user-delete';

@NgModule({
  declarations: [
    UserDeletePage,
  ],
  imports: [
    IonicPageModule.forChild(UserDeletePage),
  ],
})
export class UserDeletePageModule {}
