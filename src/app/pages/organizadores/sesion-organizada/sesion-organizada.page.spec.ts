import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionOrganizadaPage } from './sesion-organizada.page';

describe('SesionOrganizadaPage', () => {
  let component: SesionOrganizadaPage;
  let fixture: ComponentFixture<SesionOrganizadaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SesionOrganizadaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SesionOrganizadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
