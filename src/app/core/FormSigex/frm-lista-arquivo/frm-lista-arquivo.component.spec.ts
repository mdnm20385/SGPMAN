import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmListaArquivoComponent } from './frm-lista-arquivo.component';

describe('FrmListaArquivoComponent', () => {
  let component: FrmListaArquivoComponent;
  let fixture: ComponentFixture<FrmListaArquivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmListaArquivoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmListaArquivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
