import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmCLComponent } from './frm-cl.component';

describe('FrmCLComponent', () => {
  let component: FrmCLComponent;
  let fixture: ComponentFixture<FrmCLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmCLComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmCLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
