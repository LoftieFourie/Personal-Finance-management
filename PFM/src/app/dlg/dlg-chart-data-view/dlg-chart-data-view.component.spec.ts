import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgChartDataViewComponent } from './dlg-chart-data-view.component';

describe('DlgChartDataViewComponent', () => {
  let component: DlgChartDataViewComponent;
  let fixture: ComponentFixture<DlgChartDataViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DlgChartDataViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DlgChartDataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
