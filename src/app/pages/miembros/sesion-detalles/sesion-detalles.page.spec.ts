import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionDetallesPage } from './sesion-detalles.page';

describe('SesionDetallesPage', () => {
  let component: SesionDetallesPage;
  let fixture: ComponentFixture<SesionDetallesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SesionDetallesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SesionDetallesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
