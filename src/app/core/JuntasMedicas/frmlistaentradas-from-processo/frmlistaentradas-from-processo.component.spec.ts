import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmlistaentradasFromProcessoComponent } from './frmlistaentradas-from-processo.component';

describe('FrmlistaentradasFromProcessoComponent', () => {
  let component: FrmlistaentradasFromProcessoComponent;
  let fixture: ComponentFixture<FrmlistaentradasFromProcessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmlistaentradasFromProcessoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmlistaentradasFromProcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
