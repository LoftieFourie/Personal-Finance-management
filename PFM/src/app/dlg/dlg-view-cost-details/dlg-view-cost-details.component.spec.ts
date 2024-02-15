import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgViewCostDetailsComponent } from './dlg-view-cost-details.component';

describe('DlgViewCostDetailsComponent', () => {
  let component: DlgViewCostDetailsComponent;
  let fixture: ComponentFixture<DlgViewCostDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DlgViewCostDetailsComponent]
    });
    fixture = TestBed.createComponent(DlgViewCostDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
