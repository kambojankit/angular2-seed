import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({
  name: 'lowercase'
})
class LowerCasePipe implements PipeTransform {
    transform(value: string): string {
      if(!value) return value;
      if(typeof value !== 'string') {
        throw new Error ('Invalid input: '+value);
      }
      return value.toLowerCase();
    }
}
