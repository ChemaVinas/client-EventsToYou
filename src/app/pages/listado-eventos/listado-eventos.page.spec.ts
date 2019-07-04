import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoEventosPage } from './listado-eventos.page';

describe('ListadoEventosPage', () => {
  let component: ListadoEventosPage;
  let fixture: ComponentFixture<ListadoEventosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoEventosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoEventosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
