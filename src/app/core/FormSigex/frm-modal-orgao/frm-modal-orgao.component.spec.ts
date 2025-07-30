import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmModalOrgaoComponent } from './frm-modal-orgao.component';

describe('FrmModalOrgaoComponent', () => {
  let component: FrmModalOrgaoComponent;
  let fixture: ComponentFixture<FrmModalOrgaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmModalOrgaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmModalOrgaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
