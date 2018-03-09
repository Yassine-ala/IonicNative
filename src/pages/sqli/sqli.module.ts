import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SqliPage } from './sqli';

@NgModule({
  declarations: [
    SqliPage,
  ],
  imports: [
    IonicPageModule.forChild(SqliPage),
  ],
})
export class SqliPageModule {}
