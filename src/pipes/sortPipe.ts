import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})


export class SortPipe implements PipeTransform {
  transform(list:any, col:any, sort:any){
    if(list == null || col == null){ return list;}


    return list.sort(function(a, b){


    })

  //   console.log("col= " + col + " / sort= " + sort );


  //   return list.sort(function(a, b){
  //     if(a[col] < b[col] ){
  //         return (-1 * sort);
  //     }
  //     else if(a[col] > b[col]){
  //         return 1 * sort;
  //     }
  //     else{
  //         return 0;
  //     }
  //   })
  } 
}