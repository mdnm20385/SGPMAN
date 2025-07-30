import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmListaProcessoHomologadosComponent } from './frm-lista-processo-homologados.component';

describe('FrmListaProcessoHomologadosComponent', () => {
  let component: FrmListaProcessoHomologadosComponent;
  let fixture: ComponentFixture<FrmListaProcessoHomologadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmListaProcessoHomologadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmListaProcessoHomologadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
