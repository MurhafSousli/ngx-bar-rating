import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'rateTitle'
})
export class BarRatingPipe implements PipeTransform {

  transform(value: number = 0, titles?: any): any {
    /** Initialize value with 0 in case of undefined */
    return titles[value] || '';
  }

}
