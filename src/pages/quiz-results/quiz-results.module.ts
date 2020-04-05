import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuizResultsPage } from './quiz-results';

@NgModule({
  declarations: [
    QuizResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(QuizResultsPage),
  ],
})
export class QuizResultsPageModule {}
