import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BarRating, BarRatingEffect } from 'ngx-bar-rating';

@Component({
  selector: 'bars',
  templateUrl: './bars.component.html',
  styleUrl: './bars.component.scss',
  imports: [BarRating, BarRatingEffect],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarsComponent {
  horiRate: number = 7;
  vertRate: number = 1;
  squareRate: number = 3;
  movieRate: number = 2;
  customRate: number = 2;
  starRate: number = 4;
}
