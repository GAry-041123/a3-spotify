import { Component, Input } from '@angular/core';
import { Popularity } from '../../data/popularity';

@Component({
  selector: 'app-thermometer',
  templateUrl: './thermometer.component.html',
  styleUrls: ['./thermometer.component.css'],
  standalone: false
})
export class ThermometerComponent {
  @Input() popularity: Popularity;
  @Input() label = 'Popularity';

  get percentage(): number {
    // ResourceData omits the Popularity object for a zero score.
    return Math.min(100, Math.max(0, (this.popularity?.percent || 0) * 100));
  }

  get color(): string {
    return this.popularity?.color || '#ff0000';
  }
}
