import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Coordinates } from '../interfaces/Coordinates';
import { debounceTime, filter, map, Subject } from 'rxjs';
import { SearchComponent } from '../icons/search.component';
import { LocationComponent } from '../icons/location.component';
import { WeatherService } from '../services/weather.service';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'search-city',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SearchComponent,
    LocationComponent,
  ],
  templateUrl: './search-city.component.html',
  styleUrl: './search-city.component.css',
})
export class SearchCityComponent {
  query = '';
  private querySubject = new Subject<string>();

  @Output() coordinates = new EventEmitter<Coordinates>();

  constructor(
    private weatherService: WeatherService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.querySubject
      .pipe(
        debounceTime(500),
        filter((query) => query != ''),
        map((query) => query.trim())
      )
      .subscribe((value) => this.performSearch(value));
  }

  onSearch() {
    this.loadingService.startLoading();
    this.querySubject.next(this.query);
  }

  ngOnDestroy() {
    this.querySubject.complete();
  }

  performSearch(query: string) {
    this.weatherService.getCoordsForCity(query).subscribe((data) => {
      this.loadingService.stopLoading();
      this.coordinates.emit(data);
    });
  }
}
