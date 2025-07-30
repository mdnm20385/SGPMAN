import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmRelatorioJuntasComponent } from './frm-relatorio-juntas.component';

describe('FrmRelatorioJuntasComponent', () => {
  let component: FrmRelatorioJuntasComponent;
  let fixture: ComponentFixture<FrmRelatorioJuntasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmRelatorioJuntasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmRelatorioJuntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
