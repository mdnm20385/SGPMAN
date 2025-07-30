import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmlistauserComponent } from './frmlistauser.component';

describe('FrmlistauserComponent', () => {
  let component: FrmlistauserComponent;
  let fixture: ComponentFixture<FrmlistauserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmlistauserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmlistauserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
