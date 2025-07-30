import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmrcpComponent } from './frmrcp.component';

describe('FrmrcpComponent', () => {
  let component: FrmrcpComponent;
  let fixture: ComponentFixture<FrmrcpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmrcpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmrcpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
