import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmListaEspecieDocumentalComponent } from './frm-lista-especie-documental.component';

describe('FrmListaEspecieDocumentalComponent', () => {
  let component: FrmListaEspecieDocumentalComponent;
  let fixture: ComponentFixture<FrmListaEspecieDocumentalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmListaEspecieDocumentalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmListaEspecieDocumentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
