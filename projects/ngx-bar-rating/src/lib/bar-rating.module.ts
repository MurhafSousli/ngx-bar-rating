import { NgModule } from '@angular/core';
import { BarRating } from './bar-rating';
import { ActiveRating, InactiveRating, FractionRating } from './custom-rating';

@NgModule({
  imports: [
    BarRating,
    ActiveRating,
    InactiveRating,
    FractionRating
  ],
  exports: [
    BarRating,
    ActiveRating,
    InactiveRating,
    FractionRating
  ]
})
export class BarRatingModule {
}
