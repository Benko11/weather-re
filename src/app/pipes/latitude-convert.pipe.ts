import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'latitudeConvert',
  standalone: true,
})
export class LatitudeConvertPipe implements PipeTransform {
  transform(value: number): string {
    let isNorth = true;
    if (value < 0) isNorth = false;

    const absoluteValue = Math.abs(value);
    const degrees = Math.floor(absoluteValue);
    const minutes = Math.floor((absoluteValue - degrees) * 60);
    const seconds = Math.floor((absoluteValue - degrees - minutes / 60) * 360);

    return `${degrees}°${minutes}'${seconds}''${isNorth ? 'N' : 'S'}`;
  }
}
