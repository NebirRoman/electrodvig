import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: Array<any>, filter: string): unknown {
    if (!items){
      return [];
    }
    if (!filter){
      return items
    }
    return items.filter(elem =>{
      for (const key in elem) {
        if (typeof elem[key] == 'object'){
          if(elem[key].nameUA){
            if (elem[key].nameUA.toLowerCase().includes(filter.toLowerCase())) return true
          }
        }
        if (typeof elem[key] == 'string'){
          if (elem[key].toLowerCase().includes(filter.toLowerCase())) return true
        }
      }
    });
  }

}
