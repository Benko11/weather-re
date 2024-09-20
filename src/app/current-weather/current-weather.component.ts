import { Component, Input, SimpleChanges } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Weather } from '../../interfaces/Weather';
import { Observable, of, Subject, Subscription, takeUntil } from 'rxjs';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'current-weather',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.css',
})
export class CurrentWeatherComponent {
  @Input() lat!: number;
  @Input() long!: number;

  currentWeather: Weather = {
    city: '',
    country: '',
    condition: '',
    icon: '',
    temperature: 0,
    feelsLike: 0,
    humidity: 0,
    wind: 0,
  };

  constructor(private weatherService: WeatherService) {}

  async ngOnInit() {
    // (await this.weatherService.getCurrentWeather()).subscribe(
    //   (load) => (this.currentWeather = load)
    // );
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (this.long == null || this.lat == null) return;

    (
      await this.weatherService.getCurrentWeather({
        lon: this.long,
        lat: this.lat,
      })
    ).subscribe((load) => (this.currentWeather = load));
  }
}
