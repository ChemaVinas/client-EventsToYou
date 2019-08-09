import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizadorPerfilPage } from './organizador-perfil.page';

describe('OrganizadorPerfilPage', () => {
  let component: OrganizadorPerfilPage;
  let fixture: ComponentFixture<OrganizadorPerfilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizadorPerfilPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizadorPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
