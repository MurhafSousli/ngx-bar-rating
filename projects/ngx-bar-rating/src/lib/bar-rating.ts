import {
  Component,
  Output,
  signal,
  computed,
  forwardRef,
  numberAttribute,
  booleanAttribute,
  input,
  model,
  contentChild,
  EventEmitter,
  Signal,
  Provider,
  InputSignal,
  ModelSignal,
  WritableSignal,
  InputSignalWithTransform,
  ChangeDetectionStrategy
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ControlValueAccessor, Validator, NG_VALIDATORS, NG_VALUE_ACCESSOR, UntypedFormControl } from '@angular/forms';
import { ActiveRating, FractionRating, InactiveRating } from './custom-rating';

/** This allows support [(ngModel)] and ngControl. */
const RATING_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => BarRating),
  multi: true
};

/** This allows control required validation. */
const RATING_VALUE_VALIDATOR: Provider = {
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

@Component({
  standalone: true,
  selector: 'bar-rating',
  templateUrl: './bar-rating.html',
  styleUrl: './bar-rating.scss',
  providers: [RATING_VALUE_ACCESSOR, RATING_VALUE_VALIDATOR],
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarRating implements ControlValueAccessor, Validator {

  onChange: OnChangeFn<number> = () => {
  };

  onTouched: OnTouchedFn = () => {
  };

  readonly UNITS = BarRatingUnitState;

  disabled: boolean;

  /** Current rating. Can be a decimal value like 3.14 */
  rate: ModelSignal<number> = model<number>(5);

  /** Maximal rating that can be given using this widget. */
  max: InputSignalWithTransform<number, number | string> = input<number, string | number>(5, { transform: numberAttribute });

  /** A flag indicating if rating can be updated. */
  readOnly: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(false, {
    transform: booleanAttribute,
    alias: 'readonly'
  });

  /** Set the theme */
  theme: InputSignal<string> = input<string>('default');

  /** Show rating title */
  showText: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(false, { transform: booleanAttribute });

  /** Replace rate value with a title */
  titles: InputSignal<string[]> = input<string[]>([]);

  /** A flag indicating if rating is required for form validation. */
  required: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(false, { transform: booleanAttribute });

  tabIndex: InputSignalWithTransform<number, number | string> = input<number, string | number>(0, { transform: numberAttribute });

  hoveredIndex: WritableSignal<number> = signal(null);

  contexts: Signal<BarRatingUnitState[]> = computed(() => {
    if (this.hoveredIndex()) {
      return Array.from({ length: this.max() }, (c, i: number) => {
        if (this.hoveredIndex()) {
          if (i + 1 <= this.hoveredIndex()) {
            return BarRatingUnitState.active;
          }
          return BarRatingUnitState.inactive;
        }
      });
    }
    return Array.from({ length: this.max() }, (c, i: number) => {
      if (i + 1 <= this.rate()) {
        return BarRatingUnitState.selected;
      }
      if ((i + 1 === Math.round(this.rate()) && this.rate() % 1) >= 0.5) {
        return BarRatingUnitState.fraction;
      }
      return BarRatingUnitState.inactive;
    });
  });

  ratingText: Signal<string | number> = computed(() => {
    const value: string | number = this.hoveredIndex() || this.rate();
    return this.titles()[value] || value;
  });

  /**
   * A stream that forwards a bar rating click since clicks are not propagated
   */
  @Output() barClick: EventEmitter<number> = new EventEmitter<number>();

  customActiveRating: Signal<ActiveRating> = contentChild(ActiveRating);
  customInActiveRating: Signal<InactiveRating> = contentChild(InactiveRating);
  customFractionRating: Signal<FractionRating> = contentChild(FractionRating);

  updateRating(value: number): void {
    this.rate.set(value);
    this.onChange(value);
  }

  /**
   * This is the initial value set to the component
   */
  writeValue(value: number): void {
    if (value !== null) {
      this.rate.set(value);
    }
  }

  validate(c: UntypedFormControl): { required: boolean } | null {
    return (this.required && !c.value) ? { required: true } : null;
  }

  registerOnChange(fn: OnChangeFn<number>): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => OnTouchedFn): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}

type OnChangeFn<T> = (value: T) => void;
type OnTouchedFn = () => void;
