import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ToBeQuotePage } from './to-be-quote';

@NgModule({
  declarations: [
    ToBeQuotePage,
  ],
  imports: [
    IonicPageModule.forChild(ToBeQuotePage),
  ],
})
export class ToBeQuotePageModule {}
