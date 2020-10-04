import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarRating } from './bar-rating';
import { BarRatingPipe } from './bar-rating.pipe';

@NgModule({
  declarations: [BarRating, BarRatingPipe],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [BarRating]
})
export class BarRatingModule {
}
