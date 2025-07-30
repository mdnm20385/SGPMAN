import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UcFichaMilitarComponent } from './uc-ficha-militar.component';

describe('UcFichaMilitarComponent', () => {
  let component: UcFichaMilitarComponent;
  let fixture: ComponentFixture<UcFichaMilitarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UcFichaMilitarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UcFichaMilitarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
