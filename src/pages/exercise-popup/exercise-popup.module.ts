import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExercisePopupPage } from './exercise-popup';

@NgModule({
  declarations: [
    ExercisePopupPage,
  ],
  imports: [
    IonicPageModule.forChild(ExercisePopupPage),
  ],
})
export class ExercisePopupPageModule {}
