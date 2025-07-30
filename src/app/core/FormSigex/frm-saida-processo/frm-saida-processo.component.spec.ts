import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmSaidaProcessoComponent } from './frm-saida-processo.component';

describe('FrmSaidaProcessoComponent', () => {
  let component: FrmSaidaProcessoComponent;
  let fixture: ComponentFixture<FrmSaidaProcessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmSaidaProcessoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmSaidaProcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
