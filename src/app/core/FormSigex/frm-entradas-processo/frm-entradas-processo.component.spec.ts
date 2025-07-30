import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmEntradasProcessoComponent } from './frm-entradas-processo.component';

describe('FrmEntradasProcessoComponent', () => {
  let component: FrmEntradasProcessoComponent;
  let fixture: ComponentFixture<FrmEntradasProcessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmEntradasProcessoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmEntradasProcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
