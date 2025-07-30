import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactModalComponent } from './fact-modal.component';

describe('FactModalComponent', () => {
  let component: FactModalComponent;
  let fixture: ComponentFixture<FactModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FactModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
