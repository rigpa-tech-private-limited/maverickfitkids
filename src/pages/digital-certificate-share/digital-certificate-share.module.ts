import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DigitalCertificateSharePage } from './digital-certificate-share';

@NgModule({
  declarations: [
    DigitalCertificateSharePage,
  ],
  imports: [
    IonicPageModule.forChild(DigitalCertificateSharePage),
  ],
})
export class DigitalCertificateSharePageModule {}
