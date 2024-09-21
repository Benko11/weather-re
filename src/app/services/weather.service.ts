import { HttpClient } from '@angular/common/http';
import { Injectable, output } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  throttleTime,
} from 'rxjs';
import { Weather } from '../interfaces/Weather';
import { Coordinates } from '../interfaces/Coordinates';

import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = 'b4e4c88aa6940bfbc53c9eb3c3901432';

  constructor(private http: HttpClient) {}

  private async locateUser(): Promise<Coordinates> {
    try {
      const pos: any = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
        });
      });

      return { lat: pos.coords.latitude, lon: pos.coords.longitude };
    } catch {
      return { lat: 0.0, lon: 0.0 };
    }
  }

  async getCurrentWeather(
    coordinates: Coordinates
  ): Promise<Observable<Weather>> {
    const url = `${environment.apiUrl}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=metric`;
    return this.http
      .get(url)
      .pipe(map((raw) => this.transformWeatherData(raw)));
  }

  getCoordsForCity(city: string) {
    const url = `${environment.apiUrlLocation}?q=${city}&limit=3&appid=${this.apiKey}`;

    return this.http.get(url).pipe(
      filter((raw) => raw != null && raw != ''),
      distinctUntilChanged(),
      debounceTime(500),
      throttleTime(500),
      map((raw) => this.transformCityNameToCoordinates(raw))
    );
  }

  private transformWeatherData(data: any): Weather {
    return {
      condition: data.weather[0].main,
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      tempMin: data.main.temp_min,
      tempMax: data.main.temp_max,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      wind: {
        speed: data.wind.speed,
        direction: data.wind.deg,
      },
      visibility: data.visibility,
      icon: data.weather[0].icon,
    };
  }

  private transformCityNameToCoordinates(data: any): Coordinates {
    return {
      lat: data[0].lat,
      lon: data[0].lon,
    };
  }
}
