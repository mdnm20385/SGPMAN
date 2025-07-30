import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmProcessoComponent } from './frm-processo.component';

describe('FrmProcessoComponent', () => {
  let component: FrmProcessoComponent;
  let fixture: ComponentFixture<FrmProcessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmProcessoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmProcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
