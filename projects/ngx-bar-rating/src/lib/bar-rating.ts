import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, Validator, NG_VALIDATORS, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

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

@Component({
  selector: 'bar-rating',
  templateUrl: './bar-rating.html',
  styleUrls: ['./bar-rating.scss'],
  providers: [RATING_VALUE_ACCESSOR, RATING_VALUE_VALIDATOR],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarRating implements OnInit, OnChanges, ControlValueAccessor, Validator {

  contexts: { fraction: boolean, selected: boolean, active: boolean, click: (e) => void, enter: () => void }[] = [];
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
   * An event fired when a user is hovering over a given rating.
   * Event's payload equals to the rating being hovered over.
   */
  @Output() hover = new EventEmitter<number>();

  /**
   * An event fired when a user stops hovering over a given rating.
   * Event's payload equals to the rating of the last item being hovered over.
   */
  @Output() leave = new EventEmitter<number>();

  /**
   * An event fired when a user selects a new rating.
   * Event's payload equals to the newly selected rating.
   */
  @Output() rateChange = new EventEmitter<number>(true);

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.rate) {
      this.update(this.rate);
    }
  }

  ngOnInit(): void {
    this.contexts = Array.from({ length: this.max }, (context, i) => ({
      selected: false,
      fraction: false,
      active: false,
      click: (e) => this.handleClick(e, i + 1),
      enter: () => this.handleEnter(i + 1)
    }));

    this.updateState(this.rate);
  }

  update(newRate: number, internalChange = true): void {
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
    this.contexts = Array.from({ length: this.max }, (context, index) => ({
      selected: index + 1 <= nextValue,
      fraction: (index + 1 === Math.round(nextValue) && nextValue % 1) >= 0.5,
      active: false,
      click: (e) => this.handleClick(e, index),
      enter: () => this.handleEnter(index)
    }));
  }

  private handleClick(e, value): void {
    /** (NOT TESTED) Remove 300ms click delay on touch devices */
    e.preventDefault();
    e.stopPropagation();
    this.update(value + 1);
  }

  private handleEnter(index): void {
    if (!this.disabled && !this.readOnly) {
      /** Add selected class for rating hover */
      this.contexts.map((context, i) => {
        context.active = i <= index;
        context.fraction = false;
        context.selected = false;
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

  onChange = (_: any) => {
  };
  onTouched = () => {
  };

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
