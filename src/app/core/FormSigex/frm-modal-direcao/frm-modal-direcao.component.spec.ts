import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmModalDirecaoComponent } from './frm-modal-direcao.component';

describe('FrmModalDirecaoComponent', () => {
  let component: FrmModalDirecaoComponent;
  let fixture: ComponentFixture<FrmModalDirecaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmModalDirecaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmModalDirecaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
