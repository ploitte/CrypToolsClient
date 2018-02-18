import { NgModule } from '@angular/core';
import { MyHeaderComponent } from './my-header/my-header';
import { IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [
        MyHeaderComponent
    ],
	imports: [
        IonicModule
    ],
	exports: [
        MyHeaderComponent
    ]
})
export class ComponentsModule {}
