import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmnivelurgenciaComponent } from './frmnivelurgencia.component';

describe('FrmnivelurgenciaComponent', () => {
  let component: FrmnivelurgenciaComponent;
  let fixture: ComponentFixture<FrmnivelurgenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmnivelurgenciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmnivelurgenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
