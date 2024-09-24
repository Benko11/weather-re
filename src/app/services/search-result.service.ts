import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchResultService {
  searchQuery$ = new BehaviorSubject<any[]>([]);

  constructor() {}

  setSearchQueries(searchQueries: any[]) {
    this.searchQuery$.next(searchQueries);
  }

  reset() {
    this.searchQuery$.next([]);
  }
}
