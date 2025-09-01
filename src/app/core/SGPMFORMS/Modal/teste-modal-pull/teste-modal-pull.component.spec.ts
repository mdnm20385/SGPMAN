import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteModalPullComponent } from './teste-modal-pull.component';

describe('TesteModalPullComponent', () => {
  let component: TesteModalPullComponent;
  let fixture: ComponentFixture<TesteModalPullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TesteModalPullComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TesteModalPullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
