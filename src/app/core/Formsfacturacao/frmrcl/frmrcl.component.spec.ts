import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmrclComponent } from './frmrcl.component';

describe('FrmrclComponent', () => {
  let component: FrmrclComponent;
  let fixture: ComponentFixture<FrmrclComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmrclComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmrclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
