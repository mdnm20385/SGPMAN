import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteModalPullfffffComponent } from './teste-modal-pullfffff.component';

describe('TesteModalPullfffffComponent', () => {
  let component: TesteModalPullfffffComponent;
  let fixture: ComponentFixture<TesteModalPullfffffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TesteModalPullfffffComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TesteModalPullfffffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
