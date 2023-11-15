import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedCostComponent } from './fixed-cost.component';

describe('FixedCostComponent', () => {
  let component: FixedCostComponent;
  let fixture: ComponentFixture<FixedCostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FixedCostComponent]
    });
    fixture = TestBed.createComponent(FixedCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
