import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuizHistoryPage } from './quiz-history';

@NgModule({
  declarations: [
    QuizHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(QuizHistoryPage),
  ],
})
export class QuizHistoryPageModule {}
