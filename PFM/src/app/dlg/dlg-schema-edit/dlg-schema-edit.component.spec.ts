import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgSchemaEditComponent } from './dlg-schema-edit.component';

describe('DlgSchemaEditComponent', () => {
  let component: DlgSchemaEditComponent;
  let fixture: ComponentFixture<DlgSchemaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DlgSchemaEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DlgSchemaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
