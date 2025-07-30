import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmSenhaComponent } from './frm-senha.component';

describe('FrmSenhaComponent', () => {
  let component: FrmSenhaComponent;
  let fixture: ComponentFixture<FrmSenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmSenhaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
