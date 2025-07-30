import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmFtComponent } from './frm-ft.component';

describe('FrmFtComponent', () => {
  let component: FrmFtComponent;
  let fixture: ComponentFixture<FrmFtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmFtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmFtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
