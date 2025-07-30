import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerSaidaDocumentoComponent } from './ver-saida-documento.component';

describe('VerSaidaDocumentoComponent', () => {
  let component: VerSaidaDocumentoComponent;
  let fixture: ComponentFixture<VerSaidaDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerSaidaDocumentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerSaidaDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
