import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmListaProcessoComponent } from './frm-lista-processo.component';

describe('FrmListaProcessoComponent', () => {
  let component: FrmListaProcessoComponent;
  let fixture: ComponentFixture<FrmListaProcessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmListaProcessoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmListaProcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
