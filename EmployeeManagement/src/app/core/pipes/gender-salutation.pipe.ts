import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderSalutation'
})

export class GenderSalutationPipe implements PipeTransform {
    
  transform(name: string, gender: string): string {
    if (gender === 'male') {
      return 'Mr. ' + name;
    } else if (gender === 'female') {
      return 'Mrs. ' + name;
    } else {
      return name;
    }
  }
}
