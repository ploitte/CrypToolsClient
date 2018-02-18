import { NgModule } from '@angular/core';
import { FilterPipe } from './filter.pipe';
import { SortPipe } from './sortPipe';

///import pipe...
 
   @NgModule({
        imports: [],
        declarations: 
        [
            FilterPipe,
            SortPipe
        ],
        exports: [
            FilterPipe,
            SortPipe
        ]
    })

    export class SharedPipeModule { }   