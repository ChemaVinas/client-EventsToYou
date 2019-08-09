import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizadorDetallesPage } from './organizador-detalles.page';

describe('OrganizadorDetallesPage', () => {
  let component: OrganizadorDetallesPage;
  let fixture: ComponentFixture<OrganizadorDetallesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizadorDetallesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizadorDetallesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
