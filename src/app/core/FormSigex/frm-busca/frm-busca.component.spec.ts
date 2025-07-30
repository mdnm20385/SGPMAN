import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmBuscaComponent } from './frm-busca.component';

describe('FrmBuscaComponent', () => {
  let component: FrmBuscaComponent;
  let fixture: ComponentFixture<FrmBuscaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmBuscaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmBuscaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
