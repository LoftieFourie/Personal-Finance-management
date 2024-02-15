import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgEditCatagoriesComponent } from './dlg-edit-catagories.component';

describe('DlgEditCatagoriesComponent', () => {
  let component: DlgEditCatagoriesComponent;
  let fixture: ComponentFixture<DlgEditCatagoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DlgEditCatagoriesComponent]
    });
    fixture = TestBed.createComponent(DlgEditCatagoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
