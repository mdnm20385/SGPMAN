import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmListaProcessporinciarComponent } from './frm-lista-processporinciar.component';

describe('FrmListaProcessporinciarComponent', () => {
  let component: FrmListaProcessporinciarComponent;
  let fixture: ComponentFixture<FrmListaProcessporinciarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmListaProcessporinciarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmListaProcessporinciarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
