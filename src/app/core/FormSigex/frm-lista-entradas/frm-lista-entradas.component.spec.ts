import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmListaEntradasComponent } from './frm-lista-entradas.component';

describe('FrmListaEntradasComponent', () => {
  let component: FrmListaEntradasComponent;
  let fixture: ComponentFixture<FrmListaEntradasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmListaEntradasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmListaEntradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
