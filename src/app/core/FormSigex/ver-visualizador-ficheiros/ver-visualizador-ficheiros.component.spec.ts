import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerVisualizadorFicheirosComponent } from './ver-visualizador-ficheiros.component';

describe('VerVisualizadorFicheirosComponent', () => {
  let component: VerVisualizadorFicheirosComponent;
  let fixture: ComponentFixture<VerVisualizadorFicheirosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerVisualizadorFicheirosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerVisualizadorFicheirosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
