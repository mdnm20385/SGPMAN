import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmRelatorioComponent } from './frm-relatorio.component';

describe('FrmRelatorioComponent', () => {
  let component: FrmRelatorioComponent;
  let fixture: ComponentFixture<FrmRelatorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmRelatorioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmRelatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
