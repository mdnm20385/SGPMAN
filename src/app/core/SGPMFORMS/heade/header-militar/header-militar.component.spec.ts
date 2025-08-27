import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMilitarComponent } from './header-militar.component';

describe('HeaderMilitarComponent', () => {
  let component: HeaderMilitarComponent;
  let fixture: ComponentFixture<HeaderMilitarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderMilitarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderMilitarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
