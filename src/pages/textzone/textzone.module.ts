import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TextzonePage } from './textzone';

@NgModule({
  declarations: [
    TextzonePage,
  ],
  imports: [
    IonicPageModule.forChild(TextzonePage),
  ],
})
export class TextzonePageModule {}
