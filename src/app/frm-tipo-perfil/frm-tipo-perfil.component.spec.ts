import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmTipoPerfilComponent } from './frm-tipo-perfil.component';

describe('FrmTipoPerfilComponent', () => {
  let component: FrmTipoPerfilComponent;
  let fixture: ComponentFixture<FrmTipoPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmTipoPerfilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmTipoPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
