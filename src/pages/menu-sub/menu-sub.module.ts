import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuSubPage } from './menu-sub';

@NgModule({
  declarations: [
    MenuSubPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuSubPage),
  ],
})
export class MenuSubPageModule {}
