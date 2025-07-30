import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmEspecieDocumentalComponent } from './frm-especie-documental.component';

describe('FrmEspecieDocumentalComponent', () => {
  let component: FrmEspecieDocumentalComponent;
  let fixture: ComponentFixture<FrmEspecieDocumentalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmEspecieDocumentalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmEspecieDocumentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
