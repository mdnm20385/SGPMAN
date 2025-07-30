import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmListaProcessoHomoNaologadosComponent } from './frm-lista-processo-homo-naologados.component';

describe('FrmListaProcessoHomoNaologadosComponent', () => {
  let component: FrmListaProcessoHomoNaologadosComponent;
  let fixture: ComponentFixture<FrmListaProcessoHomoNaologadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmListaProcessoHomoNaologadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmListaProcessoHomoNaologadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
