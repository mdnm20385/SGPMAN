import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmListaDirecaoComponent } from './frm-lista-direcao.component';

describe('FrmListaDirecaoComponent', () => {
  let component: FrmListaDirecaoComponent;
  let fixture: ComponentFixture<FrmListaDirecaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmListaDirecaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmListaDirecaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
