import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlertPage } from './alert';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    AlertPage,
  ],
  imports: [
    IonicPageModule.forChild(AlertPage),
    ComponentsModule
  ],
})
export class AlertPageModule {}
