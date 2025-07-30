import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmRelatorioJuntaTempComponent } from './frm-relatorio-junta-temp.component';

describe('FrmRelatorioJuntaTempComponent', () => {
  let component: FrmRelatorioJuntaTempComponent;
  let fixture: ComponentFixture<FrmRelatorioJuntaTempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmRelatorioJuntaTempComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmRelatorioJuntaTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
