import { Injectable } from '@angular/core';
import { Weather } from '../interfaces/Weather';

@Injectable({
  providedIn: 'root',
})
export class AppearanceService {
  constructor() {}

  applyCSSColour(
    providedCondition: string,
    conditions: string[],
    variableName: string
  ) {
    if (
      conditions.includes(providedCondition.toLowerCase()) ||
      conditions.includes('*')
    ) {
      document.documentElement.style.setProperty(
        '--background',
        getComputedStyle(document.documentElement).getPropertyValue(
          `--${variableName}`
        )
      );
    }
  }
}
