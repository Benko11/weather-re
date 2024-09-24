import { Component } from '@angular/core';
import { ErrorHandlerService } from '../services/error-handler.service';
import { filter, Subject } from 'rxjs';

@Component({
  selector: 'error-message-handler',
  standalone: true,
  imports: [],
  templateUrl: './error-message-handler.component.html',
  styleUrl: './error-message-handler.component.css',
})
export class ErrorMessageHandlerComponent {
  message!: string;

  constructor(private errorHandlerService: ErrorHandlerService) {}

  ngOnInit() {
    this.errorHandlerService.errorMessage$.subscribe((msg) => {
      this.message = msg;
    });
  }
}
