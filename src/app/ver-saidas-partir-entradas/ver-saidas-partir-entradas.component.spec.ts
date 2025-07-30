import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerSaidasPartirEntradasComponent } from './ver-saidas-partir-entradas.component';

describe('VerSaidasPartirEntradasComponent', () => {
  let component: VerSaidasPartirEntradasComponent;
  let fixture: ComponentFixture<VerSaidasPartirEntradasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerSaidasPartirEntradasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerSaidasPartirEntradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
