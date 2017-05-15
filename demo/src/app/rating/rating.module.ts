import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {BarRatingComponent} from './component/bar-rating.component';
import {BarRatingPipe} from './pipe/bar-rating.pipe';

@NgModule({
  declarations: [
    BarRatingComponent,
    BarRatingPipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    BarRatingComponent
  ]
})
export class BarRatingModule {
}
