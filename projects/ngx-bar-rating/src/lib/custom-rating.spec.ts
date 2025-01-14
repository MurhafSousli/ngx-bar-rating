import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, Signal, viewChild } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { BarRating, ActiveRating, InactiveRating, FractionRating, BarRatingModule } from 'ngx-bar-rating';

@Component({
  template: `
    <bar-rating>
      <div *ratingActive>
        Custom Active Template
      </div>
      <div *ratingInactive>
        Custom Inactive Template
      </div>
      <div *ratingFraction>
        Custom Fraction Template
      </div>
    </bar-rating>
  `,
  imports: [BarRatingModule]
})
class TestHostComponent {
  barRating: Signal<BarRating> = viewChild.required(BarRating);
}

describe('BarRating Component with Custom Rating Templates', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BarRating,
        ActiveRating,
        InactiveRating,
        FractionRating,
        TestHostComponent,
        NgTemplateOutlet
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the BarRating component', () => {
    expect(component.barRating()).toBeTruthy();
    expect(component.barRating().customActiveRating()).toBeTruthy();
    expect(component.barRating().customInActiveRating()).toBeTruthy();
    expect(component.barRating().customFractionRating()).toBeTruthy();
  });
});
