import { HttpClient } from '@angular/common/http';
import { Injectable, output } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  of,
  tap,
  throttleTime,
} from 'rxjs';
import { Weather } from '../interfaces/Weather';
import { Coordinates } from '../interfaces/Coordinates';

import { environment } from '../../environments/environment.development';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = 'b4e4c88aa6940bfbc53c9eb3c3901432';

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  async getUserLocation(): Promise<Coordinates> {
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

  async getCurrentWeatherForCoords(
    coordinates: Coordinates
  ): Promise<Observable<any>> {
    if (coordinates.lon == null || coordinates.lat == null) return of([]);

    const url = `${environment.apiUrl}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=metric`;
    return this.http
      .get(url)
      .pipe(map((raw) => this.transformWeatherData(raw)));
  }

  getCoordsForCity(city: string): Observable<Coordinates> {
    const url = `${environment.apiUrlLocation}?q=${city}&appid=${this.apiKey}`;

    return this.http.get(url).pipe(
      map((response) => {
        if (Array.isArray(response) && response.length < 1) {
          this.errorHandlerService.setMessage('Could not find the city name');
          console.error('Could not find the city name');

          throw new Error('Could not find the city name');
        }

        return response;
      }),
      map((raw) => this.transformCityNameToCoordinates(raw))
    );
  }

  getQueryMatchesForCity(query: string): Observable<any> {
    const url = `${environment.apiUrlLocation}?q=${query}&limit=5&appid=${this.apiKey}`;

    return this.http
      .get(url)
      .pipe(map((raw) => this.transformCityNames(raw as any[])));
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
      state: data.main.state,
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

  private transformCityNames(data: any[]) {
    const results: any[] = [];
    data.forEach((item) => {
      results.push({
        name: item.name,
        country: item.country,
        state: item.state,
        lat: item.lat,
        lon: item.lon,
      });
    });
    return results;
  }
}
