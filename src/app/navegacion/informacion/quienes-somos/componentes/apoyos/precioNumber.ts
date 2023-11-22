import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'customNumber'})
export class PrecioNumberPipe implements PipeTransform {
  transform(value: number): string {
    return value.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
  }
}