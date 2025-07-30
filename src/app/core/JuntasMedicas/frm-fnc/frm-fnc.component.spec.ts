import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmFncComponent } from './frm-fnc.component';

describe('FrmFncComponent', () => {
  let component: FrmFncComponent;
  let fixture: ComponentFixture<FrmFncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmFncComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmFncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
