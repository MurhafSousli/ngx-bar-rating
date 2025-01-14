import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BarRating, BarRatingEffect } from 'ngx-bar-rating';

@Component({
  imports: [BarRating, BarRatingEffect],
  template: `
    <bar-rating effect/>
  `
})
class TestHostComponent {
}

describe('BarRating Click Effect Directive', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let debugElement: DebugElement;
  let directiveInstance: BarRatingEffect;
  let barRatingInstance: BarRating;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    debugElement = fixture.debugElement;
    fixture.detectChanges();

    // Get the directive instance directly
    directiveInstance = debugElement.query(By.directive(BarRatingEffect)).injector.get(BarRatingEffect);
    barRatingInstance = debugElement.query(By.directive(BarRating)).componentInstance;
  });

  it('should call both handleClick and handleClickWithEffect on click', () => {
    // Spy on both methods
    spyOn(barRatingInstance, 'handleClick').and.callThrough();
    spyOn(directiveInstance, 'handleClickWithEffect').and.callThrough();

    const event: MouseEvent = new MouseEvent('click', { bubbles: true });
    const unitElement: DebugElement = debugElement.query(By.css('.br-unit'));

    // Simulate the click event on the .br-unit element inside BarRating
    unitElement.nativeElement.dispatchEvent(event);
    fixture.detectChanges();

    // Check if both handleClick and handleClickWithEffect were called
    expect(barRatingInstance.handleClick).toHaveBeenCalled();
    expect(directiveInstance.handleClickWithEffect).toHaveBeenCalledWith(event);
  });

  it('should create and append a .br-unit-clone element on click', () => {
    const barRatingElement: HTMLElement = debugElement.query(By.directive(BarRatingEffect)).nativeElement;
    const unitElement = debugElement.query(By.css('.br-unit')).nativeElement;

    const event: MouseEvent = new MouseEvent('click', { bubbles: true });
    unitElement.dispatchEvent(event);
    fixture.detectChanges();

    const clone: HTMLElement = barRatingElement.querySelector('.br-unit-clone');
    expect(clone).toBeTruthy();
    expect(clone.style.left).toBeTruthy();
    expect(clone.style.top).toBeTruthy();
    expect(clone.style.width).toBeTruthy();
    expect(clone.style.height).toBeTruthy();
  });

  it('should remove the .br-unit-clone element after the animation ends', () => {
    const barRatingElement: HTMLElement = debugElement.query(By.directive(BarRatingEffect)).nativeElement;
    const unitElement: HTMLElement = debugElement.query(By.css('.br-unit')).nativeElement;

    const event: MouseEvent = new MouseEvent('click', { bubbles: true });
    unitElement.dispatchEvent(event);
    fixture.detectChanges();

    const clone: HTMLElement = barRatingElement.querySelector('.br-unit-clone');
    expect(clone).toBeTruthy();

    clone.dispatchEvent(new Event('animationend'));
    fixture.detectChanges();

    expect(barRatingElement.querySelector('.br-unit-clone')).toBeNull();
  });
});
