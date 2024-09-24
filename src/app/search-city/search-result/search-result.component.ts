import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LocationIconComponent } from '../../icons/location-icon.component';
import { DecimalPipe } from '@angular/common';
import { Coordinates } from '../../interfaces/Coordinates';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'search-result',
  standalone: true,
  imports: [LocationIconComponent, DecimalPipe],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css',
})
export class SearchResultComponent {
  @Input() name!: string;
  @Input() country!: string;
  @Input() state = '';
  @Input() longitude!: number;
  @Input() latitude!: number;

  @Output() coordinates = new EventEmitter<Coordinates>();

  constructor(private loadingService: LoadingService) {}

  onSelect() {
    this.loadingService.startLoading();
    this.coordinates.emit({ lon: this.longitude, lat: this.latitude });
  }
}
