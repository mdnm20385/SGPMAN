import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmListaProcessemtramitacaoComponent } from './frm-lista-processemtramitacao.component';

describe('FrmListaProcessemtramitacaoComponent', () => {
  let component: FrmListaProcessemtramitacaoComponent;
  let fixture: ComponentFixture<FrmListaProcessemtramitacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmListaProcessemtramitacaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmListaProcessemtramitacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
