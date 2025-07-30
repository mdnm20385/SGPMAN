import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmRecuperaSenhaComponent } from './frm-recupera-senha.component';

describe('FrmRecuperaSenhaComponent', () => {
  let component: FrmRecuperaSenhaComponent;
  let fixture: ComponentFixture<FrmRecuperaSenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmRecuperaSenhaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmRecuperaSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
