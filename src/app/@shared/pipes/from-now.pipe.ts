import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'fromNow' })
export class FromNowPipe implements PipeTransform {
  transform(value: string): any {
    return moment(new Date(value)).calendar(null, {
      sameDay: 'hh:mma',
      lastDay: '[Yesterday] hh:mma',
      lastWeek: 'dddd hh:mma',
      sameElse: 'DD MMM YYYY hh:mma'
    });
  }
}
