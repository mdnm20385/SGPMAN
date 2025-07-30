import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSenderComponent } from './menu-sender.component';

describe('MenuSenderComponent', () => {
  let component: MenuSenderComponent;
  let fixture: ComponentFixture<MenuSenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuSenderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuSenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
