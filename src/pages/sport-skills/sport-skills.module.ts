import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SportSkillsPage } from './sport-skills';

@NgModule({
  declarations: [
    SportSkillsPage,
  ],
  imports: [
    IonicPageModule.forChild(SportSkillsPage),
  ],
})
export class SportSkillsPageModule {}
