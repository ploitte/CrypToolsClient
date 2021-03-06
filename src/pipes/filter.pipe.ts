import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})


export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {

    if(!items) return [];
    if(!searchText) return items;
    
    return items.filter(function(item){
        return item.name.toLowerCase().includes(searchText.toLowerCase()) 
        || item.symbol.toLowerCase().includes(searchText.toLowerCase())
    });
   }
}