import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  errorMessage$ = new BehaviorSubject('');

  constructor() {}

  setMessage(message: string, duration: number = 5000) {
    this.errorMessage$.next(message);
    setTimeout(() => this.reset(), duration);
  }

  reset() {
    this.errorMessage$.next('');
  }
}
