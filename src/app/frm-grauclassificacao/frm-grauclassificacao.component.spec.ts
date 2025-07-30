import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmGrauclassificacaoComponent } from './frm-grauclassificacao.component';

describe('FrmGrauclassificacaoComponent', () => {
  let component: FrmGrauclassificacaoComponent;
  let fixture: ComponentFixture<FrmGrauclassificacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmGrauclassificacaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmGrauclassificacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
