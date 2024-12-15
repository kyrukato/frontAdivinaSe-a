import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesPartidaComponent } from './detalles-partida.component';

describe('DetallesPartidaComponent', () => {
  let component: DetallesPartidaComponent;
  let fixture: ComponentFixture<DetallesPartidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesPartidaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesPartidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
