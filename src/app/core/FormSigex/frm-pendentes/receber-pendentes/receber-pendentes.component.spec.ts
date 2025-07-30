import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceberPendentesComponent } from './receber-pendentes.component';

describe('ReceberPendentesComponent', () => {
  let component: ReceberPendentesComponent;
  let fixture: ComponentFixture<ReceberPendentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceberPendentesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceberPendentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
