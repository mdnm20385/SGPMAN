import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmSenhaRecuperadaComponent } from './frm-senha-recuperada.component';

describe('FrmSenhaRecuperadaComponent', () => {
  let component: FrmSenhaRecuperadaComponent;
  let fixture: ComponentFixture<FrmSenhaRecuperadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmSenhaRecuperadaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmSenhaRecuperadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
