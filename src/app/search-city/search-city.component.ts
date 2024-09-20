import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WeatherService } from '../weather.service';
import { Coordinates } from '../../interfaces/Coordinates';
import { debounceTime, filter, map, Subject } from 'rxjs';

@Component({
  selector: 'search-city',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './search-city.component.html',
  styleUrl: './search-city.component.css',
})
export class SearchCityComponent {
  query = '';
  private querySubject = new Subject<string>();

  @Output() coordinates = new EventEmitter<Coordinates>();

  constructor(private weatherService: WeatherService) {}

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
    this.querySubject.next(this.query);
  }

  ngOnDestroy() {
    this.querySubject.complete();
  }

  performSearch(query: string) {
    this.weatherService
      .getCoordsForCity(query)
      .subscribe((data) => this.coordinates.emit(data));
  }
}
