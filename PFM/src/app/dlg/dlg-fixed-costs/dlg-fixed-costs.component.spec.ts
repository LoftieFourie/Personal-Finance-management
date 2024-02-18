import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgFixedCostsComponent } from './dlg-fixed-costs.component';

describe('DlgFixedCostsComponent', () => {
  let component: DlgFixedCostsComponent;
  let fixture: ComponentFixture<DlgFixedCostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DlgFixedCostsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DlgFixedCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
