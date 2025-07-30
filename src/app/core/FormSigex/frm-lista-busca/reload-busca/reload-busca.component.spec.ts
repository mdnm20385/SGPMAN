import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReloadBuscaComponent } from './reload-busca.component';

describe('ReloadBuscaComponent', () => {
  let component: ReloadBuscaComponent;
  let fixture: ComponentFixture<ReloadBuscaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReloadBuscaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReloadBuscaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
