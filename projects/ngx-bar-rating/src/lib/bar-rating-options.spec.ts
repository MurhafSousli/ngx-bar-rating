import { TestBed } from '@angular/core/testing';
import { BAR_RATING_OPTIONS, provideBarRatingOptions, BarRatingOptions } from 'ngx-bar-rating';

describe('BarRating Global Options', () => {
  const defaultOptions: BarRatingOptions = {
    theme: 'default',
    maxValue: 5,
    showText: false,
    readonly: false,
  };

  it('should provide default options via BAR_RATING_OPTIONS token', () => {
    const options: BarRatingOptions = TestBed.inject(BAR_RATING_OPTIONS);
    expect(options).toEqual(defaultOptions);
  });

  it('should override default options with custom values', () => {
    const customOptions: BarRatingOptions = {
      theme: 'custom-theme',
      maxValue: 10,
      showText: true,
      readonly: true,
    };

    TestBed.configureTestingModule({
      providers: [provideBarRatingOptions(customOptions)],
    });

    const options = TestBed.inject(BAR_RATING_OPTIONS);
    expect(options).toEqual({
      ...defaultOptions,
      ...customOptions,
    });
  });

  it('should merge default options with partially provided custom values', () => {
    const customOptions: Partial<BarRatingOptions> = {
      theme: 'custom-theme',
    };

    TestBed.configureTestingModule({
      providers: [provideBarRatingOptions(customOptions as BarRatingOptions)],
    });

    const options = TestBed.inject(BAR_RATING_OPTIONS);
    expect(options).toEqual({
      theme: 'custom-theme',
      maxValue: 5,
      showText: false,
      readonly: false,
    });
  });

  it('should provide options in root scope via factory', () => {
    const options: BarRatingOptions = TestBed.inject(BAR_RATING_OPTIONS);
    expect(options).toBeTruthy();
    expect(options.theme).toBe('default');
  });
});
