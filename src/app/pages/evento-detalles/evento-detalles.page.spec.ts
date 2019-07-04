import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoDetallesPage } from './evento-detalles.page';

describe('EventoDetallesPage', () => {
  let component: EventoDetallesPage;
  let fixture: ComponentFixture<EventoDetallesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventoDetallesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoDetallesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
