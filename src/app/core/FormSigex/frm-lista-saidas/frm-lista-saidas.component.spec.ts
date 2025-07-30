import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmListaSaidasComponent } from './frm-lista-saidas.component';

describe('FrmListaSaidasComponent', () => {
  let component: FrmListaSaidasComponent;
  let fixture: ComponentFixture<FrmListaSaidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmListaSaidasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmListaSaidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
