import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'longitudeConvert',
  standalone: true,
})
export class LongitudeConvertPipe implements PipeTransform {
  transform(value: number): string {
    let isEast = true;
    if (value < 0) isEast = false;

    const absoluteValue = Math.abs(value);
    const degrees = Math.floor(absoluteValue);
    const minutes = Math.floor((absoluteValue - degrees) * 60);
    const seconds = Math.floor((absoluteValue - degrees - minutes / 60) * 360);

    return `${degrees}°${minutes}'${seconds}''${isEast ? 'E' : 'W'}`;
  }
}
