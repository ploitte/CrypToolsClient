import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarketPage } from './market';
import { SharedPipeModule } from '../../../pipes/pipe.module';
import { ColorPourcentDirective } from '../../../directives/colorPourcent.directive';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    MarketPage,
    ColorPourcentDirective
  ],
  imports: [
    IonicPageModule.forChild(MarketPage),
    SharedPipeModule,
    ComponentsModule
  ],
})
export class MarketPageModule {}
