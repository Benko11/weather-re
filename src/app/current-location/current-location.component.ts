import { Component, EventEmitter, Output } from '@angular/core';
import { LocationIconComponent } from '../icons/location-icon.component';
import { WeatherService } from '../services/weather.service';
import { Coordinates } from '../interfaces/Coordinates';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'current-location',
  standalone: true,
  imports: [LocationIconComponent],
  templateUrl: './current-location.component.html',
  styleUrl: './current-location.component.css',
})
export class CurrentLocationComponent {
  @Output() coordinates = new EventEmitter<Coordinates>();

  constructor(
    private weatherService: WeatherService,
    private loadingService: LoadingService
  ) {}

  async onLocate() {
    const coords = await this.weatherService.getUserLocation();
    this.loadingService.startLoading();

    this.coordinates.emit(coords);
  }
}
