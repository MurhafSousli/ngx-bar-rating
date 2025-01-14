import {
  Component,
  inject,
  signal,
  output,
  computed,
  forwardRef,
  numberAttribute,
  booleanAttribute,
  input,
  model,
  contentChild,
  Signal,
  Provider,
  InputSignal,
  ModelSignal,
  WritableSignal,
  OutputEmitterRef,
  ChangeDetectionStrategy,
  InputSignalWithTransform
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ControlValueAccessor, Validator, NG_VALIDATORS, NG_VALUE_ACCESSOR, UntypedFormControl } from '@angular/forms';
import { ActiveRating, FractionRating, InactiveRating } from './custom-rating';
import { BAR_RATING_OPTIONS, BarRatingOptions } from './bar-rating.model';

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

enum BarRatingUnitStateEnum {
  active = 'active',
  inactive = 'inactive',
  selected = 'selected',
  fraction = 'fraction'
}

type BarRatingUnitState = `${ BarRatingUnitStateEnum }`;

@Component({
  selector: 'bar-rating',
  templateUrl: './bar-rating.html',
  styleUrl: './bar-rating.scss',
  providers: [RATING_VALUE_ACCESSOR, RATING_VALUE_VALIDATOR],
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarRating implements ControlValueAccessor, Validator {

  readonly defaultOptions: BarRatingOptions = inject(BAR_RATING_OPTIONS);

  onChange: OnChangeFn<number> = () => {
  };

  onTouched: OnTouchedFn = () => {
  };

  readonly UNITS: typeof BarRatingUnitStateEnum = BarRatingUnitStateEnum;

  disabled: boolean;

  /** Current rating. Can be a decimal value like 3.14 */
  rate: ModelSignal<number> = model<number>();

  /** Maximal rating that can be given using this widget. */
  max: InputSignalWithTransform<number, number | string> = input<number, string | number>(this.defaultOptions.maxValue, {
    transform: numberAttribute
  });

  /** A flag indicating if rating can be updated. */
  readonly: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(this.defaultOptions.readonly, {
    transform: booleanAttribute,
    alias: 'readonly'
  });

  /** Set the theme */
  theme: InputSignal<string> = input<string>(this.defaultOptions.theme);

  /** Show rating title */
  showText: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(this.defaultOptions.showText, {
    transform: booleanAttribute
  });

  /** Replace rate value with a title */
  titles: InputSignal<string[]> = input<string[]>([]);

  /** A flag indicating if rating is required for form validation. */
  required: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(false, { transform: booleanAttribute });

  tabIndex: InputSignalWithTransform<number, number | string> = input<number, string | number>(0, { transform: numberAttribute });

  hoveredIndex: WritableSignal<number> = signal(null);

  contexts: Signal<BarRatingUnitState[]> = computed(() => {
    const length: number = this.max();
    const currentRate: number = this.rate();
    const hovered: number = this.hoveredIndex();

    return Array.from({ length }, (_: unknown, i: number) => {
      if (hovered) {
        return i + 1 <= hovered ? BarRatingUnitStateEnum.active : BarRatingUnitStateEnum.inactive;
      }
      if (i + 1 <= currentRate) {
        return BarRatingUnitStateEnum.selected;
      }
      if ((i + 1 === Math.round(currentRate) && currentRate % 1) >= 0.5) {
        return BarRatingUnitStateEnum.fraction;
      }
      return BarRatingUnitStateEnum.inactive;
    });
  });

  ratingText: Signal<string | number> = computed(() => {
    const value: string | number = this.hoveredIndex() || this.rate();
    return this.titles()[value] || value;
  });

  /**
   * A stream that forwards a bar rating click since clicks are not propagated
   */
  barClick: OutputEmitterRef<number> = output<number>();

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
    return (this.required() && !c.value) ? { required: true } : null;
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

  handleKeydown(event: KeyboardEvent): void {
    if (this.readonly() || this.disabled) return;

    const currentRating: number = this.rate();
    let newRating: number = currentRating;

    switch (event.key) {
      case 'ArrowRight':
        newRating = Math.min(currentRating + 1, this.max()); // Increase rating
        event.preventDefault();
        break;
      case 'ArrowLeft':
        newRating = Math.max(currentRating - 1, 1); // Decrease rating
        event.preventDefault();
        break;
      case 'Enter':
      case ' ':
        // Select the current rating (handled in click logic)
        event.preventDefault();
        break;
      default:
        return; // Ignore other keys
    }

    if (newRating !== currentRating) {
      this.updateRating(newRating);
      this.barClick.emit(newRating);
      this.hoveredIndex.set(newRating);
    }
  }

  handleClick(event: MouseEvent): void {
    if (this.readonly() || this.disabled) return;

    const target = event.target as HTMLElement;
    const unitElement = target.closest('.br-unit') as HTMLElement;
    const value: string = unitElement?.getAttribute('data-value');

    if (value) {
      const rating: number = parseInt(value, 10);
      this.updateRating(rating);
      this.barClick.emit(rating);
    }
  }
}

type OnChangeFn<T> = (value: T) => void;
type OnTouchedFn = () => void;
