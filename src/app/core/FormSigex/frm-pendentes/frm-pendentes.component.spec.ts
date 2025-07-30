import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmPendentesComponent } from './frm-pendentes.component';

describe('FrmPendentesComponent', () => {
  let component: FrmPendentesComponent;
  let fixture: ComponentFixture<FrmPendentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmPendentesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmPendentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
