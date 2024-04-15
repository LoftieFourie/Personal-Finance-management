import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgDateSelectComponent } from './dlg-date-select.component';

describe('DlgDateSelectComponent', () => {
  let component: DlgDateSelectComponent;
  let fixture: ComponentFixture<DlgDateSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DlgDateSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DlgDateSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
