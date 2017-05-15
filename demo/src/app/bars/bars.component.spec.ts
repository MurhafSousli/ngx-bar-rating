import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarsComponent } from './bars.component';

describe('BarsComponent', () => {
  let component: BarsComponent;
  let fixture: ComponentFixture<BarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
