import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoOrganizadoPage } from './evento-organizado.page';

describe('EventoOrganizadoPage', () => {
  let component: EventoOrganizadoPage;
  let fixture: ComponentFixture<EventoOrganizadoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventoOrganizadoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoOrganizadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
