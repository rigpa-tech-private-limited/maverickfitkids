import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DigitalCertificatePage } from './digital-certificate';

@NgModule({
  declarations: [
    DigitalCertificatePage,
  ],
  imports: [
    IonicPageModule.forChild(DigitalCertificatePage),
  ],
})
export class DigitalCertificatePageModule {}
