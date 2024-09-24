import { Component, computed, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchCityComponent } from './search-city/search-city.component';
import { Coordinates } from './interfaces/Coordinates';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { CurrentLocationComponent } from './current-location/current-location.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CurrentWeatherComponent,
    CurrentLocationComponent,
    SearchCityComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  latitude!: number;
  longitude!: number;
  hideSearchResults = true;

  constructor() {}

  ngOnInit() {
    // subscribing to observables is like calling a function, providing callbacks where the data will be delivered to
  }

  assignCoordinates(coordinates: Coordinates) {
    this.latitude = coordinates.lat;
    this.longitude = coordinates.lon;
  }
}
