import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmListaBuscaComponent } from './frm-lista-busca.component';

describe('FrmListaBuscaComponent', () => {
  let component: FrmListaBuscaComponent;
  let fixture: ComponentFixture<FrmListaBuscaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmListaBuscaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmListaBuscaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
