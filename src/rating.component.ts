import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';

@Component({
  selector: 'ng-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingComponent {

  rateValue = 0;
  ratingArr;

  /** Progress units count */
  @Input() units: number = 5;

  /** Enable hover state */
  @Input() hoverState: boolean = true;

  /** Enable unit click */
  @Input() readOnly: boolean = false;

  /** Set the theme */
  @Input() theme: string = 'default';

  /** Rating value must be between 0 and units */
  @Input() set rating(value: number) {
    /** Validate value */
    if (value < 0 || value > this.units) {
      console.warn(`[bar-rating]: Value must be between 0 and ${this.units}`);
    } else {
      this.rateValue = value;
      this.set(this.rateValue);
    }
  }

  /** Emit rating clicks */
  @Output() ratingChange = new EventEmitter<number>();
  /** Emit rating hover */
  @Output() hover = new EventEmitter<number>();

  set(value) {

    /** Set the rating */
    this.ratingArr = Array.from(new Array(this.units), (x, i) => {
      return {
        selected: (i < value) ? true : false,
        /** Add fraction class to fraction star  */
        fraction: (i + 1 === Math.round(value) && value % 1) >= 0.5,
        /** Unit click event */
        click: (e) => {
          /** (NOT TESTED) Remove 300ms click delay on touch devices */
          e.preventDefault();
          e.stopPropagation();
          if (!this.readOnly) {
            this.ratingChange.emit(i + 1);
          }
        },
        enter: () => {
          if (this.hoverState && !this.readOnly) {
            /** Add selected class for rating hover */
            this.ratingArr.map((unit, index) => {
              unit.active = index <= i;
              unit.fraction = false;
              unit.selected = false;
            });
            this.hover.emit(i);
          }
        }
      }
    });
  }

  leave() {
    if (this.hoverState && !this.readOnly) {
      this.set(this.rateValue);
    }
  }

}
