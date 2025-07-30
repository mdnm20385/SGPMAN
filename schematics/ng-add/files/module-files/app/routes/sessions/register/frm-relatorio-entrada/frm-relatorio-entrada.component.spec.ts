import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmRelatorioEntradaComponent } from './frm-relatorio-entrada.component';

describe('FrmRelatorioEntradaComponent', () => {
  let component: FrmRelatorioEntradaComponent;
  let fixture: ComponentFixture<FrmRelatorioEntradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmRelatorioEntradaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmRelatorioEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
