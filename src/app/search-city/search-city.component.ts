import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Coordinates } from '../interfaces/Coordinates';
import { catchError, debounceTime, filter, map, Subject } from 'rxjs';
import { SearchIconComponent } from '../icons/search-icon.component';
import { WeatherService } from '../services/weather.service';
import { LoadingService } from '../services/loading.service';
import { SearchResultComponent } from './search-result/search-result.component';
import { ErrorHandlerService } from '../services/error-handler.service';

@Component({
  selector: 'search-city',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SearchIconComponent,
    SearchResultComponent,
  ],
  templateUrl: './search-city.component.html',
  styleUrl: './search-city.component.css',
})
export class SearchCityComponent {
  query = '';
  private querySubject = new Subject<string>();

  hideSearchResults!: boolean;

  exampleCities = [
    'London',
    'Paris',
    'Sydney',
    'Beijing',
    'Tokyo',
    'Vancouver',
  ];
  activeExampleCity = '';

  queryResults: any[] = [];

  @Output() coordinates = new EventEmitter<Coordinates>();

  constructor(
    private weatherService: WeatherService,
    private loadingService: LoadingService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.activeExampleCity = this.getRandomExampleCity();

    this.querySubject
      .pipe(
        debounceTime(500),
        map((query) => query.trim())
      )
      .subscribe((value) => {
        if (value === '') {
          this.resetQueryResults();
          return;
        }

        this.performTentativeSearch(value);
      });
  }

  onQueryInput(e: any) {
    this.querySubject.next(e.target.value);
  }

  onSearch() {
    this.loadingService.startLoading();
    this.performSearch(this.query);
  }

  onQueryBlur() {
    this.activeExampleCity = this.getRandomExampleCity();
  }

  ngOnDestroy() {
    this.querySubject.complete();
  }

  performTentativeSearch(query: string) {
    this.weatherService.getQueryMatchesForCity(query).subscribe((data) => {
      this.queryResults = [];
      this.queryResults = data;
    });
  }

  performSearch(query: string) {
    this.weatherService
      .getCoordsForCity(query)
      .pipe(
        catchError((err) => {
          this.loadingService.stopLoading();
          return [];
        })
      )
      .subscribe((data) => {
        this.coordinates.emit(data);
        this.loadingService.stopLoading();
      });
  }

  getRandomExampleCity() {
    const { length } = this.exampleCities;
    return this.exampleCities[Math.floor(Math.random() * length)];
  }

  assignCoordinates(coordinates: Coordinates) {
    this.coordinates.emit(coordinates);
    this.resetQueryResults();
  }

  restoreQueryResults(e: any) {
    if (e.target.value.trim().length < 1) return;

    this.performTentativeSearch(e.target.value);
  }

  resetQueryResults() {
    this.queryResults = [];
  }
}
