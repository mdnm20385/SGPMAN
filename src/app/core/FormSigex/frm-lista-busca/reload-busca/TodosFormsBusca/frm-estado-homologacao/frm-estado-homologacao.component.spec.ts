import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmEstadoHomologacaoComponent } from './frm-estado-homologacao.component';

describe('FrmEstadoHomologacaoComponent', () => {
  let component: FrmEstadoHomologacaoComponent;
  let fixture: ComponentFixture<FrmEstadoHomologacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmEstadoHomologacaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmEstadoHomologacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
