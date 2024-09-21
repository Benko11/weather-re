import { Component, Input, SimpleChanges } from '@angular/core';
import { Weather } from '../interfaces/Weather';
import { Observable, of, Subject, Subscription, takeUntil } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { ArrowComponent } from '../icons/arrow/arrow.component';
import { WindDegreesPipe } from '../pipes/wind-degrees.pipe';
import { HumidityHighComponent } from '../icons/humidity-high.component';
import { HumidityMidComponent } from '../icons/humidity-mid.component';
import { HumidityLowComponent } from '../icons/humidity-low.component';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'current-weather',
  standalone: true,
  imports: [
    DecimalPipe,
    WindDegreesPipe,
    ArrowComponent,
    HumidityHighComponent,
    HumidityMidComponent,
    HumidityLowComponent,
  ],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.css',
})
export class CurrentWeatherComponent {
  @Input() lat!: number;
  @Input() long!: number;
  @Input() isLoading: boolean = true;

  currentWeather: Weather = {
    city: '',
    country: '',
    condition: '',
    icon: '',
    temperature: 0,
    tempMin: 0,
    tempMax: 0,
    feelsLike: 0,
    humidity: 0,
    visibility: 0,
    wind: { direction: 0, speed: 0 },
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
