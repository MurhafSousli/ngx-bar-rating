import { NgModule } from '@angular/core';
import { BarRating } from './bar-rating';
import { ActiveRating, InactiveRating, FractionRating } from './custom-rating';
import { BarRatingEffect } from './bar-rating-effect';

@NgModule({
  imports: [
    BarRating,
    BarRatingEffect,
    ActiveRating,
    InactiveRating,
    FractionRating
  ],
  exports: [
    BarRating,
    BarRatingEffect,
    ActiveRating,
    InactiveRating,
    FractionRating
  ]
})
export class BarRatingModule {
}
