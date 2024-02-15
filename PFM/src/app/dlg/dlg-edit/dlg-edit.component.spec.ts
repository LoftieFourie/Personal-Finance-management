import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgEditComponent } from './dlg-edit.component';

describe('DlgEditComponent', () => {
  let component: DlgEditComponent;
  let fixture: ComponentFixture<DlgEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DlgEditComponent]
    });
    fixture = TestBed.createComponent(DlgEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
