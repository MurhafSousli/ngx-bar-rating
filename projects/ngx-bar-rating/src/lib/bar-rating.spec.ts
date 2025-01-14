import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  FormsModule,
  ReactiveFormsModule,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  UntypedFormControl
} from '@angular/forms';
import { BarRating } from 'ngx-bar-rating';

describe('BarRating Component', () => {
  let component: BarRating;
  let fixture: ComponentFixture<BarRating>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, BarRating],
    }).compileComponents();

    fixture = TestBed.createComponent(BarRating);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should register BarRating as a provider for NG_VALUE_ACCESSOR', () => {
    const injector = fixture.debugElement.injector;

    const valueAccessorProviders = injector.get<ControlValueAccessor[]>(NG_VALUE_ACCESSOR);
    expect(valueAccessorProviders.some(provider => provider instanceof BarRating)).toBeTrue();
  });

  it('should register BarRating as a provider for NG_VALIDATORS', () => {
    const injector = fixture.debugElement.injector;

    const valueAccessorProviders = injector.get<ControlValueAccessor[]>(NG_VALIDATORS);
    expect(valueAccessorProviders.some(provider => provider instanceof BarRating)).toBeTrue();
  });

  it('should call writeValue, registerOnChange, and registerOnTouched', () => {
    const onChangeSpy = jasmine.createSpy('onChange');
    const onTouchedSpy = jasmine.createSpy('onTouched');

    // Register onChange and onTouched
    component.registerOnChange(onChangeSpy);
    component.registerOnTouched(onTouchedSpy);

    // Call writeValue and verify value propagation
    component.writeValue(3);
    expect(component.rate()).toBe(3);

    // Simulate interaction
    component.updateRating(4);
    expect(onChangeSpy).toHaveBeenCalledWith(4);

    // Simulate touch
    component.onTouched();
    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('should initialize with default options', () => {
    expect(component.rate()).toBeUndefined();
    expect(component.max()).toBe(component.defaultOptions.maxValue);
    expect(component.readonly()).toBe(component.defaultOptions.readonly);
  });

  it('should update rating and emit onChange', () => {
    const spy = spyOn(component, 'onChange');
    component.updateRating(4);
    expect(component.rate()).toBe(4);
    expect(spy).toHaveBeenCalledWith(4);
  });

  it('should validate required input', () => {
    fixture.componentRef.setInput('required', true);
    const control = new UntypedFormControl('');
    const validationResult = component.validate(control);
    expect(validationResult).toEqual({ required: true });

    control.setValue(3);
    expect(component.validate(control)).toBeNull();
  });

  it('should handle writeValue correctly', () => {
    component.writeValue(5);
    expect(component.rate()).toBe(5);
  });

  it('should set disabled state', () => {
    component.setDisabledState(true);
    expect(component.disabled).toBeTrue();
  });

  it('should compute correct contexts for units', () => {
    fixture.componentRef.setInput('max', 5);
    component.updateRating(3.5);
    fixture.detectChanges();

    const contexts = component.contexts();
    expect(contexts).toEqual([
      'selected',
      'selected',
      'selected',
      'fraction',
      'inactive'
    ]);
  });

  it('should compute correct rating text', () => {
    fixture.componentRef.setInput('titles', ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']);
    component.updateRating(3);
    fixture.detectChanges();

    expect(component.ratingText()).toBe('Very Good');
  });

  it('should display rating value if titles input is not provided', () => {
    component.updateRating(2);
    fixture.detectChanges();

    expect(component.ratingText()).toBe(2);
  });

  it('should compute correct contexts for units when hovered', () => {
    component.hoveredIndex.set(3);
    fixture.detectChanges();

    expect(component.contexts()).toEqual([
      'active',
      'active',
      'active',
      'inactive',
      'inactive'
    ]);
  });

  describe('handleKeydown', () => {
    it('should increase rating with ArrowRight', () => {
      component.rate.set(3);
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      component.handleKeydown(event);
      expect(component.rate()).toBe(4); // Increased from 3 to 4
    });

    it('should decrease rating with ArrowLeft', () => {
      component.rate.set(3);
      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      component.handleKeydown(event);
      expect(component.rate()).toBe(2); // Decreased from 3 to 2
    });

    it('should not increase rating above max', () => {
      component.rate.set(5); // Set to max
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      component.handleKeydown(event);
      expect(component.rate()).toBe(5); // Remains at max
    });

    it('should not decrease rating below 1', () => {
      component.rate.set(1); // Set to min
      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      component.handleKeydown(event);
      expect(component.rate()).toBe(1); // Remains at min
    });

    it('should emit barClick event when rating changes', () => {
      component.rate.set(3);
      spyOn(component.barClick, 'emit');
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      component.handleKeydown(event);
      expect(component.barClick.emit).toHaveBeenCalledWith(4); // Emit new rating
    });

    it('should do nothing for unsupported keys', () => {
      component.rate.set(3);
      const event = new KeyboardEvent('keydown', { key: 'a' });
      component.handleKeydown(event);
      expect(component.rate()).toBe(3); // Unchanged
    });

    it('should not process keydown if readonly or disabled', () => {
      component.rate.set(3);
      fixture.componentRef.setInput('readonly', true);
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      component.handleKeydown(event);
      expect(component.rate()).toBe(3); // Unchanged

      fixture.componentRef.setInput('readonly', false);
      component.disabled = true;
      component.handleKeydown(event);
      expect(component.rate()).toBe(3); // Unchanged
    });

    it('should handle Enter key without modifying the rate', () => {
      spyOn(component, 'updateRating'); // Spy on updateRating method
      spyOn(component.barClick, 'emit'); // Spy on barClick emitter

      // Set initial rate
      component.rate.set(3);

      // Simulate keydown for Enter key
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      component.handleKeydown(event);

      // Assert that updateRating was not called
      expect(component.updateRating).not.toHaveBeenCalled();

      // Assert that barClick was not emitted
      expect(component.barClick.emit).not.toHaveBeenCalled();

      // Assert that rate remains unchanged
      expect(component.rate()).toBe(3);
    });

    it('should handle Space key without modifying the rate', () => {
      spyOn(component, 'updateRating'); // Spy on updateRating method
      spyOn(component.barClick, 'emit'); // Spy on barClick emitter

      // Set initial rate
      component.rate.set(3);

      // Simulate keydown for Space key
      const event = new KeyboardEvent('keydown', { key: ' ' });
      component.handleKeydown(event);

      // Assert that updateRating was not called
      expect(component.updateRating).not.toHaveBeenCalled();

      // Assert that barClick was not emitted
      expect(component.barClick.emit).not.toHaveBeenCalled();

      // Assert that rate remains unchanged
      expect(component.rate()).toBe(3);
    });
  });

  describe('handleClick', () => {
    it('should update rating when clicking on a bar', () => {
      const target = fixture.debugElement.query(By.css('.br-unit[data-value="4"]'));
      const event = new MouseEvent('click', { bubbles: true });
      spyOn(component.barClick, 'emit');

      target.nativeElement.dispatchEvent(event);
      component.handleClick(event);

      expect(component.rate()).toBe(4); // Updated to clicked value
      expect(component.barClick.emit).toHaveBeenCalledWith(4); // Emit clicked rating
    });

    it('should not process click if readonly or disabled', () => {
      component.rate.set(3);
      fixture.componentRef.setInput('readonly', true);

      const target = fixture.debugElement.query(By.css('.br-unit[data-value="4"]'));
      const event = new MouseEvent('click', { bubbles: true });

      target.nativeElement.dispatchEvent(event);
      component.handleClick(event);

      expect(component.rate()).toBe(3); // Unchanged

      fixture.componentRef.setInput('readonly', false);
      component.disabled = true;

      component.handleClick(event);
      expect(component.rate()).toBe(3); // Unchanged
    });

    it('should do nothing if clicking outside a bar', () => {
      component.rate.set(3);
      const event = new MouseEvent('click', { bubbles: true });
      const outsideTarget = fixture.debugElement.query(By.css('.br')).nativeElement;

      outsideTarget.dispatchEvent(event);
      component.handleClick(event);

      expect(component.rate()).toBe(3); // Unchanged
    });
  });
});
