import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'compute',
  pure: true,
  standalone: true,
})
export class ComputePipe implements PipeTransform {
  transform(value: string, index: number): string {
    // very heavy computation
    return `${value} - ${index}`;
  }
}
