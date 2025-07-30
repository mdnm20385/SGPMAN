import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmModalArquivoComponent } from './frm-modal-arquivo.component';

describe('FrmModalArquivoComponent', () => {
  let component: FrmModalArquivoComponent;
  let fixture: ComponentFixture<FrmModalArquivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmModalArquivoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmModalArquivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
