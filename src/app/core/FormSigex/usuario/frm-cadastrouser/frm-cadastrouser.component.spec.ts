import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmCadastrouserComponent } from './frm-cadastrouser.component';

describe('FrmCadastrouserComponent', () => {
  let component: FrmCadastrouserComponent;
  let fixture: ComponentFixture<FrmCadastrouserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmCadastrouserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmCadastrouserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
