import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarRating } from './bar-rating';
import { BarRatingPipe } from './bar-rating.pipe';
import { ActiveRating, InactiveRating, FractionRating } from './custom-rating';

@NgModule({
  declarations: [
    BarRating,
    BarRatingPipe,
    ActiveRating,
    InactiveRating,
    FractionRating
  ],
  imports: [
    CommonModule,
    FormsModule
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
