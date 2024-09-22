import { Component, Input, SimpleChanges } from '@angular/core';
import { Weather } from '../interfaces/Weather';
import { DecimalPipe } from '@angular/common';
import { ArrowIconComponent } from '../icons/arrow-icon.component';
import { WindDegreesPipe } from '../pipes/wind-degrees.pipe';
import { HumidityHighIconComponent } from '../icons/humidity-high-icon.component';
import { HumidityMidIconComponent } from '../icons/humidity-mid-icon.component';
import { HumidityLowIconComponent } from '../icons/humidity-low-icon.component';
import { WeatherService } from '../services/weather.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'current-weather',
  standalone: true,
  imports: [
    DecimalPipe,
    WindDegreesPipe,
    ArrowIconComponent,
    HumidityHighIconComponent,
    HumidityMidIconComponent,
    HumidityLowIconComponent,
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

  constructor(
    private weatherService: WeatherService,
    private loadingService: LoadingService
  ) {}

  async ngOnInit() {
    this.loadingService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });

    // (await this.weatherService.getCurrentWeatherForCoords()).subscribe(
    //   (load) => (this.currentWeather = load)
    // );
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (this.long == null || this.lat == null) return;

    (
      await this.weatherService.getCurrentWeatherForCoords({
        lon: this.long,
        lat: this.lat,
      })
    ).subscribe((load) => {
      this.currentWeather = load;
      this.loadingService.stopLoading();
    });
  }
}
