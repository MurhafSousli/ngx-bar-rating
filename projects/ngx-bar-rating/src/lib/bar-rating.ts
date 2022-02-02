import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
  ContentChild,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, Validator, NG_VALIDATORS, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { ActiveRating, FractionRating, InactiveRating } from './custom-rating';

/** This allows support [(ngModel)] and ngControl. */
const RATING_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => BarRating),
  multi: true
};

/** This allows control required validation. */
const RATING_VALUE_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => BarRating),
  multi: true,
};

enum BarRatingUnitState {
  active = 'active',
  inactive = 'inactive',
  selected = 'selected',
  fraction = 'fraction'
}

interface BarRatingContext {
  state: BarRatingUnitState;
  click: (e) => void;
  enter: () => void;
}

@Component({
  selector: 'bar-rating',
  templateUrl: './bar-rating.html',
  styleUrls: ['./bar-rating.scss'],
  providers: [RATING_VALUE_ACCESSOR, RATING_VALUE_VALIDATOR],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarRating implements OnInit, OnChanges, ControlValueAccessor, Validator {

  readonly unitState = BarRatingUnitState;
  contexts: BarRatingContext[] = [];
  nextRate: number;
  disabled: boolean;

  /** Current rating. Can be a decimal value like 3.14 */
  @Input() rate;

  /** Maximal rating that can be given using this widget. */
  @Input() max = 5;

  /** A flag indicating if rating can be updated. */
  @Input() readOnly = false;

  /** Set the theme */
  @Input() theme = 'default';

  /** Show rating title */
  @Input() showText = false;

  /** Replace rate value with a title */
  @Input() titles = [];

  /** A flag indicating if rating is required for form validation. */
  @Input() required = false;

  /**
   * A stream that emits when a user is hovering over a given rating.
   * Event's payload equals to the rating being hovered over.
   */
  @Output() hover = new EventEmitter<number>();

  /**
   * A stream that emits when a user stops hovering over a given rating.
   * Event's payload equals to the rating of the last item being hovered over.
   */
  @Output() leave = new EventEmitter<number>();

  /**
   * A stream that emits when a user selects a new rating.
   * Event's payload equals to the newly selected rating.
   */
  @Output() rateChange = new EventEmitter<number>(true);

  /**
   * A stream that forwards a bar rating click since clicks are not propagated
   */
  @Output() barClick = new EventEmitter<number>();

  @ContentChild(ActiveRating) customActiveRating: ActiveRating;
  @ContentChild(InactiveRating) customInActiveRating: InactiveRating;
  @ContentChild(FractionRating) customFractionRating: FractionRating;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.rate) {
      this.update(this.rate);
    }
  }

  ngOnInit(): void {
    this.contexts = Array.from({ length: this.max }, (context: BarRatingContext[], i: number) => ({
      state: BarRatingUnitState.inactive,
      click: () => this.handleClick(i + 1),
      enter: () => this.handleEnter(i + 1)
    }));

    this.updateState(this.rate);
  }

  update(newRate: number, internalChange: boolean = true): void {
    if (!this.readOnly && !this.disabled && this.rate !== newRate) {
      this.rate = newRate;
      this.rateChange.emit(this.rate);
    }
    if (internalChange) {
      this.onChange(this.rate);
      this.onTouched();
    }
    this.updateState(this.rate);
  }

  /** Reset rate value */
  reset(): void {
    this.leave.emit(this.nextRate);
    this.updateState(this.rate);
  }

  private updateState(nextValue): void {
    /** Set rate value as text */
    this.nextRate = nextValue - 1;
    /** Set the rating */
    this.contexts = Array.from({ length: this.max }, (context: BarRatingContext[], index: number) => ({
      state: index + 1 <= nextValue
        ? BarRatingUnitState.selected
        : (index + 1 === Math.round(nextValue) && nextValue % 1) >= 0.5
          ? BarRatingUnitState.fraction
          : BarRatingUnitState.inactive,
      click: () => this.handleClick(index),
      enter: () => this.handleEnter(index)
    }));
  }

  private handleClick(value: number): void {
    this.update(value + 1);
  }

  private handleEnter(index): void {
    if (!this.disabled && !this.readOnly) {
      /** Add selected class for rating hover */
      this.contexts.map((context: BarRatingContext, i: number) => {
        context.state = i <= index ? BarRatingUnitState.active : BarRatingUnitState.inactive;
      });
      this.nextRate = index;
      this.hover.emit(index);
    }
  }

  /** This is the initial value set to the component */
  writeValue(value: number): void {
    this.update(value, false);
    this.changeDetectorRef.markForCheck();
  }

  validate(c: FormControl): { required: boolean } | null {
    return (this.required && !c.value) ? { required: true } : null;
  }

  onChange(_: any): void {
  }

  onTouched(): void {
  }

  registerOnChange(fn: (value: any) => any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
