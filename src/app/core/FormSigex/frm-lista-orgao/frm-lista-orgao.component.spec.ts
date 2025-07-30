import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmListaOrgaoComponent } from './frm-lista-orgao.component';

describe('FrmListaOrgaoComponent', () => {
  let component: FrmListaOrgaoComponent;
  let fixture: ComponentFixture<FrmListaOrgaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmListaOrgaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmListaOrgaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
