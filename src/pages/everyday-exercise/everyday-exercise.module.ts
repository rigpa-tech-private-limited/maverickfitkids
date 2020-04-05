import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EverydayExercisePage } from './everyday-exercise';

@NgModule({
  declarations: [
    EverydayExercisePage,
  ],
  imports: [
    IonicPageModule.forChild(EverydayExercisePage),
  ],
})
export class EverydayExercisePageModule {}
