import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmrpgfComponent } from './frmrpgf.component';

describe('FrmrpgfComponent', () => {
  let component: FrmrpgfComponent;
  let fixture: ComponentFixture<FrmrpgfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmrpgfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmrpgfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
