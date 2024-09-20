import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'windDegrees',
  standalone: true,
})
export class WindDegreesPipe implements PipeTransform {
  transform(value: number): string {
    const subPiece = 45 / 2;
    const degrees = value % 360;

    if (
      this.isInInterval(
        degrees,
        Directions.NORTH + 360 - subPiece,
        Directions.NORTH + 360
      ) ||
      this.isInInterval(degrees, Directions.NORTH, Directions.NORTH + subPiece)
    ) {
      return 'northern';
    }

    if (
      this.isInInterval(
        degrees,
        Directions.NORTH + subPiece,
        Directions.NORTHEAST + subPiece
      )
    )
      return 'northeast';

    if (
      this.isInInterval(
        degrees,
        Directions.NORTHEAST + subPiece,
        Directions.EAST + subPiece
      )
    )
      return 'east';

    if (
      this.isInInterval(
        degrees,
        Directions.EAST + subPiece,
        Directions.SOUTHEAST + subPiece
      )
    )
      return 'southeast';

    if (
      this.isInInterval(
        degrees,
        Directions.SOUTHEAST + subPiece,
        Directions.SOUTH + subPiece
      )
    )
      return 'southern';

    if (
      this.isInInterval(
        degrees,
        Directions.SOUTH + subPiece,
        Directions.SOUTHWEST + subPiece
      )
    )
      return 'southwest';

    if (
      this.isInInterval(
        degrees,
        Directions.SOUTHWEST + subPiece,
        Directions.WEST + subPiece
      )
    )
      return 'west';

    if (
      this.isInInterval(
        degrees,
        Directions.WEST + subPiece,
        Directions.NORTHWEST + subPiece
      )
    )
      return 'northwest';

    return 'no';
  }

  isInInterval(n: number, a: number, b: number) {
    if (a < b) {
      console.log(`Interval: [${a}, ${b}]`);
      if (a <= n && n <= b) return true;
      return false;
    }

    throw new Error('WindDegreesPipe: a must be less than b');
  }
}

enum Directions {
  NORTH = 0,
  NORTHEAST = 45,
  EAST = 90,
  SOUTHEAST = 135,
  SOUTH = 180,
  SOUTHWEST = 225,
  WEST = 270,
  NORTHWEST = 315,
}
