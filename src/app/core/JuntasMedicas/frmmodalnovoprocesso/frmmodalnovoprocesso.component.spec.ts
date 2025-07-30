import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmmodalnovoprocessoComponent } from './frmmodalnovoprocesso.component';

describe('FrmmodalnovoprocessoComponent', () => {
  let component: FrmmodalnovoprocessoComponent;
  let fixture: ComponentFixture<FrmmodalnovoprocessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmmodalnovoprocessoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmmodalnovoprocessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
