import { InjectionToken, Provider } from '@angular/core';

export interface BarRatingOptions {
  theme?: string;
  maxValue?: number;
  showText?: boolean;
  readonly?: boolean;
}

const defaultOptions: BarRatingOptions = {
  theme: 'default',
  maxValue: 5,
  showText: false,
  readonly: false
};

export const BAR_RATING_OPTIONS: InjectionToken<BarRatingOptions> = new InjectionToken<BarRatingOptions>('BAR_RATING_OPTIONS', {
  providedIn: 'root',
  factory: (): BarRatingOptions => defaultOptions
});

export function provideBarRatingOptions(options: BarRatingOptions): Provider {
  return {
    provide: BAR_RATING_OPTIONS,
    useValue: { ...defaultOptions, ...options }
  };
}
