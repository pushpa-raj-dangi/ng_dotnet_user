import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '../../models/user-detail';

@Pipe({
  name: 'status',
  standalone: true,
})
export class StatusPipe implements PipeTransform {
  transform(value: string): string {
    console.log('value', value == '0');
    if (value == '0') {
      return 'Open';
    } else if (value == '1') {
      return 'Closed';
    } else {
      return 'Unknown';
    }
  }
}
