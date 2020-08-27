import { Pipe, PipeTransform } from '@angular/core';
import { CartItem } from '../models';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(arr: CartItem[], sortOption?: string, sortOrder?: boolean): CartItem[] {
    if (!sortOption) {
      return arr;
    }

    if (sortOrder) {
      if (sortOption === 'name') {
        return arr.sort((a, b) => a[sortOption].localeCompare(b[sortOption]));
      }
      return arr.sort((a, b) => a[sortOption] - b[sortOption]);
    } else {
      if (sortOption === 'name') {
        return arr.sort((a, b) => b[sortOption].localeCompare(a[sortOption]));
      }
      return arr.sort((a, b) => b[sortOption] - a[sortOption]);
    }

  }

}
